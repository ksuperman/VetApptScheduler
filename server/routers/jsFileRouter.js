const express = require('express');
const device = require('express-device');
const { serveJSFile } = require('../helpers/jsFileHelper');

const jsFileRouter = module.exports = express.Router();

jsFileRouter.get('/:fileName',
    device.capture({ parseUserAgent: true }),
    serveJSFile);
