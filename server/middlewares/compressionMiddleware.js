const compression = require('compression');

/**
 * Attach and Configure the compression for the express app.
 */
function CompressionMiddleware() {
    return (app) => {
        app.use(compression());
    };
}

module.exports = CompressionMiddleware;
