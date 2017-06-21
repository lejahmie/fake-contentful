const libs = require('../../../libs');

/**
 * API endpoint for POST entries
 * @param {Object}    req   Express request object
 * @param {Object}    res   Express response object
 * @param {Function}  next  Express next function
 */
module.exports = function create(req, res, next) {
  const spaceid = req.params.spaceid;

  if (!spaceid) {
    let error = new Error('Missing space id');
    error.code = 10001;
    return next(error);
  }

  if (!req.body.fields) {
    let error = new Error('Missing fields');
    error.code = 10001;
    return next(error);
  }

  const date = new Date().toJSON();
  let entry = {
    'fields': req.body.fields,
    'sys': {
      'id': libs.idGenerator(),
      'type': 'Entry',
      'version': 1,
      'space': {
        'sys': {
          'type': 'Link',
          'linkType': 'Space',
          'id': spaceid
        }
      },
      'contentType': {
        'sys': {
          'type': 'Link',
          'linkType': 'ContentType',
          'id': 'hfM9RCJIk0wIm06WkEOQY'
        }
      },
      'createdAt': date,
      'createdBy': {
        'sys': {
          'type': 'Link',
          'linkType': 'User',
          'id': '4FLrUHftHW3v2BLi9fzfjU'
        }
      },
      'updatedAt': date,
      'updatedBy': {
        'sys': {
          'type': 'Link',
          'linkType': 'User',
          'id': '4FLrUHftHW3v2BLi9fzfjU'
        }
      }
    }
  };

  // Save entry to in-memory db
  res.dbItems.insert(entry);

  return res.json(entry);
};
