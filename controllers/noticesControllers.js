'use strict';

const _ = require('underscore');
const noticesServices = require('../services/noticesServices');

exports.requireCategoryList = async function (req, res, next) {
    const { category_name = '전체' } = req.params;
    const context = {
        categories: undefined,
        notices: undefined,
    };

    // list of categories
    const categories = await noticesServices.findCategories();
    context.categories = _.pluck(categories, 'category_name');

    // list items of category
    let notices = [];
    if (category_name === '전체') {
        notices = await noticesServices.findAllNotices();
    } else {
        const category = categories.find((element) => {
            return element.category_name === category_name;
        });

        notices = await category.getNotices({
            where: {
                is_published: 1,
                is_deleted: 0,
            },
            order: [['notice_id', 'DESC']],
        });
    }
    context.notices = notices;

    res.render('notices/category', {
        title: '공지사항',
        selectedKey: category_name,
        context,
    });
};
