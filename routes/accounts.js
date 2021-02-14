var express = require('express');
var router = express.Router();

const accountsControllers = require('../controllers/accountsControllers');
const { checkLoggedIn } = require('../lib');

// @RequestMapping(value="/accounts/login", method=RequestMethod.GET)
router.get('/login', function (req, res, next) {
    res.render('accounts/login', { title: '로그인' });
});

// @RequestMapping(value="/accounts/login", method=RequestMethod.POST)
router.post('/login', accountsControllers.requireLogin);

// @RequestMapping(value="/accounts/redirect_account", method=RequestMethod.GET)
router.get(
    '/redirect_account',
    checkLoggedIn,
    accountsControllers.requireRedirect
);

// @RequestMapping(value="/accounts/token", method=RequestMethod.POST)
router.post('/token', accountsControllers.requireSavingToken);

// @RequestMapping(value="/accounts/create_account", method=RequestMethod.GET)
router.get('/create_account', function (req, res, next) {
    res.render('accounts/create_account', { title: '회원가입' });
});

// @RequestMapping(value="/accounts/privacy", method=RequestMethod.GET)
router.get('/privacy', function (req, res, next) {
    res.render('accounts/privacy', { title: '개인정보처리방침' });
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
router.get('/logout', accountsControllers.requireLogout);

// @RequestMapping(value="/accounts/register_team", method=RequestMethod.GET)
router.get(
    '/register_team',
    checkLoggedIn,
    accountsControllers.requireTeamList
);

// @RequestMapping(value="/accounts/register_team", method=RequestMethod.POST)
router.post(
    '/register_team',
    checkLoggedIn,
    accountsControllers.requireRegisterTeam
);

module.exports = router;
