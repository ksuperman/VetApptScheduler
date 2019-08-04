const ObjectUtils = require('../../utils/objectUtils');

/**
 * Class BaseException use a starter for all the exceptions
 * @extends Error
 */
class BaseExceptions extends Error {
    /**
     * Create an instance of the BaseException Class.
     * @param {string} name - The name of the exception.
     * @param {string} message - The message describing the exception.
     * @param {string} statusCode - The HTTP Status Code corresponding to the exception.
     * @param {object} details - The exception details object
     */
    constructor(name, message, statusCode, details) {
        // Calling parent constructor of base Error class.
        super(message);

        // Set the Error Name
        this.name = name;

        // Set the HttpStatusCode to be used for this exception.
        this.statusCode = statusCode;

        // The error details object
        this.details = details;

        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * to String method Override.
     * @returns {String} - Serialized Error Object
     */
    toString() {
        const {
            name,
            message: errorMessage,
            stack,
            statusCode,
            details,
        } = this;

        let stringMessage = `ErrorName: ${name} :: ErrorMessage: ${errorMessage}`;
        stringMessage += ` :: ErrorDetails: ${ObjectUtils.stringifyJSON(details)} :: ErrorStatusCode: ${statusCode} :: ErrorStack: ${stack}`;

        return `BaseExceptions[${stringMessage}]`;
    }
}

// This would output "[object BaseExceptions]" rather than "[object Object]".
Object.defineProperty(BaseExceptions.prototype, Symbol.toStringTag, {
    value: 'BaseExceptions',
});

module.exports = BaseExceptions;
