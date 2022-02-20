'use strict';

const registrationServices = require('../services/registrationServices');
const { maskingRRN } = require('../modules/util');
require('dotenv').config();

async function getTeamRegistration(params) {
    return new Promise(async function (resolve, reject) {
        try {
            const { type, year, team_id } = params;
            const { type_id, type_keyword } = type;
            const registration = await registrationServices.findRegistration(
                type_id,
                year
            );

            const { regist_id } = registration;
            const TeamRegistration = await registrationServices.findTeamRegistration(
                regist_id,
                team_id
            );

            let callback = { type_keyword };
            if (TeamRegistration) {
                callback = {
                    ...callback,
                    ...TeamRegistration.get({ plain: true }),
                };
            }

            resolve(callback);
        } catch (error) {
            reject(new Error(error));
        }
    });
}

exports.requireRegistrationList = async function (req, res, next) {
    const { id: user_id } = req.user || {};
    const year = process.env.YEAR;
    const context = {
        types: undefined,
        team: undefined,
        registration: undefined,
    };

    const types = await registrationServices.findAllTypes();
    context.types = types;

    if (user_id) {
        // query team
        const team = await registrationServices.findparticipatingTeam(
            user_id,
            year
        );

        if (team) {
            context.team = team;

            const promises = [];
            types.forEach((element) => {
                promises.push(
                    getTeamRegistration({
                        type: element,
                        year,
                        team_id: team.team_id,
                    })
                );
            });
            const registration = await Promise.all(promises);
            context.registration = registration;
        }
    }

    res.render('registration/index', { title: '참가접수', context });
};

exports.requireRegistrationContent = async function (req, res, next) {
    const { type_id = undefined } = req.params;
    const { id: user_id } = req.user;
    const year = process.env.YEAR;
    const context = {
        user: undefined,
        type_id: type_id,
        formdata: undefined,
        content_file: undefined,
        form_file: undefined,
    };

    context.user = { ...req.user };

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

    if (!team) {
        return res.render('redirect', {
            message: '먼저 참가 팀을 선택해주세요.',
        });
    }

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
    res.render(view, { title: '참가접수', context, maskingRRN });
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

    try {
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
            temp[`rider${index + 1}_has_KIC`] =
                values[`rider${element}_has_KIC`];
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

        res.sendStatus(200);
    } catch (error) {
        console.error('The server encountered an unexpected condition.', error);
        res.sendStatus(500);
    }
};
