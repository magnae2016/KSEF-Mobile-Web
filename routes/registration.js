var express = require('express');
var router = express.Router();

const registrationControllers = require('../controllers/registrationControllers');
const { checkLoggedIn } = require('../lib');

// @RequestMapping(value="/registration/", method=RequestMethod.GET)
router.get('/', registrationControllers.requireRegistrationList);

// @RequestMapping(value="/registration/view", method=RequestMethod.GET)
router.get('/view', function (req, res, next) {
    res.render('registration/content', { title: '참가접수' });
});

// @RequestMapping(value="/registration/form", method=RequestMethod.GET)
router.get('/form', function (req, res, next) {
    res.render('registration/form', { title: '참가접수' });
});

module.exports = router;
