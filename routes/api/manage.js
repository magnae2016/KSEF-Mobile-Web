var express = require('express');
var router = express.Router();

const { Notices, Categories, Users, Sequelize } = require('../../models');

// @RequestMapping(value="/api/manage/posts", method=RequestMethod.GET)
router.get('/posts', async function (req, res, next) {
    try {
        const notices = await Notices.findAll({
            order: [['notice_id', 'DESC']],
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

module.exports = router;
