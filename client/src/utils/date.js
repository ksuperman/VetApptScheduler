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

export const formatAppointmentDateTimeToDisplayString = (startDateTime, endDateTime) => {
    const dateFormatOptions = {
        weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', formatMatcher: 'best fit',
    };
    const timeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
    };

    const currentLocale = navigator.language || 'en-US';

    const dateFomatter = new Intl.DateTimeFormat(currentLocale, dateFormatOptions);
    const timeFomatter = new Intl.DateTimeFormat(currentLocale, timeFormatOptions);

    const startDateObj = new Date(startDateTime);
    const endDateObj = new Date(endDateTime);

    // @TODO handle Different locales
    return `${dateFomatter.format(startDateObj)} ${timeFomatter.format(startDateObj)} - ${timeFomatter.format(endDateObj)}`;
};
