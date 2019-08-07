const { DATA_SOURCE_CORE_DATA } = require('../helpers/databaseHelper');
const getDatabaseHandler = require('../helpers/databaseHelper');

/**
 * Get the Singleton Instance of the Core Database Handlers.
 * @returns {object} - Get the instance of Core Database Handlers.
 **/
const coreDatabaseHandler = getDatabaseHandler(DATA_SOURCE_CORE_DATA, {});


// Get the field type mapping from the core database handler
const { FIELD_TYPES } = coreDatabaseHandler;

/**
 * Object Constant containing the Table Name
 */
const TABLE_NAME = 'PUBLIC.SCHEDULE';

/**
 * Object Constant containing the Table Columns Names with their corresponding field type.
 */
const TABLE_COLUMNS = {
    ID: FIELD_TYPES.SERIAL,
    USER_ID: FIELD_TYPES.SERIAL,
    DATE: FIELD_TYPES.DATE,
    FROM: FIELD_TYPES.TIMESTAMP,
    TO: FIELD_TYPES.TIMESTAMP,
};

/**
 * Object Constant containing the Mappings for the Operations to the relevant SQL Statement.
 */
const SQL_STATEMENT_BY_OPERATION = {};

/**
 * SCHEDULE Table Schema
 *
 * Schema definition for the user table in the CORE database.
 */
module.exports = {
    TABLE_NAME,
    TABLE_COLUMNS,
    TABLE_COLUMN_ENUMS: {},
    SQL_STATEMENT_BY_OPERATION,
};
