const debug = require('debug')('vetapptschduler:servicesController');
const { getServicesPaginated } = require('../dao/servicesDao');
const { HTTP_STATUS_CODES } = require('../constants');
const memoize = require('../utils/memoizeUtil');

/**
 * Create a Memoize instance of the User Fetch Query to Save from going to DB.
 */
const memoizedGetServicesPaginated = memoize(getServicesPaginated);

/**
 * Get all Services for current page.
 * e.g. req.query: { "limit": "10", offset: 0 }
 */
const getServicesFromDB = async (req, res, next) => {
    const { limit, offset } = req.query || {};
    debug('getServicesFromDB request :: limit', limit);
    debug('getServicesFromDB request :: offset', offset);

    const services = await memoizedGetServicesPaginated(limit, offset);
    debug('getServicesFromDB services FROM DB ::', services);

    return res.status(HTTP_STATUS_CODES.OK).json([...services]);
};

module.exports = {
    get: getServicesFromDB,
};
