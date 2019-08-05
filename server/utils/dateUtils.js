/**
 * Method to get convert Date into a SQL Date value
 * e.g. 2004-10-19
 */
const getSQLDateFromDate = (date = new Date()) => (`${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}}`);

/**
 * Method to get convert Date into a SQL Time value
 * e.g. 10:23:54
 */
const getSQLTimeFromDate = (date = new Date()) => (`${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`);

/**
 * Method to get convert Date into a SQL Timestamp value
 * e.g. 2004-10-19 10:23:54
 */
const getSQLTimeStampFromDate = (date = new Date()) => (getSQLDateFromDate(date) + getSQLTimeFromDate(date));

module.exports = {
    getSQLDateFromDate,
    getSQLTimeFromDate,
    getSQLTimeStampFromDate,
};
