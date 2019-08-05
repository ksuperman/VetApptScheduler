const debug = require('debug')('vetapptschduler:createAccountController');
const { createAccount } = require('../dao/userDao');
const { generateHashForData } = require('../helpers/cryptoHelper');
const { HTTP_STATUS_CODES } = require('../constants');
/**
 * Controller Method for the Create Account.
 */
const createAccountController = async (req, res, next) => {
    const user = req.body;

    debug('user sent in request :: ', user);

    if (!user || user.name) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).send({ errorDescription: 'Missing User Information' });
    }

    user.password = await generateHashForData(user.password);

    await createAccount(user);

    debug('user account created :: ', user);

    return res.status(HTTP_STATUS_CODES.CREATED).send({});
};

module.exports = createAccountController;
