const { DATA_SOURCE_CORE_DATA } = require('../helpers/databaseHelper');
const getDatabaseHandler = require('../helpers/databaseHelper');
const petUserModel = require('../models/petUserModel');

/**
 * Get the Singleton Instance of the Core Database Handlers.
 * @returns {object} - Get the instance of Core Database Handlers.
 **/
const coreDatabaseHandler = getDatabaseHandler(DATA_SOURCE_CORE_DATA, {});

/**
 * Method to create pet.
 */
const createPetUser = async (pet = {}) => coreDatabaseHandler.fetchOrInsertOne(petUserModel.SQL_STATEMENT_BY_OPERATION.INSERT_PET_USER, [
    pet.petId,
    pet.petOwnerId,
]);

module.exports = {
    createPetUser,
};
