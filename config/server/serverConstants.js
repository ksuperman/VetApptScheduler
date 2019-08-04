const DEFAULT_SERVER_PORT = 3000;

// Server Express Session Secret Key
const APP_SESSION_SERVER_KEY = 'SERVER_KEY_SESSION';

// Passport Authentication Constants
const PASSPORT_AUTH_STRATEGY = {
    LOCAL: 'local',
};

// HTTP Status Codes
const HTTP_STATUS_CODES = {
    // Success HTTP Codes
    OK: 200,
    CREATED: 201,

    // Client Error HTTP Codes
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,

    // Server Error HTTP Codes
    INTERNAL_SERVER_ERROR: 500,
};

// Server Routing Constants
const SERVER_ROUTE_URL = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    UNSECURED_API: '/api',
};

module.exports = {
    DEFAULT_SERVER_PORT,
    APP_SESSION_SERVER_KEY,
    HTTP_STATUS_CODES,
    SERVER_ROUTE_URL,
    PASSPORT_AUTH_STRATEGY,
};
