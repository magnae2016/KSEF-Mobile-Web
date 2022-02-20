var express = require('express');
var router = express.Router();

var manage = require('./manage');
var accounts = require('./accounts');

router.use('/manage', manage);
router.use('/accounts', accounts);

module.exports = router;
