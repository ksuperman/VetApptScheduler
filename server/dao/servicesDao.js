const { DATA_SOURCE_CORE_DATA } = require('../helpers/databaseHelper');
const getDatabaseHandler = require('../helpers/databaseHelper');
const servicesModel = require('../models/servicesModel');

/**
 * Get the Singleton Instance of the Core Database Handlers.
 * @returns {object} - Get the instance of Core Database Handlers.
 **/
const coreDatabaseHandler = getDatabaseHandler(DATA_SOURCE_CORE_DATA, {});

/**
 * Method to get the user by username.
 */
const getServicesPaginated = async (limit = 10, offset = 0) => coreDatabaseHandler.fetchAllRows(servicesModel.SQL_STATEMENT_BY_OPERATION.GET_ALL_SERVICES, [limit, offset]);

module.exports = {
    getServicesPaginated,
};
