const debug = require('debug');
const ObjectUtils = require('../utils/objectUtils');

/**
 * Adding a Debug Formatter for the Error.
 */
debug.formatters.e = (err) => {
    const {
        name,
        message,
        stack,
        statusCode,
        details,
    } = err;

    let stringMessage = `ErrorName: ${name} :: ErrorMessage: ${message}`;
    stringMessage += ` :: ErrorDetails: ${ObjectUtils.stringifyJSON(details)} :: ErrorStatusCode: ${statusCode} :: ErrorStack: ${stack}`;

    return `BaseExceptions[${stringMessage}]`;
};
