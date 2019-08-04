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
 * String Constant containing the ENUM value ACTIVE for column STATUS
 */
const STATUS_ACTIVE = 'Y';

/**
 * String Constant containing the ENUM value INACTIVE for column STATUS
 */
const STATUS_INACTIVE = 'N';

/**
 * Object Constant containing the Table Name
 */
const TABLE_NAME = 'PUBLIC.USER';

/**
 * Object Constant containing the Table Columns Names with their corresponding field type.
 */
const TABLE_COLUMNS = {
    ID: FIELD_TYPES.SERIAL,
    USERNAME: FIELD_TYPES.STRING,
    PASSWORD: FIELD_TYPES.STRING,
    ROLE: FIELD_TYPES.STRING,
    FIRST_NAME: FIELD_TYPES.STRING,
    LAST_NAME: FIELD_TYPES.STRING,
    PHONE_NUMBER: FIELD_TYPES.STRING,
    EMAIL: FIELD_TYPES.STRING,
    STATUS: FIELD_TYPES.STRING,
};

/**
 * Array Constant containing the Table Columns Names.
 */
const tableColumnNames = Object.keys(TABLE_COLUMNS);

/**
 * Object Constant containing the Mappings for the Operations to the relevant SQL Statement.
 */
const SQL_STATEMENT_BY_OPERATION = {
    INSERT_RECORD: `INSERT INTO ${TABLE_NAME} (${tableColumnNames.join(',')}) VALUES (${tableColumnNames.join(',')})`,
    FIND_ACTIVE_USER_BY_USERNAME: `SELECT ${tableColumnNames.join(',')} FROM ${TABLE_NAME} WHERE USERNAME = $1 AND STATUS = '${STATUS_ACTIVE}'`,
};

/**
 * USER Table Schema
 *
 * Schema definition for the user table in the CORE database.
 */
module.exports = {
    TABLE_NAME,
    TABLE_COLUMNS,
    TABLE_COLUMN_ENUMS: {
        STATUS_ACTIVE,
        STATUS_INACTIVE,
    },
    SQL_STATEMENT_BY_OPERATION,
};
