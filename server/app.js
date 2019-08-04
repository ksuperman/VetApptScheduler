// Core imports

const express = require('express');

// Middlewares
const ViewEngineMiddleware = require('./middlewares/viewEngineMiddleware');
const BodyParserMiddleware = require('./middlewares/bodyParserMiddleware');
const CookieParserMiddleware = require('./middlewares/cookieParserMiddleware');
const StaticFilesMiddleware = require('./middlewares/staticFilesMiddleware');
const SessionMiddleware = require('./middlewares/sessionMiddleware');
const LoggerMiddleware = require('./middlewares/loggerMiddleware');
const CompressionMiddleware = require('./middlewares/compressionMiddleware');
const ErrorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const NotFoundMiddleware = require('./middlewares/notFoundMiddleware');

// Supporting Files
const { appStaticPublicFolderPath } = require('../config/paths');
const router = require('./routers');

// Create an express application instance.
const app = express();

// Setup Logger Middleware
LoggerMiddleware()(app);

// Compression Middleware
CompressionMiddleware()(app);

// Setup View Engine for Express
ViewEngineMiddleware()(app);

// Setup Body parser
BodyParserMiddleware()(app);

// Cookie Parser
CookieParserMiddleware()(app);

// Setting up Request Session
StaticFilesMiddleware(appStaticPublicFolderPath)(app);

// Setting up Static Resource Folder
SessionMiddleware()(app);

// Handle the Application Routing
app.use(router);

// catch 404 and forward to error handler
NotFoundMiddleware()(app);

// Setup the Error handler Middleware
ErrorHandlerMiddleware()(app);

module.exports = app;
