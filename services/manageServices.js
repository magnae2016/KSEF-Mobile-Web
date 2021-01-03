const { Templates, Notices } = require('../models');

exports.createTemplate = async function (template) {
    try {
        const r = await Templates.create(template, {
            isNewRecord: true,
        });

        return r;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findNotice = async function (notice_id) {
    try {
        const notice = await Notices.findOne({
            where: {
                notice_id,
                is_deleted: 0,
            },
        });

        return notice;
    } catch (error) {
        throw new Error(error);
    }
};

exports.updateTemplate = async function (values, options) {
    try {
        const template = await Templates.findOne({
            where: {
                ...options,
            },
        });

        template.set({
            ...values,
        });
        template.save();

        return template;
    } catch (error) {
        throw new Error(error);
    }
};
