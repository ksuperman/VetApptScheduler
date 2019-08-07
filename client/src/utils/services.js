import { makeAPIRequest } from './api';

/**
 * Method to Fetch all the Services available.
 */
export const getServicesPaginated = async (limit = 10, offset = 0) => makeAPIRequest({
    url: `/api/services?limit=${limit}&offset=${offset}`,
    method: 'GET',
});
