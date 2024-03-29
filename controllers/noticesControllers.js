'use strict';

const _ = require('underscore');
const noticesServices = require('../services/noticesServices');
const Op = require('sequelize').Op;

exports.requireCategoryList = async function (req, res, next) {
    const { category_name = '전체' } = req.params;
    const context = {
        categories: undefined,
        years: undefined,
        notices: undefined,
    };

    // list of categories
    const categories = await noticesServices.findCategories();
    context.categories = _.pluck(categories, 'category_name');

    // list of years
    const years = await noticesServices.findYears();
    context.years = _.pluck(years, 'year').sort(function (a, b) {
        return b - a;
    });
    const recentYear = context.years[0];
    const { y: selectedYear = recentYear } = req.query;

    // list items of category
    let notices = [];
    if (category_name === '전체') {
        notices = await noticesServices.findAllNotices({ year: selectedYear });
    } else {
        const category = categories.find((element) => {
            return element.category_name === category_name;
        });

        notices = await category.getNotices({
            where: {
                notice_created_at: {
                    [Op.startsWith]: selectedYear,
                },
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
        selectedYear,
        context,
    });
};

exports.requireItemContents = async function (req, res, next) {
    const { originalUrl } = req;
    const { notice_id = undefined } = req.params;
    const context = {
        notice: undefined,
        template: undefined,
        category: undefined,
    };

    if (!notice_id) {
        res.redirect('/notices/category');
    }

    const notice = await noticesServices.findNotice(notice_id);
    if (notice) {
        const template = await notice.getTemplate();
        const category = await notice.getCategory();

        context.template = template.get({ plain: true });
        context.category = category.get({ plain: true });
        
        // add the number of views
        notice.notice_views = ++notice.notice_views;
        notice.save();
    } else {
        // post not exist
        return res.redirect('/notices/category');
    }
    
    const { template_og_image } = context.template;
    context.notice = notice.get({ plain: true });

    res.render('notices/template', {
        title: '공지사항',
        op: template_og_image,
        originalUrl,
        context,
    });
};
