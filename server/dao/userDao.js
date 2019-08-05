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
const getUserByUserName = async userName => coreDatabaseHandler.fetchOrInsertOne(userModel.SQL_STATEMENT_BY_OPERATION.FIND_ACTIVE_USER_BY_USERNAME, [userName]);

/**
 * Method to create account.
 */
const createAccount = async (user = {}) => coreDatabaseHandler.fetchOrInsertOne(userModel.SQL_STATEMENT_BY_OPERATION.INSERT_USER, [
    user.username,
    user.password,
    user.role,
    user.firstName,
    user.lastName,
    user.phoneNumber,
    user.email,
    userModel.TABLE_COLUMN_ENUMS.STATUS.ACTIVE,
]);

module.exports = {
    createAccount,
    getUserByUserName,
};
