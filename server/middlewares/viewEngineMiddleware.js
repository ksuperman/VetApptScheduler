const { appServerViews } = require('../../config/paths');

/**
 * Attach and Configure the view engine for the express app.
 */
function ViewEngineMiddleware() {
    return (app) => {
        app.set('views', appServerViews);
        app.set('view engine', 'ejs');
    };
}

module.exports = ViewEngineMiddleware;
