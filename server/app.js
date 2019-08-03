// Core imports
const createError = require('http-errors');
const express = require('express');

// Middlewares
const ViewEngineMiddleware = require('./middlewares/viewEngineMiddleware');
const BodyParserMiddleware = require('./middlewares/bodyParserMiddleware');
const CookieParserMiddleware = require('./middlewares/cookieParserMiddleware');
const StaticFilesMiddleware = require('./middlewares/staticFilesMiddleware');
const SessionMiddleware = require('./middlewares/sessionMiddleware');
const LoggerMiddleware = require('./middlewares/loggerMiddleware');

// Supporting Files
const { appStaticPublicFolder } = require('../config/paths');
const indexRouter = require('./routers');

// Create an express application instance.
const app = express();

// Setup Logger Middleware
const loggerMiddleware = new LoggerMiddleware();
loggerMiddleware(app);

// Setup View Engine for Express
const viewEngineMiddleware = new ViewEngineMiddleware();
viewEngineMiddleware(app);

// Setup Body parser
const bodyParserMiddleware = new BodyParserMiddleware();
bodyParserMiddleware(app);

// Cookie Parser
const cookieParserMiddleware = new CookieParserMiddleware();
cookieParserMiddleware(app);

// Setting up Request Session
const staticFilesMiddleware = new StaticFilesMiddleware(appStaticPublicFolder);
staticFilesMiddleware(app);

// Setting up Static Resource Folder
const sessionMiddleware = new SessionMiddleware();
sessionMiddleware(app);

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
