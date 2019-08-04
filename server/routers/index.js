const express = require('express');
const initPassport = require('../lib/passport/passportAuthentication');
const unSecuredRouter = require('./unSecuredRouter');
const securedRouter = require('./securedRouter');

// Create an Application Router to handle the requests
const router = module.exports = express.Router();

// Initialize the passport
initPassport(router);

// Attach the unsecured Router.
router.use(unSecuredRouter);

// Attach the secured Router.
router.use(securedRouter);
