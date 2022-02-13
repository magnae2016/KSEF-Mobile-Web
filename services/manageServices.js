const {
    Templates,
    Notices,
    RegistrationType,
    TeamRegistration,
    Teams,
    Formdata,
    Sequelize,
} = require('../models');

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

exports.findRegistrationType = async function (type_keyword) {
    try {
        const type = await RegistrationType.findOne({
            where: {
                type_keyword: type_keyword.toUpperCase(),
            },
        });

        return type;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findTeams = async function (team_year) {
    try {
        const teams = await Teams.findAll({
            raw: true,
            where: {
                is_deleted: 0,
                team_year,
            },
            order: [['team_entry', 'ASC']],
        });

        return teams;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findTeamRegistration = async function (regist_id) {
    try {
        const registrations = await TeamRegistration.findAll({
            raw: true,
            attributes: {
                include: [
                    [Sequelize.col('Team.team_name'), 'team_name'],
                    [Sequelize.col('Team.team_entry'), 'team_entry'],
                    [
                        Sequelize.col('Formdatum.formdata_values'),
                        'formdata_values',
                    ],
                    [Sequelize.col('Formdatum.is_completed'), 'is_completed'],
                ],
            },
            where: {
                regist_id,
            },
            includeIgnoreAttributes: false,
            include: [
                {
                    model: Teams,
                    attributes: ['team_name', 'team_entry'],
                    order: [['team_entry', 'ASC']],
                    required: true,
                },
                {
                    model: Formdata,
                    attributes: ['formdata_values', 'is_completed'],
                },
            ],
        });

        return registrations;
    } catch (error) {
        throw new Error(error);
    }
};
