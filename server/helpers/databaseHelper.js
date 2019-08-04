const PostgresDBHandler = require('../lib/postgresDB');

/**
 * Constant to denote SQL Data Source
 */
module.exports.DATA_SOURCE_CORE_DATA = 'postgressql';

/**
 * Object for Storing the Singleton reference for the Database Handler created for each datasource.
 * @memberOf databaseHelpers
 **/
const databaseHandlers = {};

/**
 * Creates a Singleton Database Handled for each of the `dataSource` specified.
 * @memberOf databaseHelpers
 * @param {string} dataSource - the data source to connect
 * @param {object} databaseConfiguration - the configuration to be used to create the connection.
 * @returns {object} - the database handled object for the given data source.
 */
const getDatabaseHandler = (dataSource, databaseConfiguration) => {
    if (!databaseHandlers[dataSource]) {
        // if No instance of the database handler is created in the databaseHandlers store create a new instance
        databaseHandlers[dataSource] = new PostgresDBHandler(databaseConfiguration);
    }

    return databaseHandlers[dataSource];
};

/**
 * Database Helpers Class containing methods for working with Database.
 * @class databaseHelpers
 */
module.exports = getDatabaseHandler;
