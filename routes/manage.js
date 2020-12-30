var express = require('express');
var router = express.Router();

const manageControllers = require('../controllers/manageControllers');

// @RequestMapping(value="/manage/newpost", method=RequestMethod.GET)
router.get('/newpost', function (req, res, next) {
    res.render('manage/newpost', { title: '새로운 글쓰기' });
});

// @RequestMapping(value="/manage/newpost", method=RequestMethod.POST)
router.post('/newpost', manageControllers.requireAddNewPost);

module.exports = router;
