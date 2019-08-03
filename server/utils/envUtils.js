/**
 * Method to check if the current execution environment is development.
 */
function isDev() {
    return process.env.NODE_ENV === 'development';
}

/**
 * Method to check if the current execution environment is production.
 */
function isProd() {
    return process.env.NODE_ENV === 'production';
}

module.exports = {
    isDev,
    isProd,
};
