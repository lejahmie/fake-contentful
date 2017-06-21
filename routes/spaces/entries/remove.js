module.exports = function removed(req, res, next) {
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
  res.dbItems.findAndRemove({'sys.id': entryid});

  return res.status(204).json();
};
