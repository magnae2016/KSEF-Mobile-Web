var express = require('express');
var router = express.Router();

const { Notices, Categories, Users, Sequelize } = require('../../models');

// @RequestMapping(value="/api/manage/posts", method=RequestMethod.GET)
router.get('/posts', async function (req, res, next) {
    try {
        const notices = await Notices.findAll({
            order: [['notice_id', 'DESC']],
            where: {
                is_deleted: 0,
            },
            attributes: {
                include: [[Sequelize.col('User.user_alias'), 'user_name']],
            },
            include: [
                {
                    model: Categories,
                    attributes: [
                        ['category_id', 'id'],
                        ['category_name', 'text'],
                    ],
                },
                {
                    model: Users,
                    attributes: ['user_id', 'user_alias'],
                },
            ],
        });

        res.json({ total: notices.length, records: notices });
    } catch (error) {
        console.error('The server encountered an unexpected condition.', error);
        res.sendStatus(500);
    }
});

// @RequestMapping(value="/api/manage/posts", method=RequestMethod.POST)
router.post('/posts', async function (req, res, next) {
    try {
        let { records } = req.body;
        if (records) {
            const notices = JSON.parse(records);
            records = [];
            notices.forEach((element) => {
                records.push({
                    notice_id: Number(element.notice_id),
                    notice_uuid: element.notice_uuid,
                    category_id: Number(element.Category.id),
                    user_id: element.user_id,
                    notice_title: element.notice_title,
                    notice_subtitle: element.notice_subtitle,
                    template_id: Number(element.template_id),
                    is_fixed: element.is_fixed ? 1 : 0,
                    is_published: element.is_published ? 1 : 0,
                });
            });
            const r = await Notices.bulkCreate(records, {
                fields: [
                    'notice_id',
                    'notice_uuid',
                    'category_id',
                    'user_id',
                    'notice_title',
                    'notice_subtitle',
                    'template_id',
                    'is_fixed',
                    'is_published',
                ],
                updateOnDuplicate: [
                    'is_fixed',
                    'is_published',
                    'category_id',
                    'notice_title',
                    'notice_subtitle',
                ],
            });

            res.sendStatus(200);
        }
    } catch (error) {
        console.error('The server encountered an unexpected condition.', error);
        res.sendStatus(500);
    }
});

router.delete('/posts/:notice_id', async function (req, res, next) {
    const { notice_id = undefined } = req.params;
    if (!notice_id) {
        return res.sendStatus(404);
    }

    const notice = await Notices.findOne({
        where: {
            notice_id,
        },
    });

    notice.set({
        is_deleted: 1,
        deleted_time: new Date().toISOString(),
    });
    notice.save();

    res.sendStatus(200);
});

module.exports = router;
