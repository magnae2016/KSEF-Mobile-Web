var express = require('express');
var router = express.Router();

const registrationControllers = require('../controllers/registrationControllers');
const { checkLoggedIn } = require('../lib');

// @RequestMapping(value="/registration/", method=RequestMethod.GET)
router.get('/', registrationControllers.requireRegistrationList);

// @RequestMapping(value="/registration/view/:type_id", method=RequestMethod.GET)
// @RequestMapping(value="/registration/form/:type_id", method=RequestMethod.GET)
router.get(
    ['/view/:type_id?', '/form/:type_id?'],
    checkLoggedIn,
    registrationControllers.requireRegistrationContent
);

// @RequestMapping(value="/registration/form/:type_id", method=RequestMethod.POST)
router.post(
    '/form/:type_id',
    checkLoggedIn,
    registrationControllers.requireUpdateRegistration
);

module.exports = router;
