const express = require('express');
const unsecuredApiRouter = require('./unsecuredApi');
const paths = require('../../config/paths');
const { SERVER_ROUTE_URL } = require('../../config/server/serverConstants');

const unsecuredRouter = module.exports = express.Router();

// Attach the Sub router to handle the api calls
unsecuredRouter.use(SERVER_ROUTE_URL.UNSECURED_API, unsecuredApiRouter);

unsecuredRouter.get(SERVER_ROUTE_URL.HOME, (req, res, next) => {
    res.render('index', { PUBLIC_FOLDER_NAME: paths.appStaticPublicFolderName });
});
