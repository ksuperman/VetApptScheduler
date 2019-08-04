const express = require('express');
const paths = require('../../config/paths');
const AuthenticateMiddleware = require('../middlewares/authenticateMiddleware');

const securedRouter = module.exports = express.Router();

// Attach the Auth Middleware to Secured Router.
AuthenticateMiddleware()(securedRouter);

// Secured Routes that require Authentication.
securedRouter.get('/dashboard', (req, res) => {
    res.render('index', { PUBLIC_FOLDER_NAME: paths.appStaticPublicFolderName });
});
