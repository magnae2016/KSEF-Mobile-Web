'use strict';

const indexServices = require('../services/indexServices');

exports.requireHome = async function (req, res, next) {
    const context = {
        team: undefined,
    };

    // User not logged in
    if (!req.user) {
        return res.render('index', { title: '홈', security: req.user || {} });
    }

    const { id: user_id } = req.user;

    // Query team information
    const team = await indexServices.findParticipatingTeam(user_id);
    // User in the team
    if (team) {
        const { Participants } = team;
        const role = await Participants.getRole();

        context.team = {
            team_name: team.team_name,
            participant_alias: Participants.participant_alias,
            role_name: role.role_name,
        };
    }

    res.render('index', {
        title: '홈',
        security: req.user,
        context,
    });
};
