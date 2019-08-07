const express = require('express');
const paths = require('../../config/paths');
const AuthenticateMiddleware = require('../middlewares/authenticateMiddleware');
const { stringifyJSON } = require('../utils/objectUtils');
const { SECURED_SERVER_ROUTE_URL } = require('../constants');
const securedApiRouter = require('./securedApi');

const securedRouter = module.exports = express.Router();

// Attach the Auth Middleware to Secured Router.
AuthenticateMiddleware()(securedRouter);

securedRouter.use(SECURED_SERVER_ROUTE_URL.API, securedApiRouter);

// Secured Routes that require Authentication.
securedRouter.get([SECURED_SERVER_ROUTE_URL.DASHBOARD, SECURED_SERVER_ROUTE_URL.MAKE_APPOINTMENT, SECURED_SERVER_ROUTE_URL.ADD_PET], (req, res) => {
    res.render('index', { PUBLIC_FOLDER_NAME: paths.appStaticPublicFolderName, USER: stringifyJSON(req.user) });
});
