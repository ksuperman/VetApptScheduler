const createError = require('http-errors');

/**
 * Attach and Configure the Not for the express app.
 */
function NotFoundMiddleware() {
    return (app) => {
        // catch 404 and forward to error handler
        app.use((req, res, next) => {
            next(createError(404));
        });
    };
}

module.exports = NotFoundMiddleware;
