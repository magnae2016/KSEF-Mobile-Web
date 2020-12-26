var express = require('express');
var router = express.Router();

const accountsControllers = require('../controllers/accountsControllers');

// @RequestMapping(value="/accounts/login", method=RequestMethod.GET)
router.get('/login', function (req, res, next) {
    res.render('accounts/login', { title: '로그인' });
});

// @RequestMapping(value="/accounts/login", method=RequestMethod.POST)
router.post('/login', accountsControllers.requireLogin);

// @RequestMapping(value="/accounts/create_account", method=RequestMethod.GET)
router.get('/create_account', function (req, res, next) {
    res.render('accounts/create_account', { title: '회원가입' });
});

// @RequestMapping(value="/accounts/create_account", method=RequestMethod.POST)
router.post('/create_account', accountsControllers.requireRegister);

// @RequestMapping(value="/accounts/find_account", method=RequestMethod.GET)
router.get('/find_account', function (req, res, next) {
    res.send('respond with a resource');
});

// @RequestMapping(value="/accounts/find_account", method=RequestMethod.POST)
router.post('/find_account', function (req, res, next) {
    res.send('respond with a resource');
});

// @RequestMapping(value="/accounts/find_password", method=RequestMethod.GET)
router.get('/find_password', function (req, res, next) {
    res.send('respond with a resource');
});

// @RequestMapping(value="/accounts/find_password", method=RequestMethod.POST)
router.post('/find_password', function (req, res, next) {
    res.send('respond with a resource');
});

// @RequestMapping(value="/accounts/logout", method=RequestMethod.GET)
router.get('/logout', function (req, res, next) {
    res.send('respond with a resource');
});

module.exports = router;
