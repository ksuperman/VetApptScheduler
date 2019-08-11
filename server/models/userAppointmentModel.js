const userModel = require('./userModel');
const appointmentModel = require('./appointmentModel');

const getAppointmentByOverlappingStarttimes = appointmentStartDateTimeStamp => '(Select a.id, u.id, u.first_name, a.start_time, a.end_time '
    + `from ${appointmentModel.TABLE_NAME} a, ${userModel.TABLE_NAME} u `
    + 'WHERE a.veterinarian_id = u.id '
    + `AND (a.start_time >= '${appointmentStartDateTimeStamp}') `
    + 'INTERSECT '
    + 'Select a.id, u.id, u.first_name, a.start_time, a.end_time '
    + `from ${appointmentModel.TABLE_NAME} a, ${userModel.TABLE_NAME} u `
    + 'WHERE a.veterinarian_id = u.id '
    + `AND (a.status = '${appointmentModel.TABLE_COLUMN_ENUMS.STATUS.ACTIVE}') `
    + `AND (a.start_time <= '${appointmentStartDateTimeStamp}'))`;

const getAppointmentByOverlappingEndtimes = appointmentEndDateTimeStamp => '(Select a.id, u.id, u.first_name, a.start_time, a.end_time '
    + `from ${appointmentModel.TABLE_NAME} a, ${userModel.TABLE_NAME} u `
    + 'WHERE a.veterinarian_id = u.id '
    + `AND (a.end_time >= '${appointmentEndDateTimeStamp}') `
    + 'INTERSECT '
    + 'Select a.id, u.id, u.first_name, a.start_time, a.end_time '
    + `from ${appointmentModel.TABLE_NAME} a, ${userModel.TABLE_NAME} u `
    + 'WHERE a.veterinarian_id = u.id '
    + `AND (a.status = '${appointmentModel.TABLE_COLUMN_ENUMS.STATUS.ACTIVE}') `
    + `AND (a.end_time <= '${appointmentEndDateTimeStamp}'))`;

const getAppointmentByStartOverlappingEndTimes = (appointmentStartDateTimeStamp, appointmentEndDateTimeStamp) => '(Select a.id, u.id, u.first_name, a.start_time, a.end_time '
    + `from ${appointmentModel.TABLE_NAME} a, ${userModel.TABLE_NAME} u `
    + 'WHERE a.veterinarian_id = u.id '
    + `AND (a.start_time >= '${appointmentStartDateTimeStamp}') `
    + 'INTERSECT '
    + 'Select a.id, u.id, u.first_name, a.start_time, a.end_time '
    + `from ${appointmentModel.TABLE_NAME} a, ${userModel.TABLE_NAME} u `
    + 'WHERE a.veterinarian_id = u.id '
    + `AND (a.status = '${appointmentModel.TABLE_COLUMN_ENUMS.STATUS.ACTIVE}') `
    + `AND (a.start_time <= '${appointmentEndDateTimeStamp}'))`;


const getAppointmentByStartAndEndDateWithinRange = (appointmentStartDateTimeStamp, appointmentEndDateTimeStamp) => '(Select a.id, u.id, u.first_name, a.start_time, a.end_time '
    + `from ${appointmentModel.TABLE_NAME} a, ${userModel.TABLE_NAME} u `
    + 'WHERE a.veterinarian_id = u.id '
    + `AND (a.status = '${appointmentModel.TABLE_COLUMN_ENUMS.STATUS.ACTIVE}') `
    + `AND (a.start_time <= '${appointmentStartDateTimeStamp}') `
    + `AND (a.end_time >= '${appointmentEndDateTimeStamp}'))`;

const getAppointmentByEndDateWithinRange = (appointmentStartDateTimeStamp, appointmentEndDateTimeStamp) => '(Select a.id, u.id, u.first_name, a.start_time, a.end_time '
    + `from ${appointmentModel.TABLE_NAME} a, ${userModel.TABLE_NAME} u `
    + 'WHERE a.veterinarian_id = u.id '
    + `AND (a.status = '${appointmentModel.TABLE_COLUMN_ENUMS.STATUS.ACTIVE}') `
    + `AND (a.end_time >= '${appointmentStartDateTimeStamp}') `
    + `AND (a.end_time <= '${appointmentEndDateTimeStamp}'))`;

/**
 * Select to Get Appointment which overlap with Start and End time.
 */
const GET_APPOINTMENT_BY_OVERLAPPING_START_END_TIMES = (appointmentStartDateTimeStamp, appointmentEndDateTimeStamp) => `${getAppointmentByOverlappingStarttimes(appointmentStartDateTimeStamp)} UNION ${getAppointmentByOverlappingEndtimes(appointmentEndDateTimeStamp)} UNION ${getAppointmentByStartOverlappingEndTimes(appointmentStartDateTimeStamp, appointmentEndDateTimeStamp)} UNION ${getAppointmentByStartAndEndDateWithinRange(appointmentStartDateTimeStamp, appointmentEndDateTimeStamp)} UNION ${getAppointmentByEndDateWithinRange(appointmentStartDateTimeStamp, appointmentEndDateTimeStamp)}`;

/**
 * Object Constant containing the Mappings for the Operations to the relevant SQL Statement.
 */
const SQL_STATEMENT_BY_OPERATION = {
    GET_APPOINTMENT_BY_OVERLAPPING_START_END_TIMES,
};

/**
 * USER_SCHEDULE Table Schema
 *
 * Schema definition for the user table in the CORE database.
 */
module.exports = {
    TABLE_COLUMN_ENUMS: {},
    SQL_STATEMENT_BY_OPERATION,
};
