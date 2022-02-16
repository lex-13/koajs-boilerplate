'use strict'

const Koa = require('koa');
const bodyParser = require('koa-body')({ multipart: true });
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const compress = require('koa-compress');
const jwt = require('koa-jwt');
const errorHandler = require('koa-better-error-handler');
const errorHandler404 = require('koa-404-handler');
const koaCash = require('koa-cash');
const LRU = require('lru-cache');

const applyApiMiddleware = require('./api');
const logger = require('./utils/logger');

const app = new Koa();
const cache = new LRU({ max: 500 });

app.context.onerror = errorHandler();
app.context.api = true;
app.keys = [process.env.KEY_1];

app
  .use(errorHandler404)
  .use(logger)
  .use(bodyParser)
  .use(cors())
  .use(helmet())
  .use(compress())
  .use(
    jwt({ secret: process.env.JWT_SECRET, cookie: 'auth' }).unless({
      path: [/^\/store/, '/admin/login'],
    })
  )
  .use(
    koaCash({
      get: (key) => {
        return cache.get(key);
      },
      set(key, value) {
        return cache.set(key, value);
      },
    })
  );

applyApiMiddleware(app);
module.exports = app;
