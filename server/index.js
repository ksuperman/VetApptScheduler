/**
 * Module dependencies.
 */
const http = require('http');
const debug = require('debug')('vetapptschduler:server_core');
const app = require('./app');
const { normalizePort } = require('../server/utils/serverUtils');
const { DEFAULT_SERVER_PORT } = require('../config/server/serverConstants');


/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || DEFAULT_SERVER_PORT);
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
    default:
        throw error;
    }
}
server.on('error', onError);

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
server.on('listening', onListening);

/**
 * Custom Exception Handler - Handles the `uncaughtException` exception if the process terminates with an error.
 * NOTE - this code is part of application exception handling and cannot be tested.
 */
process.on('uncaughtException', (err) => {
    // Log the Details of the `uncaughtException`
    debug('process ==> uncaughtException ==> %e', err);
    // DON'T try to recover, Terminated the process
    process.exit(1); // eslint-disable-line no-process-exit
});

/**
 * Custom Exception Handler - Handles the `unhandledRejection` exception if Promise is rejected and no error handler is attached to the promise within a turn of the event loop.
 * NOTE - this code is part of application exception handling and cannot be tested.
 */
process.on('unhandledRejection', (err) => {
    // Log the Details of the `unhandledRejection`
    debug('process ==> unhandledRejection ==> %e', err);
    // DON'T try to recover, Terminated the process
    process.exit(1); // eslint-disable-line no-process-exit
});

