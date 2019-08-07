const debug = require('debug')('vetapptschduler:accountController');
const { createAccount } = require('../dao/userDao');
const { getUserBySchedule, getUserByAppointmentStartEndOverlap } = require('../dao/userScheduleDao');
const { generateHashForData } = require('../helpers/cryptoHelper');
const { HTTP_STATUS_CODES } = require('../constants');
const memoize = require('../utils/memoizeUtil');
const { isEmpty } = require('../utils/objectUtils');
const { getSQLTimeStampStringFromDateAndTimeString } = require('../utils/dateUtils');

/**
 * Create a Memoize instance of the User Fetch Query to Save from going to DB.
 */
const memoizedGetUserBySchedule = memoize(getUserBySchedule);

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

    debug('createAccountInDB::user account created :: ', user);

    return res.status(HTTP_STATUS_CODES.CREATED).send({});
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
        const appointmentStartTimestampString = getSQLTimeStampStringFromDateAndTimeString(appointmentDate, startTime);
        const appointmentEndTimestampString = getSQLTimeStampStringFromDateAndTimeString(appointmentDate, endTime);
        users = await memoizedGetUserBySchedule(role, appointmentStartTimestampString, appointmentEndTimestampString) || [];
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
                // Filter the User's who already have appointment
                // @TODO Mark Appointment holder as un avaialble and display status on the UI
                users = users.filter((user = {}) => !(userIdsWithAppointment.indexOf(user.id) > -1));
            }
        }
    }
    return res.status(HTTP_STATUS_CODES.OK).json([...users]);
};

module.exports = {
    post: createAccountInDB,
    get: getUsers,
};
