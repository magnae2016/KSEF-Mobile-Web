const {
    RegistrationType,
    Users,
    Registrations,
    TeamRegistration,
} = require('../models');

exports.findAllTypes = async function () {
    try {
        const types = await RegistrationType.findAll();

        return types;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findparticipatingTeam = async function (user_id, year) {
    try {
        const user = await Users.findOne({
            where: {
                user_id,
                is_deleted: 0,
            },
        });

        const team = await user.getTeams({
            plain: true,
            where: {
                team_year: year,
            },
            through: {
                order: [['participant_id', 'DESC']],
            },
            limit: 1,
        });

        return team;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findRegistration = async function (type_id, regist_year) {
    try {
        const registration = await Registrations.findOne({
            where: {
                type_id,
                regist_year,
            },
        });

        return registration;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findTeamRegistration = async function (regist_id, team_id) {
    try {
        const teamRegistration = await TeamRegistration.findOne({
            where: {
                regist_id,
                team_id,
            },
        });

        return teamRegistration;
    } catch (error) {
        throw new Error(error);
    }
};

exports.upsertTeamRegistration = async function (
    regist_id,
    team_id,
    formdata_id
) {
    try {
        const teamRegistration = await TeamRegistration.upsert({
            regist_id,
            team_id,
            formdata_id,
        });

        return teamRegistration;
    } catch (error) {
        throw new Error(error);
    }
};

exports.createFormdata = async function (user_id, formdata) {
    try {
        const user = await Users.findOne({
            where: {
                user_id,
                is_deleted: 0,
            },
        });

        const r = await user.createFormdatum(formdata, {
            isNewRecord: true,
        });

        return r;
    } catch (error) {
        throw new Error(error);
    }
};
