'use strict';

const indexServices = require('../services/indexServices');

exports.requireHome = async function (req, res, next) {
    const context = {
        team: undefined,
        notices: undefined,
        alert: undefined,
        calendar: undefined,
    };

    const { id: user_id = undefined } = req.user || {};

    try {
        // Query team, Fixed notices, alert information(Promise.all)
        const [team, notices, alert, calendar] = await Promise.all([
            indexServices.findParticipatingTeam(user_id),
            indexServices.findFixedNotices(),
            indexServices.findLatestAlert(),
            indexServices.findCalendar(),
        ]);
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
        if (notices) context.notices = notices;

        if (alert) context.alert = alert;

        if (calendar) context.calendar = calendar;

        res.render('index', {
            title: '홈',
            security: req.user || {},
            context,
        });
    } catch (error) {
        console.error('The server encountered an unexpected condition.', error);
        res.sendStatus(500);
    }
};
