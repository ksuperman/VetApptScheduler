const path = require('path');
const fs = require('fs');

// Path to current application folder.
const appDirectory = fs.realpathSync(process.cwd());

/**
 * Method resolve the absolute path of given the relative path of the folder.
 */
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// Path to the Server Source Folder
const appServerSrcPath = resolveApp('server');

// Path to Server application views folder.
const appServerViews = path.join(appServerSrcPath, 'views');

// Path to the Dist Folder to serve the Client application.
const appDistFolderPath = resolveApp('dist');

// Public Folder External Name
const appStaticPublicFolderName = 'public';

// Path to get the Static Resources from the client.
const appStaticPublicFolderPath = path.join(appDistFolderPath, appStaticPublicFolderName);

// Client JS folder Name
const appClientStaticDistJSName = 'js';

// Client JS folder path
const appClientStaticDistJSPath = path.join(appDistFolderPath, appClientStaticDistJSName);

// Path to the Client Source Folder
const appClientPath = resolveApp('client');

const appClientSrcPath = path.join(appClientPath, 'src');

module.exports = {
    // Server Paths
    appServerSrcPath,
    appServerViews,
    appStaticPublicFolderName,
    appStaticPublicFolderPath,
    // Client Paths
    appDistFolderPath,
    appClientStaticDistJSName,
    appClientStaticDistJSPath,
    appClientPath,
    appClientSrcPath,
};
