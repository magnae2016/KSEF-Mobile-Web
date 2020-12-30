var express = require('express');
var router = express.Router();

const noticesControllers = require('../controllers/noticesControllers');

// @RequestMapping(value="/notices/category/:category_name", method=RequestMethod.GET)
router.get('/category/:category_name?', noticesControllers.requireCategoryList);

// @RequestMapping(value="/notices/:notice_id", method=RequestMethod.GET)
router.get('/:notice_id', function (req, res, next) {
    res.render('notices/template', { title: '공지사항' });
});

module.exports = router;
