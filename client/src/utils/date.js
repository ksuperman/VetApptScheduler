/**
 * Method to add Minutes to the Data object.
 */
export const addMinutes = (date = new Date(), minutes) => new Date(date.getTime() + minutes * 60000);

/**
 *  Method to get convert SQL Timestamp value to Date Object
 */
export const getDateFromSQLTimeStamp = (sqlDateString = '', sqlTimeString = '00:00:00') => {
    console.log('sqlDateString ===> ', sqlDateString);

    console.log('sqlTimeString', sqlTimeString);

    const sqlDateStringArr = sqlDateString.split('-');

    // eslint-disable-next-line no-plusplus
    --sqlDateStringArr[1];

    const sqlTimeStringArr = sqlTimeString.split(':');

    // Return the Converted Date Object.
    return new Date(Date.UTC(...sqlDateStringArr, ...sqlTimeStringArr));
};
