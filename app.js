// Load configurations
require('./config');

const nconf = require('nconf');
const express = require('express');

const routes = require('./routes');
const pckg = require('./package.json');

const app = express();

app.enable('trust proxy');

app.use(routes);

const server = app.listen(nconf.get('http:port'), () => {
  console.log('');
  console.log('');
  console.log(`     ${pckg.name}`);
  console.log(`     v${pckg.version}`);
  console.log('');
  console.log(`     NODE_ENV: ${nconf.get('NODE_ENV')}`);
  if (nconf.get('NODE_ENV') !== 'production') {
    console.log(`     Listening on port: ${server.address().port}`);
  }
  console.log('------------------------------------------------------------------');
  console.log('');
});
