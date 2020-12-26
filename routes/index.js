var express = require('express');
var router = express.Router();

const indexControllers = require('../controllers/indexControllers');

// @RequestMapping(value="/", method=RequestMethod.GET)
router.get(['/', '/home'], indexControllers.requireHome);

module.exports = router;
