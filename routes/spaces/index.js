const router = require('express').Router();
const Loki = require('lokijs');
const db = new Loki('fakeContentful.db');
const items = db.addCollection('entries');

const read = require('./read');
const entries = require('./entries');

router.use((req, res, next) => {
  res.dbItems = items;
  next();
});

// API endpoints
router.get('/:spaceid', read);
router.use('/:spaceid/entries', entries);

module.exports = router;
