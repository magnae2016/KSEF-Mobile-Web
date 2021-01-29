var express = require('express');
var router = express.Router();

const indexControllers = require('../controllers/indexControllers');

// @RequestMapping(value="/", method=RequestMethod.GET)
router.get(['/', '/home'], indexControllers.requireHome);

// @RequestMapping(value="/entry", method=RequestMethod.GET)
router.get(['/entry'], indexControllers.requireEntry);

module.exports = router;
