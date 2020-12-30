const { Categories, Notices } = require('../models');

exports.findCategories = async function (req, res, next) {
    try {
        const categories = await Categories.findAll();

        return categories;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findAllNotices = async function (req, res, next) {
    try {
        const notices = await Notices.findAll({
            where: {
                is_published: 1,
                is_deleted: 0,
            },
            order: [['notice_id', 'DESC']],
        });

        return notices;
    } catch (error) {
        throw new Error(error);
    }
};
