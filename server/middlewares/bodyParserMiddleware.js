const express = require('express');

/**
 * Attach and Configure the Body Parser for the express app.
 */
function BodyParserMiddleware() {
    return (app) => {
        // Body parser
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));
    };
}

module.exports = BodyParserMiddleware;
