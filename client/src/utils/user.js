import { makeAPIRequest } from './api';
/**
 * API call to logout user.
 */
export const logoutUser = async () => makeAPIRequest({
    url: '/api/logout',
});

/**
 * API call to get user by filter.
 */
export const getUsersByFilter = async (filters = {}) => {
    const filterQueryKeys = Object.keys(filters);
    let filterQueryString = '';
    // eslint-disable-next-line no-plusplus
    for (let i = 0, filterQueryKeysLen = filterQueryKeys.length; i < filterQueryKeysLen; i++) {
        let separator = '&';
        if (i === 0) {
            separator = '?';
        }
        const filterQueryKey = filterQueryKeys[i];
        filterQueryString += `${separator}${filterQueryKey}=${filters[filterQueryKeys[i]]}`;
    }

    return makeAPIRequest({
        url: `/api/users${filterQueryString}`,
        method: 'GET',
    });
};
