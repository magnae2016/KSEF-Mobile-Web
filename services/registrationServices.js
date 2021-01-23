const { RegistrationType } = require('../models');

exports.findAllTypes = async function () {
    try {
        const types = await RegistrationType.findAll();

        return types;
    } catch (error) {
        throw new Error(error);
    }
};
