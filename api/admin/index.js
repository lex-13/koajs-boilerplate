'use strict';

const fs = require('fs');
const path = require('path');
const Router = require('koa-router');

const baseName = path.basename(__filename);

module.exports = (Router) => {
  const router = new Router({
    prefix: `/admin`,
  });

  fs.readdirSync(__dirname)
    .filter((file) => file.indexOf('.') !== 0 && file !== baseName)
    .forEach((file) => {
      const api = require(path.join(__dirname, file))(Router);
      router.use(api.routes());
    });

  return router;
};
