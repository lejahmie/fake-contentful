const router = require('express').Router({mergeParams: true});

const read = require('./read');
const create = require('./create');
const remove = require('./remove');
const published = require('./published');
const archived = require('./archived');

// API endpoints
router.get('/:entryid', read);
router.delete('/:entryid', remove);
router.get('/', read);
router.post('/', create);
router.use('/:entryid/published', published);
router.use('/:entryid/archived', archived);

module.exports = router;
