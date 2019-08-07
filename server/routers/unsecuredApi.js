const express = require('express');
const debug = require('debug')('vetapptschduler:unsecuredApi');
const accountController = require('../controllers/accountController');
const { postLoginController, formLoginController } = require('../controllers/loginController');
const { asyncRouteHandler } = require('../utils/asyncHandlerUtil');
const { SERVER_ROUTE_URL } = require('../constants');
const logoutController = require('../controllers/logoutController');

const unsecuredApiRouter = module.exports = express.Router();
/**
 * Create Account Handler
 */
unsecuredApiRouter.post(SERVER_ROUTE_URL.CREATE_ACCOUNT, asyncRouteHandler(accountController.post));

/**
 * Login Handler
 */
unsecuredApiRouter.post(SERVER_ROUTE_URL.LOGIN, asyncRouteHandler(postLoginController));

unsecuredApiRouter.post('/auth/login', asyncRouteHandler(formLoginController));

/**
 * Logout Handlers
 */
unsecuredApiRouter.post(SERVER_ROUTE_URL.LOGOUT, asyncRouteHandler(logoutController));

// API Error handler Middleware.
unsecuredApiRouter.use((err, req, res, next) => {
    debug('unsecuredApiRouter::error::%e', err);
    res.status(err.status || 500).json(err);
});
