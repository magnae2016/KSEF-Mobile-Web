'use strict';

const { Users, Participants } = require('../models');
require('dotenv').config();

exports.findParticipatingTeam = async function (user_id) {
    let user = {};
    try {
        user = await Users.findOne({
            where: {
                user_id,
                is_deleted: 0,
            },
        });

        const team = await user.getTeams({
            where: {
                team_year: process.env.YEAR,
            },
        });

        return team.pop();
    } catch (error) {
        throw new Error(error);
    }
};
