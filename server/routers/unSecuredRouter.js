const express = require('express');
const unsecuredApiRouter = require('./unsecuredApi');
const jsFileRouter = require('./jsFileRouter');
const paths = require('../../config/paths');
const { SERVER_ROUTE_URL } = require('../constants');

const unsecuredRouter = module.exports = express.Router();

// Attach the JS file router to support differential serving
unsecuredRouter.use(SERVER_ROUTE_URL.JS_FILES, jsFileRouter);

// Attach the Sub router to handle the api calls
unsecuredRouter.use(SERVER_ROUTE_URL.UNSECURED_API, unsecuredApiRouter);

// Render the Home Page
unsecuredRouter.get(SERVER_ROUTE_URL.HOME, (req, res, next) => {
    res.render('index', { PUBLIC_FOLDER_NAME: paths.appStaticPublicFolderName });
});
