import { makeAPIRequest } from './api';

export const getPetForPetOwner = async petOwnerId => makeAPIRequest({
    url: `/api/users/${petOwnerId}/pets`,
    method: 'GET',
});
