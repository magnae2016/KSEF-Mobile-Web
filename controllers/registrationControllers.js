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

    const registrations = await team.getRegistrations({
        where: {
            type_id,
            regist_year: year,
        },
        through: {
            attributes: ['formdata_id'],
            where: {
                is_deleted: 0,
            },
        },
    });

    if (!registrations.length) {
        return res.render('redirect', {
            message: '해당 접수 일정이 없습니다.',
        });
    }

    const registration = registrations.pop();
    const { TeamRegistration } = registration;
    const formdata = await TeamRegistration.getFormdatum({
        raw: true,
    });
    const form = await registration.getForm({
        raw: true,
    });

    const { content_file, form_file } = form;
    context.formdata = formdata.formdata_values;
    context.content_file = content_file;
    context.form_file = form_file;

    res.render('registration/content', { title: '참가접수', context });
};

exports.requireUpdateRegistration = async function (req, res, next) {
    const { type_id = undefined } = req.params;
    const { id: user_id } = req.user;
    const year = process.env.YEAR;

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

    // req.body Data correction
    const { is_zontes = 'N' } = req.body;
    req.body.is_zontes = is_zontes;

    const form = await registration.getForm();
    const requiredFields = await form.getFormFields({
        raw: true,
        where: { is_required: 1 },
    });

    const required = requiredFields.map((x) => x.field_name);
    const input = Object.keys(req.body);

    let difference = required.filter((x) => !input.includes(x));

    // create formdata
    const is_completed = difference.length > 0 ? 0 : 1;
    const formdata_values = JSON.stringify(req.body);
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

    res.redirect(`/registration/view/${type_id}`);
};
