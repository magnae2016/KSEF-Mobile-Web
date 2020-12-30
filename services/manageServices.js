const { Templates } = require('../models');

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
