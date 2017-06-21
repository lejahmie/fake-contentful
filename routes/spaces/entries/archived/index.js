const router = require('express').Router({mergeParams: true});

const update = require('./update');
const remove = require('./remove');

// API endpoints
router.put('/', update);
router.delete('/', remove);

module.exports = router;
