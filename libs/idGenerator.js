const uuidv4 = require('uuid/v4');

/**
 * Fakes a Contentful entry ID
 * @return {String}
 */
module.exports = function idGenerator() {

  let id = uuidv4().replace(/-/g, 'x');

  return id.substring(0, 22);
};
