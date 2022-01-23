'use strict';

const controller = require('../../../common/controllers')();

module.exports = Router => {
  const router = new Router({
    prefix: `/users`,
  });

  router
    .get('/:userId', controller.getOne)
    .get('/', controller.getAll)
    .get('/', controller.getAll);

  return router;
};