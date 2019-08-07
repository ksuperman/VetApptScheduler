const bcrypt = require('bcrypt');
const crypto = require('crypto');

/**
 * Constant to Specify the Base 64 Encoding type in Node Buffer
 */
const NODE_ENCODING_TYPE_BASE64 = 'base64';

/**
 * Constant to Specify the sha1 hashing method for crypto module hashing.
 */
const NODE_HASHING_METHOD_TYPE_SHA1 = 'sha1';

/**
 * Constant to Specify the Number of Rounds for Salt Encoding.
 */
const CRYPTO_SALT_ROUNDS = 10;

/**
 * Method to Generate Hash for Data.
 */
const generateHashForData = async data => bcrypt.hash(data, CRYPTO_SALT_ROUNDS);

/**
 * Method to Compare Hash generate for Data with the original hash.
 */
const compareOriginalHashWithHashGeneratedForData = async (data, originalHash) => bcrypt.compare(data, originalHash);

/**
 * Method to Generate SH1 hash for a Given String and Output the Base64 Encoded String.
 */
const getSH1HashedBase64EncodedString = (utf8String = '') => crypto.createHash(NODE_HASHING_METHOD_TYPE_SHA1).update(utf8String).digest(NODE_ENCODING_TYPE_BASE64);


module.exports = {
    generateHashForData,
    compareOriginalHashWithHashGeneratedForData,
    getSH1HashedBase64EncodedString,
};
