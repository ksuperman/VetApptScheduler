/**
 * Method to Wrap Async Route Handler to Handle Unhandled Rejections and pass the control to the next middleware
 * @memberOf asyncHandlerUtils
 * @module asyncRouteHandler
 * @function
 * @param {Object} routeHandler - Express Router Instance to Wrap in Try Catch block.
 * @returns {function} - Wrapped Express Middleware.
 */
const asyncRouteHandler = routeHandler => (req, res, next) => Promise.resolve(routeHandler(req, res, next)).catch(next);

/**
 * The Async Handler Utils Provides a set of Function to help manage the Async Router Handlers.
 * @class asyncHandlerUtils
 */
module.exports = {
    asyncRouteHandler,
};
