const passport = require('passport');
const debug = require('debug')('vetapptschduler:loginController');
const { SECURED_SERVER_ROUTE_URL, SERVER_ROUTE_URL, PASSPORT_AUTH_STRATEGY, HTTP_STATUS_CODES } = require('../constants');

const postLoginController = (req, res, next) => {
    passport.authenticate(PASSPORT_AUTH_STRATEGY.LOCAL, (error, user, info) => {
        if (error) {
            debug('postLoginController::error::%e', error);
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        }

        if (!user) {
            debug('postLoginController::user not found::info::', info);
            return res.status(HTTP_STATUS_CODES.UNAUTHORIZED).json({ errorCode: 'USER_OR_PASS_INCORRECT', details: 'USER_OR_PASS_INCORRECT' });
        }

        debug('postLoginController::USER_FOUND::info::', info, ':::::USER::::', user);

        // If User Found then return user object.
        req.login(user, (err) => {
            if (err) {
                debug('postLoginController::LOGIN_Error::%e', error);
                return next(err);
            }
            debug('postLoginController::LOGIN_SUCCESS::%e', error);
            return res.status(HTTP_STATUS_CODES.OK).json(user);
        });
        // return res.json(user);
    })(req, res, next);
};

const formLoginController = passport.authenticate(PASSPORT_AUTH_STRATEGY.LOCAL, {
    successRedirect: SECURED_SERVER_ROUTE_URL.DASHBOARD,
    failureRedirect: SERVER_ROUTE_URL.HOME,
});

module.exports = {
    formLoginController,
    postLoginController,
};
