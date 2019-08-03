const BaseExceptions = require('./BaseException');
const { HTTP_STATUS_CODES } = require('../../../config/server/serverConstants');
/**
 * Class to handle the Postgres Exception
 * @extends BaseExceptions
 */
class PostgresError extends BaseExceptions {
    /**
     * Create an instance of the PostgresError Class.
     * @param {string} name - The name of the exception.
     * @param {string} message - The message describing the exception.
     * @param {object} details - The detail description of the error.
     */
    constructor(name, message, details) {
        super(name, message, HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR, details);
    }
}

module.exports = PostgresError;
