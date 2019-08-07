const { HTTP_STATUS_CODES } = require('../constants');

const logoutController = (req, res) => {
    req.logout();
    return res.status(HTTP_STATUS_CODES.OK).json({});
};

module.exports = logoutController;
