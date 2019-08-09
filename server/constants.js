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
    LOGIN: '/login',
    REGISTER: '/register',
    UNSECURED_API: '/api',
    JS_FILES: '/js',
    LOGOUT: '/logout',
    CREATE_ACCOUNT: '/createaccount',
};

const SECURED_SERVER_ROUTE_URL = {
    DASHBOARD: '/dashboard',
    MAKE_APPOINTMENT: '/makeappointment',
    ADD_PET: '/addpet',
    API: '/api',
    PETS_API: '/users/:userId/pets',
    USER_API: '/users',
    SERVICES_API: '/services',
    APPOINTMENT_API: '/users/:userId/appointments',
    APPOINTMENT_API_PATCH: '/users/:userId/appointments/:appointmentId',
};

module.exports = {
    DEFAULT_SERVER_PORT,
    APP_SESSION_SERVER_KEY,
    HTTP_STATUS_CODES,
    SERVER_ROUTE_URL,
    SECURED_SERVER_ROUTE_URL,
    PASSPORT_AUTH_STRATEGY,
};
