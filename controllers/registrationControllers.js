'use strict';

const registrationServices = require('../services/registrationServices');

exports.requireRegistrationList = async function (req, res, next) {
    const context = {
        types: undefined,
    };

    const types = await registrationServices.findAllTypes();
    context.types = types;

    res.render('registration/index', { title: '참가접수', context });
};
