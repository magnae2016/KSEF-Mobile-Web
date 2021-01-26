const { Users, Teams, Participants } = require('../models');
require('dotenv').config();

exports.findUserByEmail = async function (user_email) {
    let user = {};
    try {
        user = await Users.findOne({
            where: {
                user_email,
                is_deleted: 0,
            },
        });
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

exports.createUser = async function (user) {
    try {
        await Users.create(user, { isNewRecord: true });
    } catch (error) {
        throw new Error(error);
    }
};

exports.findTeams = async function () {
    let teams = {};
    try {
        const teams = await Teams.findAll({
            where: {
                team_year: process.env.YEAR,
                is_deleted: 0,
            },
        });
        return teams;
    } catch (error) {
        throw new Error(error);
    }
};

exports.upsertParticipant = async function (values) {
    try {
        const participant = await Participants.upsert(values, {
            fields: ['user_id', 'team_id', 'participant_alias', 'role_id'],
        });
        return participant;
    } catch (error) {
        throw new Error(error);
    }
};
