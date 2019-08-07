const { DATA_SOURCE_CORE_DATA } = require('../helpers/databaseHelper');
const getDatabaseHandler = require('../helpers/databaseHelper');
const petModel = require('../models/petModel');

/**
 * Get the Singleton Instance of the Core Database Handlers.
 * @returns {object} - Get the instance of Core Database Handlers.
 **/
const coreDatabaseHandler = getDatabaseHandler(DATA_SOURCE_CORE_DATA, {});

/**
 * Method to get the user by username.
 */
const getPets = async userId => coreDatabaseHandler.fetchAllRows(petModel.SQL_STATEMENT_BY_OPERATION.GET_PETS_BY_PET_OWNER_ID, [userId]);

/**
 * Method to create pet.
 */
const createPet = async (pet = {}) => coreDatabaseHandler.fetchOrInsertOne(petModel.SQL_STATEMENT_BY_OPERATION.INSERT_PET, [
    pet.petName,
]);

module.exports = {
    createPet,
    getPets,
};
