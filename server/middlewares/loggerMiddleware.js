const logger = require('morgan');
const { isDev } = require('../utils/envUtils');

/**
 * Attach and Configure the Body Parser for the express app.
 */
function LoggerMiddleware(options = {}) {
    const loggerInstanceType = isDev ? 'dev' : 'combined';
    const loggerInstance = logger(loggerInstanceType);

    return (app) => {
        // Body parser
        app.use(loggerInstance);
    };
}

module.exports = LoggerMiddleware;
