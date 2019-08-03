const path = require('path');
const fs = require('fs');

// Path to current application folder.
const appDirectory = fs.realpathSync(process.cwd());

/**
 * Method resolve the absolute path of given the relative path of the folder.
 */
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// Path to the Client Source Folder
const appClientSrc = resolveApp('client');

// Path to the Server Source Folder
const appServerSrc = resolveApp('server');

// Path to Server appplcation views folder.
const appServerViews = path.join(appServerSrc, 'views');

// Path to the Dist Folder to serve the Client application.
const appDistFolder = resolveApp('dist');

// Path to get the Static Resources from the client.
const appStaticPublicFolder = path.join(appDistFolder, 'public');

module.exports = {
    appClientSrc,
    appServerSrc,
    appDistFolder,
    appServerViews,
    appStaticPublicFolder,
};
