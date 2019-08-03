const session = require('express-session');
const { APP_SESSION_SERVER_KEY } = require('../../config/server/serverConstants');

/**
 * Attach and Configure the Body Parser for the express app.
 */
function SessionMiddleware(options = {}) {
    const defaultOptions = {
        saveUninitialized: true,
        resave: false,
        secret: APP_SESSION_SERVER_KEY,
    };

    return (app) => {
        // Body parser
        app.use(session({ ...defaultOptions, ...options }));
    };
}

module.exports = SessionMiddleware;
