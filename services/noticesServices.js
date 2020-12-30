const { Categories, Notices } = require('../models');

exports.findCategories = async function () {
    try {
        const categories = await Categories.findAll();

        return categories;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findAllNotices = async function () {
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
