'use strict';

process.env.NODE_ENV !== 'production' && require('dotenv').config();
const http = require('http');
const app = require('./app');

async function bootstrap() {
  return http.createServer(app.callback()).listen(process.env.PORT || 5006);
}

bootstrap()
  .then((server) =>
    console.log(`🚀 Server listening on port ${server.address().port}!`)
  )
  .catch((err) => {
    setImmediate(() => {
      console.error('Unable to run the server because of the following error:');
      console.error(err);
      process.exit();
    });
  });
