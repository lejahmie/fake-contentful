module.exports = function read(req, res, next) {
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

  if (!entryid) {
    let entries = {
      'sys': {
        'type': 'Array'
      },
      'total': 0,
      'skip': 0,
      'limit': 100,
      'items': []
    };

    return res.json(entries);
  }

  // Get entry from in-memory db by id
  let entry = res.dbItems.findOne({'sys.id': entryid});

  return res.json(entry);
};
