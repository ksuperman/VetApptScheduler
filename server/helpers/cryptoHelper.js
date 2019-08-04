const bcrypt = require('bcrypt');


const CRYPTO_SALT_ROUNDS = 10;

/**
 * Method to Generate Hash for Data.
 */
const generateHashForData = async data => bcrypt.hash(data, CRYPTO_SALT_ROUNDS);

/**
 * Method to Compare Hash generate for Data with the original hash.
 */
const compareOriginalHashWithHashGeneratedForData = async (data, originalHash) => bcrypt.compare(data, originalHash);


module.exports = {
    generateHashForData,
    compareOriginalHashWithHashGeneratedForData,
};
