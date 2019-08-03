const express = require('express');

/**
 * Attach and Configure the Body Parser for the express app.
 */
function StaticFilesMiddleware(staticPublicFolderPath) {
    return (app) => {
        // Body parser
        app.use(express.static(staticPublicFolderPath));
    };
}

module.exports = StaticFilesMiddleware;
