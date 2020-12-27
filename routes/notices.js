var express = require('express');
var router = express.Router();

// @RequestMapping(value="/notices/category/:category_name", method=RequestMethod.GET)
router.get('/category/:category_name?', function (req, res, next) {
    res.render('notices/category', { title: '공지사항' });
});

// @RequestMapping(value="/notices/:notice_id", method=RequestMethod.GET)
router.get('/:notice_id', function (req, res, next) {
    res.render('notices/template', { title: '공지사항' });
});

module.exports = router;
