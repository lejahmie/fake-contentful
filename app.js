const express = require('express');

const routes = require('./routes');
const pckg = require('./package.json');

let app = express();

app.enable('trust proxy');

app.use(routes);

let server = app.listen(8001, () => {
  console.log('');
  console.log('');
  console.log(`     ${pckg.name}`);
  console.log(`     v${pckg.version}`);
  console.log('');
  console.log('');
  console.log(`     Listening on port: ${server.address().port}`);
  console.log('');
  console.log('------------------------------------------------------------------');
  console.log('');
});
