const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
// const bcrypt = require('bcrypt');
const userDao = require('../../dao/userDao');

/**
 * Method to setup local strategy authentication.
 */
const localStrategyAuthenticationCallback = async (username, password, done) => {
    let error;
    let user;

    try {
        user = await userDao.getUserByUserName(username);
    } catch (e) {
        error = e;
    }

    console.log('error', error);

    if (error) {
        return done(error);
    }

    // User not found
    if (!user) {
        console.log('User not found');
        return done(null, false);
    }

    console.log('User found!!', user);

    return done(null, user);

    // Always use hashed passwords and fixed time comparison
    // bcrypt.compare(password, user.password, (err, isValid) => {
    //     if (err) {
    //         return done(err);
    //     }
    //     if (!isValid) {
    //         return done(null, false);
    //     }
    //     return done(null, user);
    // });
};

/**
 * Method to Initialize and Setup the Passport Authentication.
 */
const initPassportLocalStrategy = () => {
    // Setup Passport to use local starategy.
    passport.use(new LocalStrategy(localStrategyAuthenticationCallback));
};

module.exports = initPassportLocalStrategy;
