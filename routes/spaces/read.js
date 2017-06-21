module.exports = function read(req, res, next) {
  let spaceid = req.params.spaceid;

  if (!spaceid) {
    let error = new Error('Missing id');
    error.code = 10001;
    return next(error);
  }

  let space = {
    'sys': {
      'type': 'Space',
      'id': spaceid,
      'version': 3,
      'createdAt': '2015-05-18T11:29:46.809Z',
      'createdBy': {
        'sys': {
          'type': 'Link',
          'linkType': 'User',
          'id': '4FLrUHftHW3v2BLi9fzfjU'
        }
      },
      'updatedAt': '2015-05-18T11:29:46.809Z',
      'updatedBy': {
        'sys': {
          'type': 'Link',
          'linkType': 'User',
          'id': '4FLrUHftHW3v2BLi9fzfjU'
        }
      }
    },
    'name': 'Fake Contentful Space'
  };

  return res.json(space);
};
