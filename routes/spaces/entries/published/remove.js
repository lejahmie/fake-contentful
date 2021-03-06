/**
 * API endpoint
 * @param {Object}    req   Express request object
 * @param {Object}    res   Express response object
 * @param {Function}  next  Express next function
 */
module.exports = function remove(req, res, next) {

  let spaceid = req.params.spaceid;
  let entryid = req.params.entryid;

  if (!spaceid) {
    let error = new Error('Missing space id');
    error.code = 10001;
    return next(error);
  }

  if (!entryid) {
    let error = new Error('Missing entry id');
    error.code = 10001;
    return next(error);
  }

  // Get entry from in-memory db by id
  let entry = res.dbItems.findOne({'sys.id': entryid});

  return res.json(entry);
};
