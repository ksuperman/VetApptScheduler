const express = require('express');
const debug = require('debug')('vetapptschduler:securedApi');
const PetController = require('../controllers/PetController');
const accountController = require('../controllers/accountController');
const servicesController = require('../controllers/servicesController');
const { asyncRouteHandler } = require('../utils/asyncHandlerUtil');
const { SECURED_SERVER_ROUTE_URL } = require('../constants');

const securedApiRouter = module.exports = express.Router();

/**
 * Pet API Handlers
 */
securedApiRouter.post(SECURED_SERVER_ROUTE_URL.ADD_PET, asyncRouteHandler(PetController.post));

securedApiRouter.get(SECURED_SERVER_ROUTE_URL.GET_PETS, asyncRouteHandler(PetController.get));

securedApiRouter.get(SECURED_SERVER_ROUTE_URL.GET_USERS, asyncRouteHandler(accountController.get));

securedApiRouter.get(SECURED_SERVER_ROUTE_URL.GET_SERVICES, asyncRouteHandler(servicesController.get));

// API Error handler Middleware.
securedApiRouter.use((err, req, res, next) => {
    debug('securedApiRouter::error::', err);
    debug('securedApiRouter::error::%e', err);
    res.status(err.status || 500).json(err);
});
