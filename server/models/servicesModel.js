const { DATA_SOURCE_CORE_DATA } = require('../helpers/databaseHelper');
const getDatabaseHandler = require('../helpers/databaseHelper');
const petUserModel = require('./petUserModel');

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
const TABLE_NAME = 'PUBLIC.SERVICES';

/**
 * Object Constant containing the Table Columns Names with their corresponding field type.
 */
const TABLE_COLUMNS = {
    ID: FIELD_TYPES.SERIAL,
    NAME: FIELD_TYPES.STRING,
    DURATION: FIELD_TYPES.NUMBER,
    PRICE: FIELD_TYPES.NUMBER,
};

/**
 * Array Constant containing the Table Columns Names.
 */
const tableColumnNames = Object.keys(TABLE_COLUMNS);

/**
 * Object Constant containing the Mappings for the Operations to the relevant SQL Statement.
 */
const SQL_STATEMENT_BY_OPERATION = {
    GET_ALL_SERVICES: `SELECT * FROM ${TABLE_NAME} LIMIT $1 OFFSET $2`,
};

/**
 * SERVICES Table Schema
 *
 * Schema definition for the user table in the CORE database.
 */
module.exports = {
    TABLE_NAME,
    TABLE_COLUMNS,
    TABLE_COLUMN_ENUMS: {},
    SQL_STATEMENT_BY_OPERATION,
};
