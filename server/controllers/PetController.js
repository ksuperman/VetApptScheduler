const debug = require('debug')('vetapptschduler:addPetController');
const { createPet, getPets } = require('../dao/petDao');
const { createPetUser } = require('../dao/petUserDao');
const { HTTP_STATUS_CODES } = require('../constants');
const memoize = require('../utils/memoizeUtil');

/**
 * Create a Memoize instance of the User Fetch Query to Save from going to DB.
 */
const memoizedGetPets = memoize(getPets);

/**
 * Controller Method for the Adding a Pet to the Pet Owner Account.
 */
const createPetInDB = async (req, res, next) => {
    const pet = req.body;

    debug('pet sent in request :: ', pet);

    if (!pet) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ details: 'Missing Pet Information' });
    }

    /**
     * Insert the pet into the DB.
     */
    const registerPet = await createPet(pet);

    debug('pet created ::', registerPet);

    /**
     * Create Link between pet and pet owner.
     */
    const petUserLink = await createPetUser({
        petId: registerPet.id,
        petOwnerId: pet.petOwnerId,
    });

    debug('petUserLink created ::', petUserLink);

    return res.status(HTTP_STATUS_CODES.CREATED).send({});
};

/**
 * Get all pets for a pet owner.
 * e.g. req.params: { "userId": "34" }
 */
const getPetFromDB = async (req, res, next) => {
    debug('getPetFromDB request ::', req.params);

    const pets = await memoizedGetPets(req.params.userId);
    debug('getPetFromDB pets FROM DB ::', pets);

    return res.status(HTTP_STATUS_CODES.OK).json([...pets]);
};

module.exports = {
    post: createPetInDB,
    get: getPetFromDB,
};
