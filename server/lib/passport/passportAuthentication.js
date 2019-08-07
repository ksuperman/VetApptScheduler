const passport = require('passport');
const debug = require('debug')('vetapptschduler:passportAuthentication');
const initPassportLocalStrategy = require('./passportLocalStrategy');
const userDao = require('../../dao/userDao');
const AuthenticateMiddleware = require('../../middlewares/authenticateMiddleware');
const memoize = require('../../utils/memoizeUtil');

/**
 * Create a Memoize instance of the User Fetch Query to Save from going to DB.
 */
const memoizedGetUserByUserName = memoize(userDao.getUserByUserName);

/**
 * Serialize the User Object into the Request Session. i.e. save only the `username` to the passport session.
 */
passport.serializeUser((user, done) => {
    debug('serializeUser::successful::', user);
    done(null, user.username);
});

/**
 * De-Serialize the User Object into the Request Session. i.e. get the user object back by using the `username` saved during Serialization.
 */
passport.deserializeUser(async (username, done) => {
    const user = await memoizedGetUserByUserName(username);
    delete user.password;
    debug('deserializeUser::successful::', username);
    done(null, user);
});

/**
 * Method to Initialize and Setup the Passport Authentication.
 */
const initPassport = (app) => {
    // Initialize Passport in the Application Middleware.
    app.use(passport.initialize({}));
    app.use(passport.session({}));
    // Setup Passport to use local starategy.
    initPassportLocalStrategy();
};

module.exports.AuthenticateMiddleware = AuthenticateMiddleware;

module.exports = initPassport;
