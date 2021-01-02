var express = require('express');
var router = express.Router();
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

// @RequestMapping(value="/manage/newpost", method=RequestMethod.GET)
router.get('/newpost', function (req, res, next) {
    res.render('manage/newpost', { title: '새로운 글쓰기' });
});

// @RequestMapping(value="/manage/newpost", method=RequestMethod.POST)
router.post('/newpost', manageControllers.requireAddNewPost);

// @RequestMapping(value="/manage/file_uploader_html5", method=RequestMethod.POST)
router.post(
    '/file_uploader_html5',
    upload.single('Filedata'),
    manageControllers.requirePhotoUploader
);

module.exports = router;
