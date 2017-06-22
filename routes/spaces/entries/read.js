const nconf = require('nconf');

/**
 * API endpoint for GET entries
 * @param {Object}    req   Express request object
 * @param {Object}    res   Express response object
 * @param {Function}  next  Express next function
 */
module.exports = function read(req, res, next) {
  let spaceid = req.params.spaceid;
  let entryid = req.params.entryid;

  if (!spaceid) {
    let error = new Error('Missing space id');
    error.code = 10001;
    return next(error);
  }

  // If no entryid is set, we fetch entries by filters
  if (!entryid) {
    // Create query for db
    let dbQuery = {};

    // If filtered by content type, add it to query
    if (req.query.content_type) { // jshint ignore: line
      dbQuery['sys.contentType.sys.id'] = req.query.content_type; // jshint ignore: line
      delete req.query.content_type; // jshint ignore: line
    }

    let locale = nconf.get('http:locale');
    if (req.query.locale) {
      locale = req.query.locale;
      delete req.query.locale;
    }

    // If limit is not set, we set default to 100
    let limit = 100;
    if (req.query.limit) {
      limit = req.query.limit;
      delete req.query.limit;
    }

    // If skip is not set, we set default to 0
    let skip = 0;
    if (req.query.skip) {
      skip = req.query.skip;
      delete req.query.skip;
    }

    // Put other queries into dbQuery
    // example; { fields.title: 'Hello World!' }
    let fields = {};
    for (let key in req.query) {
      // Add default locale to fields
      if (key.indexOf('fields.') >= 0) {
        req.query[`${key}.${locale}`] = req.query[key];
        // Check if query uses filter in
        if (typeof req.query[`${key}.${locale}`].in === 'string') {
          fields[`${key}.${locale}`] = {
            '$in': req.query[key].in.split(',')
          };
        // Check if query uses filter nin
        } else if (typeof req.query[`${key}.${locale}`].nin === 'string') {
          fields[`${key}.${locale}`] = {
            '$nin': req.query[key].in.split(',')
          };
        }
      }
      delete req.query[key];
    }

    Object.assign(dbQuery, fields);
    let entries = res.dbItems.chain().find(dbQuery).offset(skip).limit(limit).data();

    let response = {
      'sys': {
        'type': 'Array'
      },
      'total': entries.length,
      'skip': skip,
      'limit': limit,
      'items': entries
    };

    return res.json(response);
  }

  // Get entry from in-memory db by id
  let entry = res.dbItems.findOne({'sys.id': entryid});
  if (!entry) {
    let error = new Error('No content found');
    error.code = 10001;
    return next(error);
  }
  return res.json(entry);
};
