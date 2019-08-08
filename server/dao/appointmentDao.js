const { DATA_SOURCE_CORE_DATA } = require('../helpers/databaseHelper');
const getDatabaseHandler = require('../helpers/databaseHelper');
const appointmentModel = require('../models/appointmentModel');

/**
 * Get the Singleton Instance of the Core Database Handlers.
 * @returns {object} - Get the instance of Core Database Handlers.
 **/
const coreDatabaseHandler = getDatabaseHandler(DATA_SOURCE_CORE_DATA, {});

/**
 * Method to get the user by username.
 */
// const getPets = async userId => coreDatabaseHandler.fetchAllRows(petModel.SQL_STATEMENT_BY_OPERATION.GET_PETS_BY_PET_OWNER_ID, [userId]);

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
};
