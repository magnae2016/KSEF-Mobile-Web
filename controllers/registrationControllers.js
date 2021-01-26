'use strict';

const registrationServices = require('../services/registrationServices');
require('dotenv').config();

exports.requireRegistrationList = async function (req, res, next) {
    const context = {
        types: undefined,
    };

    const types = await registrationServices.findAllTypes();
    context.types = types;

    res.render('registration/index', { title: '참가접수', context });
};

exports.requireRegistrationContent = async function (req, res, next) {
    const { type_id = undefined } = req.params;
    const { id: user_id } = req.user;
    const year = process.env.YEAR;
    const context = {
        type_id: type_id,
        formdata: undefined,
        content_file: undefined,
        form_file: undefined,
    };

    if (!type_id) {
        return res.render('redirect', {
            message: '올바르지 않은 URL 입니다.',
        });
    }

    // query team
    const team = await registrationServices.findparticipatingTeam(
        user_id,
        year
    );

    const registration = await registrationServices.findRegistration(
        type_id,
        year
    );

    const { regist_id } = registration;
    const { team_id } = team;
    const TeamRegistration = await registrationServices.findTeamRegistration(
        regist_id,
        team_id
    );

    let formdata = undefined;
    if (TeamRegistration) {
        formdata = await TeamRegistration.getFormdatum({
            raw: true,
        });
    }
    const form = await registration.getForm({
        raw: true,
    });

    const { content_file, form_file } = form;
    context.formdata = formdata && JSON.parse(formdata.formdata_values);
    context.content_file = content_file;
    context.form_file = form_file;

    const originalUrl = req.originalUrl;
    const fileFolder = originalUrl.includes('view') ? 'contents' : 'forms';
    const fileName = originalUrl.includes('view') ? content_file : form_file;
    const view = `registration/${fileFolder}/${fileName}`;
    res.render(view, { title: '참가접수', context });
};

exports.requireUpdateRegistration = async function (req, res, next) {
    const { type_id = undefined } = req.params;
    const { id: user_id } = req.user;
    const year = process.env.YEAR;
    let values = { ...req.body };

    if (!type_id) {
        return res.render('redirect', {
            message: '올바르지 않은 URL 입니다.',
        });
    }

    // query team
    const team = await registrationServices.findparticipatingTeam(
        user_id,
        year
    );

    // query registration
    const registration = await registrationServices.findRegistration(
        type_id,
        year
    );

    // is_zontes data correction
    const { is_zontes = 'N' } = values;
    values.is_zontes = is_zontes;
    // rider*_ data correction
    const keys = Object.keys(values);
    let riders = [];
    keys.forEach((element) => {
        const rider = element.split('_')[0].includes('rider');
        if (rider) {
            const id = element.substring(5, 6);
            riders.push(Number(id));
        }
    });
    riders = Array.from(new Set(riders)); // deduplication

    const temp = {};
    riders.forEach((element, index) => {
        temp[`rider${index + 1}_name`] = values[`rider${element}_name`];
        temp[`rider${index + 1}_phone`] = values[`rider${element}_phone`];
        temp[`rider${index + 1}_RRN`] = values[`rider${element}_RRN`];
        temp[`rider${index + 1}_has_KIC`] = values[`rider${element}_has_KIC`];
        if (values.hasOwnProperty(`rider${element}_history`)) {
            temp[`rider${index + 1}_history`] =
                values[`rider${element}_history`];
            delete values[`rider${element}_history`];
        }

        delete values[`rider${element}_name`];
        delete values[`rider${element}_phone`];
        delete values[`rider${element}_RRN`];
        delete values[`rider${element}_has_KIC`];
    });
    values = { ...values, ...temp };

    const form = await registration.getForm();
    const requiredFields = await form.getFormFields({
        raw: true,
        where: { is_required: 1 },
    });

    const required = requiredFields.map((x) => x.field_name);
    const input = Object.keys(values);

    let difference = required.filter((x) => !input.includes(x));

    // create formdata
    const is_completed = difference.length > 0 ? 0 : 1;
    const formdata_values = JSON.stringify(values);
    const formdata = await registrationServices.createFormdata(user_id, {
        formdata_values,
        is_completed,
    });

    // create team registration
    const { formdata_id } = formdata;
    const { team_id } = team;
    const { regist_id } = registration;
    const teamRegistration = await registrationServices.upsertTeamRegistration(
        regist_id,
        team_id,
        formdata_id
    );

    res.redirect(`/registration`);
};
