const { DATA_SOURCE_CORE_DATA } = require('../helpers/databaseHelper');
const getDatabaseHandler = require('../helpers/databaseHelper');
const appointmentModel = require('../models/appointmentModel');
const userPetAppointmentModel = require('../models/userPetAppointmentModel');

/**
 * Get the Singleton Instance of the Core Database Handlers.
 * @returns {object} - Get the instance of Core Database Handlers.
 **/
const coreDatabaseHandler = getDatabaseHandler(DATA_SOURCE_CORE_DATA, {});

/**
 * Method to get the appointments by user.
 */
const getAppointmentForPetOwner = async userId => coreDatabaseHandler.fetchAllRows(userPetAppointmentModel.SQL_STATEMENT_BY_OPERATION.GET_USER_APPOINTMENT_BY_PET_OWNER_ID, [userId]);

const getAppointmentForDoctor = async userId => coreDatabaseHandler.fetchAllRows(userPetAppointmentModel.SQL_STATEMENT_BY_OPERATION.GET_USER_APPOINTMENT_BY_DOCTOR_ID, [userId]);

const getAppointmentByUserIdAndRole = async (userId, role) => {
    if (role === 'PET_OWNER') {
        return getAppointmentForPetOwner(userId);
    }

    return getAppointmentForDoctor(userId);
};

/**
 * Method to create Appointment.
 */
const createAppointment = async (appointment = {}) => coreDatabaseHandler.fetchOrInsertOne(appointmentModel.SQL_STATEMENT_BY_OPERATION.INSERT_APPOINTMENT, [
    appointment.veterinarianId,
    appointment.userId,
    appointment.petId,
    appointment.appointmentDate,
    `${appointment.appointmentDate} ${appointment.startTime}:00`,
    `${appointment.appointmentDate} ${appointment.endTime}:00`,
    appointment.notes,
    appointment.totalPrice,
    'A',
    '',
    appointment.userId,
    new Date(),
    appointment.userId,
    new Date(),
]);

module.exports = {
    createAppointment,
    getAppointmentByUserIdAndRole,
};
