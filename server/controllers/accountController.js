const debug = require('debug')('vetapptschduler:accountController');
const { createAccount } = require('../dao/userDao');
const { getUserBySchedule, getUserByAppointmentStartEndOverlap } = require('../dao/userScheduleDao');
const { generateHashForData } = require('../helpers/cryptoHelper');
const { HTTP_STATUS_CODES } = require('../constants');
const { isEmpty } = require('../utils/objectUtils');
const { getSQLTimeStampStringFromDateAndTimeString } = require('../utils/dateUtils');
const { createCustomerInQuickBooks } = require('../lib/quickbooks');

/**
 * Controller Method for the Create Account.
 */
const createAccountInDB = async (req, res, next) => {
    const user = req.body;

    debug('createAccountInDB::user sent in request :: ', user);

    if (!user) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ details: 'Missing User Information' });
    }

    user.password = await generateHashForData(user.password);

    await createAccount(user);

    try {
        const customer = await createCustomerInQuickBooks({ name: `${user.firstName} ${user.lastName}`, email: user.email });

        debug('createAccountInDB customer ::', customer);
    } catch (e) {
        debug('createAccountInDB customer :: ERROR :::%e', e);
    }

    debug('createAccountInDB::user account created :: ', user);

    return res.status(HTTP_STATUS_CODES.CREATED).send({});
};

const getUserByAppointmentAndRole = async (role, appointmentDate = '', startTime = '', endTime = '', checkAppointment = false) => {
    const appointmentStartTimestampString = getSQLTimeStampStringFromDateAndTimeString(appointmentDate, startTime);
    const appointmentEndTimestampString = getSQLTimeStampStringFromDateAndTimeString(appointmentDate, endTime);
    let users = await getUserBySchedule(role, appointmentStartTimestampString, appointmentEndTimestampString) || [];
    debug('getUsers::users found withing schedule :: ', users.length);
    if (checkAppointment) {
        const usersWithAppointment = await getUserByAppointmentStartEndOverlap(appointmentStartTimestampString, appointmentEndTimestampString) || [];
        debug('getUsers::userWithAppointment:: ', usersWithAppointment.length);
        // If there are appointments for the user during the start then mark them as un available during that time
        if (!isEmpty(usersWithAppointment)) {
            // Get all user id into an array
            const userIdsWithAppointment = usersWithAppointment.reduce((userIdsArr, userWithAppointment) => {
                userIdsArr.push(userWithAppointment.id);
                return userIdsArr;
            }, []);
            debug('getUsers::userIdsWithAppointment:: ', userIdsWithAppointment);
            // Filter the User's who already have appointment
            // @TODO Mark Appointment holder as un avaialble and display status on the UI
            users = users.filter((user = {}) => !(userIdsWithAppointment.indexOf(user.id) > -1));
        }
    }
    debug('getUserByAppointmentAndRole::Total users found for this request :: ', users.length);
    return users;
};

/**
 * Controller Method for Getting Users.
 * * e.g. req.query: { role: 'DOCTOR',  appointmentDate: '2019-08-08',  startTime: '12:12' }
 */
const getUsers = async (req, res, next) => {
    const {
        role, appointmentDate = '', startTime = '', endTime = '', checkAppointment = false,
    } = req.query || {};

    debug('getUsers::query:: ', req.query);

    let users = [];
    // If we have appointment data then find user by schedule
    if (appointmentDate) {
        users = await getUserByAppointmentAndRole(role, appointmentDate, startTime, endTime, checkAppointment);
    }
    return res.status(HTTP_STATUS_CODES.OK).json([...users]);
};

module.exports = {
    getUserByAppointmentAndRole,
    post: createAccountInDB,
    get: getUsers,
};
