const debug = require('debug')('vetapptschduler:appointmentController');
const { createAppointment, getAppointmentByUserIdAndRole, cancelAppointmentByApptId } = require('../dao/appointmentDao');
const { getUserByAppointmentAndRole } = require('../controllers/accountController');
const { createEstimateInQuickBooks, createCustomerInQuickBooks, sendEstimatePdf } = require('../lib/quickbooks');
const { HTTP_STATUS_CODES } = require('../constants');
/**
 * Create an apointment for the user.
 * e.g. req.params: { "userId": "34" }
 */
const createAppointmentInDB = async (req, res, next) => {
    const { userId } = req.params;

    debug('createAppointment request :: userId', userId);

    const appointmentRequest = req.body;

    debug('createAppointment request :: appointmentRequest', appointmentRequest);

    // Perform a check for Existing Appointments before creating
    const scheduledDoctors = await getUserByAppointmentAndRole('DOCTOR', appointmentRequest.appointmentDate, appointmentRequest.startTime, appointmentRequest.endTime, true) || [];

    debug('createAppointment scheduledDoctors ::', scheduledDoctors.length);

    const isDocAppointmentConflicting = !scheduledDoctors.find(doctor => parseInt(doctor.id, 10) === parseInt(appointmentRequest.veterinarianId, 10));

    if (isDocAppointmentConflicting) {
        debug('createAppointment request :: DOC_APPT_CONFLICT ::doctor already found with appointment');
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ details: 'DOC_APPT_CONFLICT' });
    }

    debug('createAppointment request :: NO CONFLICTING APPOINTMENT FOUND');

    const appointment = await createAppointment({
        userId,
        ...appointmentRequest,
    });

    const {
        user: {
            first_name: firstName,
            last_name: lastName,
            email,
        } = {},
    } = req;

    try {
        const customer = await createCustomerInQuickBooks({ name: `${firstName} ${lastName}`, email }) || {};

        debug('createAppointment customer ::', customer);

        const estimate = await createEstimateInQuickBooks({ customer, amount: appointmentRequest.totalPrice }) || {};

        debug('createAppointment estimate ::', estimate);

        const estimatePdf = await sendEstimatePdf({ estimateId: estimate.Id });

        debug('createAppointment estimatePdf ::', estimatePdf);
    } catch (e) {
        debug('createAppointment estimate :: ERROR :::%e', e);
    }

    debug('createAppointment appointment FROM DB ::', appointment);

    return res.status(HTTP_STATUS_CODES.CREATED).json({ ...appointment });
};

/**
 * Get all apointment for the user.
 * e.g. req.params: { "userId": "34" }
 */
const getUserAppointments = async (req, res, next) => {
    const { userId } = req.params;

    const { role } = req.user;

    debug('getUserAppointments request :: userId', userId);

    debug('getUserAppointments request :: role', role);

    const appointments = await getAppointmentByUserIdAndRole(userId, role) || [];

    res.status(HTTP_STATUS_CODES.OK).json([...appointments]);
};

/**
 * Cancel appointment for a perticular user.
 * e.g. req.params: { "userId": "34" }
 */
const cancelAppointment = async (req, res, next) => {
    const { userId, appointmentId } = req.params;

    const { cancelReason = 'Appointment Cancelled' } = req.body;

    debug('cancelAppointment request :: userId', userId);

    debug('cancelAppointment request :: appointmentId', appointmentId);

    await cancelAppointmentByApptId(appointmentId, cancelReason);

    debug('cancelAppointment PATCHED :: appointmentId', appointmentId);

    res.status(HTTP_STATUS_CODES.OK).json([]);
};

module.exports = {
    patch: cancelAppointment,
    get: getUserAppointments,
    post: createAppointmentInDB,
};
