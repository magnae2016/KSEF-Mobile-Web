'use strict';

const fs = require('fs');
const manageServices = require('../services/manageServices');

exports.requirePreviewPost = async function (req, res, next) {
    const { notice_id = undefined } = req.params;
    const context = {
        notice: undefined,
        template: undefined,
        category: undefined,
    };

    if (!notice_id) {
        res.redirect('/manage/posts');
    }

    const notice = await manageServices.findNotice(notice_id);
    const { notice_title } = notice;
    if (notice) {
        const template = await notice.getTemplate();
        const category = await notice.getCategory();

        context.template = template.get({ plain: true });
        context.category = category.get({ plain: true });
    } else {
        // post not exist
        return res.redirect('/manage/posts');
    }

    context.notice = notice.get({ plain: true });

    res.render('notices/template', {
        title: `'${notice_title}' 미리보기`,
        context,
    });
};

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

function makeEmptyRecord(params) {
    return {
        ...params,
        formdata_values: JSON.stringify({}),
        is_completed: 0,
    };
}

exports.requireGeneratingSpreadsheet = async function (req, res, next) {
    const { type_keyword, regist_year } = req.params;
    const { mode = 'all' } = req.query; // [ all, incomplete, complete ]
    const context = {
        teamRegistration: undefined,
        type_keyword,
        regist_year,
        mode,
    };

    try {
        if (!type_keyword) return res.sendStatus(500);
        if (!regist_year) return res.sendStatus(500);

        const registrationType = await manageServices.findRegistrationType(
            type_keyword
        );
        const registration = await registrationType.getRegistrations({
            where: {
                regist_year,
            },
            limit: 1,
        });
        const teams = await manageServices.findTeams(regist_year);
        const { regist_id } = registration[0];
        const teamRegistration = await manageServices.findTeamRegistration(
            regist_id
        );

        // arrange Array
        let j = 0;
        let entry = 0;
        const total = teamRegistration.length;
        let result = [];

        teams.forEach((element, index) => {
            const x = element.team_entry;
            const { team_name } = element;
            if (j == total) {
                result.push(makeEmptyRecord({ team_entry: x, team_name }));
                return;
            }

            entry = teamRegistration[j].team_entry;

            if (x > entry)
                while (x > entry) entry = teamRegistration[++j].team_entry;

            if (x === entry) result.push(teamRegistration[j++]);
            else result.push(makeEmptyRecord({ team_entry: x, team_name }));
        });

        if (mode === 'all') context.teamRegistration = result;
        else if (mode === 'incomplete')
            context.teamRegistration = result.filter(
                (element) => element.is_completed === 0
            );
        else if (mode === 'complete')
            context.teamRegistration = result.filter(
                (element) => element.is_completed === 1
            );

        res.render(`manage/sheets/${type_keyword}`, {
            title: `${type_keyword}-${regist_year} 데이터 시트`,
            context,
        });
    } catch (error) {
        console.error('The server encountered an unexpected condition.', error);
        res.sendStatus(500);
    }
};
