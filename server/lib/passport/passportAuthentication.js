const passport = require('passport');
const initPassportLocalStrategy = require('./passportLocalStrategy');
const userDao = require('../../dao/userDao');
const AuthenticateMiddleware = require('../../middlewares/authenticateMiddleware');

/**
 * Serialize the User Object into the Request Session. i.e. save only the `username` to the passport session.
 */
passport.serializeUser((user, done) => {
    done(null, user.username);
});

/**
 * De-Serialize the User Object into the Request Session. i.e. get the user object back by using the `username` saved during Serialization.
 */
passport.deserializeUser(async (username, done) => {
    const user = await userDao.getUserByUserName(username);
    done(null, user);
});

/**
 * Method to Initialize and Setup the Passport Authentication.
 */
const initPassport = (app) => {
    // Setup Passport to use local starategy.
    initPassportLocalStrategy();

    // Initialize Passport in the Application Middleware.
    app.use(passport.initialize({}));
    app.use(passport.session({}));
};

module.exports.AuthenticateMiddleware = AuthenticateMiddleware;

module.exports = initPassport;
