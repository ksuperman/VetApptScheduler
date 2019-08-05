const express = require('express');

/**
 * Attach and Configure the Static File Serve for the express app.
 */
function StaticFilesMiddleware(staticPublicFolderPath) {
    return (app) => {
        // Static File Server
        app.use(express.static(staticPublicFolderPath));
    };
}

module.exports = StaticFilesMiddleware;
