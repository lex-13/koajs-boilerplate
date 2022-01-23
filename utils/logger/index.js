'use strict';

const logger = require('koa-pino-logger');
const path = require('path');

module.exports = logger({
  transport: {
    target: path.join(__dirname, './pino-pretty-transport'),
    options: {
      colorize: true,
      translateTime: 'yyyy-dd-mm hh:MM:ss',
      ignore: 'pid,hostname',
      hideObject: true,
    },
  },
});
