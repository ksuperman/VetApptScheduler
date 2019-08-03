const cookieParser = require('cookie-parser');

/**
 * Attach and Configure the Cookie Parser for the express app.
 */
function CookieParserMiddleware() {
    return (app) => {
        app.use(cookieParser());
    };
}

module.exports = CookieParserMiddleware;
