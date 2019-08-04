const express = require('express');
const passport = require('passport');
const { SERVER_ROUTE_URL, PASSPORT_AUTH_STRATEGY } = require('../../config/server/serverConstants');

const unsecuredApiRouter = module.exports = express.Router();

unsecuredApiRouter.post('/auth/login', passport.authenticate(PASSPORT_AUTH_STRATEGY.LOCAL, {
    successRedirect: SERVER_ROUTE_URL.DASHBOARD,
    failureRedirect: SERVER_ROUTE_URL.HOME,
}));

unsecuredApiRouter.post('/login', (req, res, next) => {
    passport.authenticate(PASSPORT_AUTH_STRATEGY.LOCAL, (error, user, info) => {
        if (error) {
            return res.status(500).json(error);
        }
        if (!user) {
            return res.status(401).json(info.message);
        }
        res.json(user);
    })(req, res, next);
});
