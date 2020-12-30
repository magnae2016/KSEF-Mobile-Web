'use strict';

const fs = require('fs');
const manageServices = require('../services/manageServices');

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

    try {
        // Create a template
        const template = await manageServices.createTemplate({
            template_brand_color,
            template_brand_thumbnail,
        });

        const { template_id, template_file } = template;
        const file = `views/notices/templates/${template_file}.ejs`;
        fs.writeFile(file, data, 'utf8', (err) => {
            if (err) throw err;
            console.log(`New template was created at ${file}`);
        });

        // Create a notice with the corresponding template
        await template.createNotice({
            category_id,
            user_id,
            notice_title,
            notice_subtitle,
            template_id,
        });

        res.status(200);
        res.send(`New template was created at ${file}`);
    } catch (error) {
        console.error('The server encountered an unexpected condition.', error);
        res.sendStatus(500);
    }
};
