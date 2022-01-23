const Koa = require('koa');
const body = require('koa-body');
const cors = require('@koa/cors');
const helmet = require('koa-helmet');
const compress = require('koa-compress');
const jwt = require('koa-jwt');
const errorHandler = require('koa-better-error-handler');
const errorHandler404 = require('koa-404-handler');

const applyApiMiddleware = require('./api');
const logger = require('./utils/logger')

const app = new Koa();
app.context.onerror = errorHandler();
app.context.api = true;

app
  .use(errorHandler404)
  .use(logger)
  .use(body())
  .use(cors())
  .use(helmet())
  .use(compress())
  .use(
    jwt({ secret: process.env.JWT_SECRET, cookie: 'auth' }).unless({
      path: [/^\/store/, '/admin/login'],
    })
  );

applyApiMiddleware(app);
module.exports = app;
