const { Categories, Notices, Templates, sequelize } = require('../models');
const Op = require('sequelize').Op;

exports.findCategories = async function () {
    try {
        const categories = await Categories.findAll();

        return categories;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findYears = async function () {
    try {
        const SQL = `
            SELECT DISTINCT
                LEFT(notice_created_at, 4) AS year
            FROM
                ksef_db.NOTICES
            ORDER BY year DESC;`;
        const [results, metadata] = await sequelize.query(SQL);
        return results;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findAllNotices = async function (params) {
    const { year } = params;
    try {
        const notices = await Notices.findAll({
            where: {
                notice_created_at: {
                    [Op.startsWith]: year,
                },
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

exports.findNotice = async function (notice_id) {
    try {
        const notice = await Notices.findOne({
            where: {
                notice_id,
                is_published: 1,
                is_deleted: 0,
            },
        });

        return notice;
    } catch (error) {
        throw new Error(error);
    }
};
