const { DATA_SOURCE_CORE_DATA } = require('../helpers/databaseHelper');
const getDatabaseHandler = require('../helpers/databaseHelper');

/**
 * Get the Singleton Instance of the Core Database Handlers.
 * @returns {object} - Get the instance of Core Database Handlers.
 **/
const coreDatabaseHandler = getDatabaseHandler(DATA_SOURCE_CORE_DATA, {});


// Get the field type mapping from the core database handler
const { FIELD_TYPES } = coreDatabaseHandler;

// ENUM for the Column Status
const STATUS = {
    /**
     * String Constant containing the ENUM value ACTIVE for column STATUS
     */
    ACTIVE: 'A',
    /**
     * String Constant containing the ENUM value INACTIVE for column STATUS
     */
    CANCELLED: 'I',
};

/**
 * Object Constant containing the Table Name
 */
const TABLE_NAME = 'PUBLIC.APPOINTMENT';

/**
 * Object Constant containing the Table Columns Names with their corresponding field type.
 */
const TABLE_COLUMNS = {
    ID: FIELD_TYPES.SERIAL,
    VETERINARIAN_ID: FIELD_TYPES.SERIAL,
    PET_OWNER_ID: FIELD_TYPES.SERIAL,
    PET_ID: FIELD_TYPES.SERIAL,
    APOINTMENT_DATE: FIELD_TYPES.DATE,
    START_TIME: FIELD_TYPES.TIMESTAMP,
    END_TIME: FIELD_TYPES.TIMESTAMP,
    NOTES: FIELD_TYPES.STRING,
    TOTAL_PRICE: FIELD_TYPES.NUMBER,
    STATUS: FIELD_TYPES.STRING,
    CANCELLATION_REASON: FIELD_TYPES.STRING,
    CREATED_BY: FIELD_TYPES.SERIAL,
    CREATED_AT: FIELD_TYPES.TIMESTAMP,
    UPDATED_BY: FIELD_TYPES.SERIAL,
    UPDATED_AT: FIELD_TYPES.TIMESTAMP,
};

/**
 * Array Constant containing the Table Columns Names.
 */
const tableColumnNames = Object.keys(TABLE_COLUMNS);

/**
 * Object Constant containing the Mappings for the Operations to the relevant SQL Statement.
 */
const SQL_STATEMENT_BY_OPERATION = {
    INSERT_APPOINTMENT: `INSERT INTO ${TABLE_NAME} (${tableColumnNames.slice(1).join(',')}) VALUES (${tableColumnNames.slice(1).map((column, index) => `$${index + 1}`).join(',')}) RETURNING *`,
    CANCEL_APPOINTMENT: `UPDATE ${TABLE_NAME} SET status='$1', cancellation_reason='$2' WHERE id = $3`,
};

/**
 * APPOINTMENT Table Schema
 *
 * Schema definition for the user table in the CORE database.
 */
module.exports = {
    TABLE_NAME,
    TABLE_COLUMNS,
    TABLE_COLUMN_ENUMS: {
        STATUS,
    },
    SQL_STATEMENT_BY_OPERATION,
};
