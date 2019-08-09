const express = require('express');
const debug = require('debug')('vetapptschduler:securedApi');
const PetController = require('../controllers/PetController');
const accountController = require('../controllers/accountController');
const servicesController = require('../controllers/servicesController');
const appointmentController = require('../controllers/appointmentController');
const { asyncRouteHandler } = require('../utils/asyncHandlerUtil');
const { SECURED_SERVER_ROUTE_URL } = require('../constants');

const securedApiRouter = module.exports = express.Router();

/**
 * Pet API Handlers
 */
securedApiRouter.post(SECURED_SERVER_ROUTE_URL.ADD_PET, asyncRouteHandler(PetController.post));

securedApiRouter.get(SECURED_SERVER_ROUTE_URL.PETS_API, asyncRouteHandler(PetController.get));
/**
 * User Account handler
 */
securedApiRouter.get(SECURED_SERVER_ROUTE_URL.USER_API, asyncRouteHandler(accountController.get));

/**
 * Services Handler.
 */
securedApiRouter.get(SECURED_SERVER_ROUTE_URL.SERVICES_API, asyncRouteHandler(servicesController.get));

/**
 * Apointment handler.
 */
securedApiRouter.post(SECURED_SERVER_ROUTE_URL.APPOINTMENT_API, asyncRouteHandler(appointmentController.post));

securedApiRouter.get(SECURED_SERVER_ROUTE_URL.APPOINTMENT_API, asyncRouteHandler(appointmentController.get));

securedApiRouter.patch(SECURED_SERVER_ROUTE_URL.APPOINTMENT_API_PATCH, asyncRouteHandler(appointmentController.patch));

// API Error handler Middleware.
securedApiRouter.use((err, req, res, next) => {
    debug('securedApiRouter::error::', err);
    debug('securedApiRouter::error::%e', err);
    res.status(err.status || 500).json(err);
});
