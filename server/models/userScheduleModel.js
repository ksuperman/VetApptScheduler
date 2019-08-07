const userModel = require('./userModel');
const scheduleModel = require('./scheduleModel');

const GET_USERS_BY_SCHEDULE = (role, appointmentStartDateTimeStamp, appointmentEndDateTimeStamp) => 'SELECT u.ID, u.FIRST_NAME, u.LAST_NAME, s.FROM, s.TO '
    + `FROM ${scheduleModel.TABLE_NAME} s, ${userModel.TABLE_NAME} u WHERE s.USER_ID = u.ID `
    + `AND u.ROLE = '${role}' `
    + `AND (s.FROM <= '${appointmentStartDateTimeStamp}' AND s.TO >= '${appointmentStartDateTimeStamp}') `
    + `AND (s.FROM <= '${appointmentEndDateTimeStamp}' AND s.TO >= '${appointmentEndDateTimeStamp}') `;

/**
 * Object Constant containing the Mappings for the Operations to the relevant SQL Statement.
 */
const SQL_STATEMENT_BY_OPERATION = {
    GET_USERS_BY_SCHEDULE,
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
