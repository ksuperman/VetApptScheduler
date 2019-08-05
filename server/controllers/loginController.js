const passport = require('passport');
const { SERVER_ROUTE_URL, PASSPORT_AUTH_STRATEGY } = require('../constants');

const postLoginController = (req, res, next) => {
    passport.authenticate(PASSPORT_AUTH_STRATEGY.LOCAL, (error, user, info) => {
        if (error) {
            return res.status(500).json(error);
        }
        if (!user) {
            return res.status(401).json(info.message);
        }
        res.json(user);
    })(req, res, next);
};

const formLoginController = passport.authenticate(PASSPORT_AUTH_STRATEGY.LOCAL, {
    successRedirect: SERVER_ROUTE_URL.DASHBOARD,
    failureRedirect: SERVER_ROUTE_URL.HOME,
})

module.exports = {
    formLoginController,
    postLoginController,
};
