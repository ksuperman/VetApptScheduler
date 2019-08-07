const { HTTP_STATUS_CODES } = require('../constants');
/**
 * Attach and Configure the Authenticate Middleware for the express app.
 */
function AuthenticateMiddleware() {
    // eslint-disable-next-line global-require
    const debug = require('debug')('vetapptschduler:AuthenticateMiddleware');
    return (app) => {
        app.use((req, res, next) => {
            const isAuthenticated = req.isAuthenticated();
            debug('req.isAuthenticated', isAuthenticated);
            if (isAuthenticated) {
                return next();
            }
            // For POST API requests send 401 UNAUTHORIZED to caller.
            if (req.method === 'POST') {
                return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).send();
            }
            debug('req.method+++++++GET');
            // For Get Request Send a Redirection i.e. 302 to Client.
            return res.redirect('/');
        });
    };
}

module.exports = AuthenticateMiddleware;
