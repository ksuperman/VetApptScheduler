const { DATA_SOURCE_CORE_DATA } = require('../helpers/databaseHelper');
const getDatabaseHandler = require('../helpers/databaseHelper');
const userScheduleModel = require('../models/userScheduleModel');
const userAppointmentModel = require('../models/userAppointmentModel');

/**
 * Get the Singleton Instance of the Core Database Handlers.
 * @returns {object} - Get the instance of Core Database Handlers.
 **/
const coreDatabaseHandler = getDatabaseHandler(DATA_SOURCE_CORE_DATA, {});

/**
 * Method to get the user by username.
 */
// eslint-disable-next-line max-len
const getUserBySchedule = async (role, appointmentStartTimestamp, appointmentEndTimestamp) => coreDatabaseHandler.fetchAllRows(userScheduleModel.SQL_STATEMENT_BY_OPERATION.GET_USERS_BY_SCHEDULE(role, appointmentStartTimestamp, appointmentEndTimestamp), []);

/**
 * Method to get the user by appointment start and end time overlaps.
 */
// eslint-disable-next-line max-len
const getUserByAppointmentStartEndOverlap = async (appointmentStartTimestamp, appointmentEndTimestamp) => coreDatabaseHandler.fetchAllRows(userAppointmentModel.SQL_STATEMENT_BY_OPERATION.GET_APPOINTMENT_BY_OVERLAPPING_START_END_TIMES(appointmentStartTimestamp, appointmentEndTimestamp), []);

module.exports = {
    getUserBySchedule,
    getUserByAppointmentStartEndOverlap,
};
