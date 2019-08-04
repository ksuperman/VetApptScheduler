/**
 * Attach and Configure the Authenticate Middleware for the express app.
 */
function AuthenticateMiddleware() {
    return (app) => {
        app.use((req, res, next) => {
            if (req.isAuthenticated()) {
                return next();
            }
            res.redirect('/');
        });
    };
}

module.exports = AuthenticateMiddleware;
