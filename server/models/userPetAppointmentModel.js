const userModel = require('./userModel');
const appointmentModel = require('./appointmentModel');
const petModel = require('./petModel');

const getAppointments = 'SELECT u.id, apointment_date, start_time, end_time, notes, total_price, a.status, cancellation_reason, doc.first_name as docFirstName, doc.last_name as docLastName, p.name as petName '
    + `FROM ${appointmentModel.TABLE_NAME} a, ${userModel.TABLE_NAME} u, ${userModel.TABLE_NAME} doc, ${petModel.TABLE_NAME} p `
    + 'WHERE '
    + 'a.pet_owner_id = u.id '
    + 'AND a.VETERINARIAN_ID = doc.id '
    + 'AND a.pet_id = p.id '
    + 'AND u.id = 53';

const GET_USER_APPOINTMENT_BY_PET_OWNER_ID = `${getAppointments} AND u.id = $1`;

const GET_USER_APPOINTMENT_BY_DOCTOR_ID = `${getAppointments} AND doc.id = $1`;

/**
 * Object Constant containing the Mappings for the Operations to the relevant SQL Statement.
 */
const SQL_STATEMENT_BY_OPERATION = {
    GET_USER_APPOINTMENT_BY_PET_OWNER_ID,
    GET_USER_APPOINTMENT_BY_DOCTOR_ID,
};

/**
 * USER_PET_APPOINTMENT Table Schema
 *
 * Schema definition for the user table in the CORE database.
 */
module.exports = {
    TABLE_COLUMN_ENUMS: {},
    SQL_STATEMENT_BY_OPERATION,
};
