'use strict';

const pretty = require('pino-pretty');
const chalk = require('chalk');
const { colorizerFactory } = pretty;
const levelColorize = colorizerFactory(true);

const levelPrettifier = (logLevel) =>
  `${levelColorize(logLevel)}`.toLocaleLowerCase();
const status = (code) => {
  const statcode = code.toString();
  if (statcode.startsWith(1)) return chalk.magenta(code);
  if (statcode.startsWith(2)) return chalk.green(code);
  if (statcode.startsWith(3)) return chalk.cyan(code);
  if (statcode.startsWith(4)) return chalk.yellow(code);
  if (statcode.startsWith(5)) return chalk.red(code);
};

module.exports = (opts) =>
  pretty({
    ...opts,
    messageFormat: (log) => {
      const mainMessage = chalk.white(
        `${log.req.method} ${log.req.url} (${log.responseTime} ms)`
      );
      return log.res ? `${mainMessage} ${status(log.res.statusCode)}` : '';
    },
    customPrettifiers: {
      time: (time) => chalk.gray(`[${time}]`),
      level: levelPrettifier,
    },
  });
