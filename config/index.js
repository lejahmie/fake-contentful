/**
 * Load configs to nconf
 *
 * The order of nconf calls defines the order for nconf.get(), which will return the first found match.
 * After this file has been loaded once, the config variables can be accessed through nconf.
 */
const fs = require('fs');
const nconf = require('nconf');

// Get configs in following order
nconf.argv(); // (1) command line arguments
nconf.env(); // (2) environment arguments

// Make sure custom config exits before trying to require it
if (fs.existsSync(__dirname+'/custom.js')) {
  // (3) custom config file
  nconf.use('custom', {
    type: 'literal',
    store: require('./custom.js')
  });
}

// (4) node environment specific config file (default to development)
nconf.use('node_env', {
  type: 'literal',
  store: require('./'+(process.env.NODE_ENV || 'development')+'.js')
});

// (5) default to production config
nconf.use('default', {
  type: 'literal',
  store: require('./production.js')
});
