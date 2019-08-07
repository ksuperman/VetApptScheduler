const express = require('express');
const unsecuredApiRouter = require('./unsecuredApi');
const jsFileRouter = require('./jsFileRouter');
const paths = require('../../config/paths');
const { stringifyJSON } = require('../utils/objectUtils');
const { SERVER_ROUTE_URL } = require('../constants');

const unsecuredRouter = module.exports = express.Router();

// Attach the JS file router to support differential serving
unsecuredRouter.use(SERVER_ROUTE_URL.JS_FILES, jsFileRouter);

// Attach the Sub router to handle the api calls
unsecuredRouter.use(SERVER_ROUTE_URL.UNSECURED_API, unsecuredApiRouter);

// Render the Home/Login/Register Page
unsecuredRouter.get([SERVER_ROUTE_URL.HOME, SERVER_ROUTE_URL.LOGIN, SERVER_ROUTE_URL.REGISTER], (req, res, next) => {
    res.render('index', { PUBLIC_FOLDER_NAME: paths.appStaticPublicFolderName, USER: stringifyJSON({}) });
});
