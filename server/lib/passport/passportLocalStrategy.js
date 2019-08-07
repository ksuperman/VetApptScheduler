const passport = require('passport');
const debug = require('debug')('vetapptschduler:passportLocalStrategy');
const { Strategy: LocalStrategy } = require('passport-local');
const { compareOriginalHashWithHashGeneratedForData } = require('../../helpers/cryptoHelper');
const userDao = require('../../dao/userDao');
const memoize = require('../../utils/memoizeUtil');

/**
 * Create a Memoize instance of the User Fetch Query to Save from going to DB.
 */
const memoizedGetUserByUserName = memoize(userDao.getUserByUserName);

/**
 * Method to setup local strategy authentication.
 */
const localStrategyAuthenticationCallback = async (username, password, done) => {
    let error;
    let user;

    debug('localStrategyAuthenticationCallback::request==>username', username);
    debug('localStrategyAuthenticationCallback::request==>password', password);

    try {
        user = await memoizedGetUserByUserName(username);
    } catch (e) {
        error = e;
    }

    if (error) {
        debug('localStrategyAuthenticationCallback::error', error);
        return done(error);
    }

    // User not found
    if (!user) {
        debug('localStrategyAuthenticationCallback::USER_NOT_FOUND', error);
        return done(null, false);
    }

    debug('localStrategyAuthenticationCallback::USER_FOUND!!', user);

    // Check if the Passwords match.
    const isValid = await compareOriginalHashWithHashGeneratedForData(password, user.password);

    // If Passwords don't match with the db user cred send a FAILURE response to request.
    if (!isValid) {
        debug('localStrategyAuthenticationCallback::PASSWORD::NOT_VALID::', isValid);
        return done(null, false);
    }

    // If Passwords match with the db user cred send a SUCCESS response to request.
    debug('localStrategyAuthenticationCallback::PASSWORD::VALID::', isValid);
    return done(null, user);
};

/**
 * Method to Initialize and Setup the Passport Authentication.
 */
const initPassportLocalStrategy = () => {
    // Setup Passport to use local starategy.
    passport.use(new LocalStrategy(localStrategyAuthenticationCallback));
};

module.exports = initPassportLocalStrategy;
