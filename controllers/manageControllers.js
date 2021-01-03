'use strict';

const fs = require('fs');
const manageServices = require('../services/manageServices');

exports.requireLoadingPost = async function (req, res, next) {
    const { notice_id = undefined } = req.params;
    const context = {
        notice: undefined,
        template: undefined,
    };

    // new post
    if (!notice_id) {
        return res.render('manage/newpost', {
            title: '새로운 글쓰기',
            context,
        });
    }

    // saved post
    try {
        const notice = await manageServices.findNotice(notice_id);
        const template = await notice.getTemplate();

        context.notice = notice;
        context.template = template;

        res.render('manage/newpost', { title: '수정하기', context });
    } catch (error) {
        console.error('The server encountered an unexpected condition.', error);
        res.status(404);
    }
};

exports.requireAddNewPost = async function (req, res, next) {
    const {
        color: template_brand_color,
        thumbnail: template_brand_thumbnail,
        ir1: data,
    } = req.body;

    const {
        title: notice_title,
        subtitle: notice_subtitle,
        category: category_id,
    } = req.body;

    const { id: user_id } = req.user;
    const { notice_id } = req.params;
    var isNewRecord = undefined;
    if (!notice_id) {
        isNewRecord = true;
    } else {
        isNewRecord = false;
    }

    try {
        let template = undefined;

        // Create a template
        if (isNewRecord) {
            template = await manageServices.createTemplate({
                template_brand_color,
                template_brand_thumbnail,
            });
        } else {
            template = await manageServices.updateTemplate(
                {
                    template_brand_color,
                    template_brand_thumbnail,
                },
                {
                    template_id: Number(req.body.template_id),
                }
            );
        }

        const { template_id, template_file } = template;
        const file = `views/notices/templates/${template_file}.ejs`;
        fs.writeFile(file, data, 'utf8', (err) => {
            if (err) throw err;
            console.log(`New template was created at ${file}`);
        });

        // Create a notice with the corresponding template
        if (isNewRecord) {
            await template.createNotice({
                category_id,
                user_id,
                notice_title,
                notice_subtitle,
                template_id,
            });
        } else {
            const notice = await template.getNotice();

            notice.set({
                notice_title,
                notice_subtitle,
                category_id,
            });
            notice.save();
        }

        res.status(200);
        res.redirect('/manage/posts');
    } catch (error) {
        console.error('The server encountered an unexpected condition.', error);
        res.sendStatus(500);
    }
};

exports.requirePhotoUploader = async function (req, res, next) {
    try {
        let sFileInfo = '';

        const filename = req.file.filename;
        const newPath = req.file.path.substr(6);

        sFileInfo += '&bNewLine=true';
        sFileInfo += '&sFileName=' + filename;
        sFileInfo += '&sFileURL=' + newPath;

        res.status(200);
        res.send(sFileInfo);
    } catch (error) {
        console.error('The server encountered an unexpected condition.', error);
        res.status(404);
        res.send(`NOTALLOW_${req.headers['file-name']}`);
    }
};
