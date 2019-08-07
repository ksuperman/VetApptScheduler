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

/**
 *  Method to get convert SQL Timestamp value to Date Object
 */
const getDateFromSQLTimeStamp = (sqlDateString = '', sqlTimeString = '00:00:00') => {
    console.log('sqlDateString ===> ', sqlDateString);

    console.log('sqlTimeString', sqlTimeString);

    const sqlDateStringArr = sqlDateString.split('-');

    // eslint-disable-next-line no-plusplus
    --sqlDateStringArr[1];

    const sqlTimeStringArr = sqlTimeString.split(':');

    const sqlDateObject = new Date(Date.UTC(...sqlDateStringArr, ...sqlTimeStringArr));

    // Return the Converted Date Object.
    return sqlDateObject;
};

const getSQLTimeStampStringFromDateAndTimeString = (dateString, browserTimeString) => `${dateString} ${browserTimeString}:00`;

module.exports = {
    getSQLDateFromDate,
    getSQLTimeFromDate,
    getSQLTimeStampFromDate,
    getDateFromSQLTimeStamp,
    getSQLTimeStampStringFromDateAndTimeString,
};
