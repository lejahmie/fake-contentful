const bodyParser = require('body-parser');
const router = require('express').Router();

const spaces = require('./spaces');
const error = require('./error');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Api uri to listen to.
router.use('/spaces', spaces);

// Error handler
router.use(error);

module.exports = router;
