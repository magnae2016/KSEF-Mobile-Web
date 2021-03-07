var express = require('express');
var router = express.Router();
const { checkLoggedIn, checkIsAdmin } = require('../lib');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/upload');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const $filename = file.originalname;
        const $filename_ext = $filename.split('.').pop();
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + $filename_ext);
    },
});

var fileFilter = (req, file, cb) => {
    const $filename = file.originalname;
    const $filename_ext = $filename.split('.').pop();
    const allow_file = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];

    if (!allow_file.includes($filename_ext)) {
        cb(null, false);
    } else {
        cb(null, true);
    }
};

var upload = multer({ storage, fileFilter });

const manageControllers = require('../controllers/manageControllers');

router.use(checkLoggedIn, checkIsAdmin);

// @RequestMapping(value="/manage/settings", method=RequestMethod.GET)
router.get('/settings', function (req, res, next) {
    res.render('manage/settings', { title: '설정' });
});

// @RequestMapping(value="/manage/posts", method=RequestMethod.GET)
router.get('/posts', function (req, res, next) {
    res.render('manage/posts', { title: '글 관리' });
});

// @RequestMapping(value="/manage/posts/:notice_id", method=RequestMethod.GET)
router.get('/posts/:notice_id', manageControllers.requirePreviewPost);

// @RequestMapping(value="/manage/newpost", method=RequestMethod.GET)
router.get('/newpost/:notice_id?', manageControllers.requireLoadingPost);

// @RequestMapping(value="/manage/newpost", method=RequestMethod.POST)
router.post('/newpost/:notice_id?', manageControllers.requireAddNewPost);

// @RequestMapping(value="/manage/file_uploader_html5", method=RequestMethod.POST)
router.post(
    '/file_uploader_html5',
    upload.single('Filedata'),
    manageControllers.requirePhotoUploader
);

// @RequestMapping(value="/manage/sheets/:type_keyword/:regist_year", method=RequestMethod.GET)
router.get(
    '/sheets/:type_keyword/:regist_year',
    manageControllers.requireGeneratingSpreadsheet
);

module.exports = router;
