const {
    appDistFolderPath,
    appClientStaticDistJSPath,
} = require('../../config/paths');

const serveJSFile = (req, res, next) => {
    const options = {
        root: appClientStaticDistJSPath,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
        },
    };

    const { fileName } = req.params;
    /**
     * req.device will have device/useragent info and can be used to serve particular file
     **/
    res.sendFile(fileName, options, (err) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            console.log('Sent:', fileName);
        }
    });
};

module.exports = {
    serveJSFile,
};
