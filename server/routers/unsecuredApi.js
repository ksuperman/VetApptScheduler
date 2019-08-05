const express = require('express');
const debug = require('debug')('vetapptschduler:unsecuredApi');
const createAccountController = require('../controllers/createAccountController');
const { postLoginController, formLoginController } = require('../controllers/loginController');
const { asyncRouteHandler } = require('../utils/asyncHandlerUtil');

const unsecuredApiRouter = module.exports = express.Router();
/**
 * Create Account Handler
 */
unsecuredApiRouter.post('/createaccount', asyncRouteHandler(createAccountController));

/**
 * Login Handler
 */
unsecuredApiRouter.post('/login', asyncRouteHandler(postLoginController));

unsecuredApiRouter.post('/auth/login', asyncRouteHandler(formLoginController));

// API Error handler Middleware.
unsecuredApiRouter.use((err, req, res, next) => {
    debug('error::%e', err);
    res.status(err.status || 500).json(err);
});
