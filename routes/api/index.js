var express = require('express');
var router = express.Router();

var manage = require('./manage');

router.use('/manage', manage);

module.exports = router;
