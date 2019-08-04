const { DATA_SOURCE_CORE_DATA } = require('../helpers/databaseHelper');
const getDatabaseHandler = require('../helpers/databaseHelper');
const userModel = require('../models/userModel');

/**
 * Get the Singleton Instance of the Core Database Handlers.
 * @returns {object} - Get the instance of Core Database Handlers.
 **/
const coreDatabaseHandler = getDatabaseHandler(DATA_SOURCE_CORE_DATA, {});

/**
 * Method to get the user by username.
 */
const getUserByUserName = async userName => coreDatabaseHandler.fetchOne(userModel.SQL_STATEMENT_BY_OPERATION.FIND_ACTIVE_USER_BY_USERNAME, [userName]);

module.exports = {
    getUserByUserName,
};
