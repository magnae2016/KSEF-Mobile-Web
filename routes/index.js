var express = require('express');
var router = express.Router();

// @RequestMapping(value="/", method=RequestMethod.GET)
router.get(['/', '/home'], function (req, res, next) {
    res.render('index', { title: '홈' });
});

module.exports = router;
