const debug = require('debug')('vetapptschduler:appointmentController');
const { createAppointment } = require('../dao/appointmentDao');
const { getUserByAppointmentAndRole } = require('../controllers/accountController');
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

    const isDocAppointmentConflicting = !!scheduledDoctors.find(doctor => parseInt(doctor.id, 10) === parseInt(appointmentRequest.veterinarianId, 10));

    if (isDocAppointmentConflicting) {
        debug('createAppointment request :: DOC_APPT_CONFLICT ::doctor already found with appointment');
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ details: 'DOC_APPT_CONFLICT' });
    }

    debug('createAppointment request :: NO CONFLICTING APPOINTMENT FOUND');

    const appointment = await createAppointment({
        userId,
        ...appointmentRequest,
    });

    debug('createAppointment appointment FROM DB ::', appointment);

    return res.status(HTTP_STATUS_CODES.CREATED).json({ ...appointment });
};


module.exports = {
    get: () => {},
    post: createAppointmentInDB,
};
