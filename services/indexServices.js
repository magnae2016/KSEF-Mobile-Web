'use strict';

const { Users, Notices, Templates, Alerts, Sequelize } = require('../models');
require('dotenv').config();

exports.findParticipatingTeam = async function (user_id) {
    if (!user_id) return undefined;
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

exports.findFixedNotices = async function () {
    let notices = undefined;
    try {
        notices = await Notices.findAll({
            raw: true,
            attributes: {
                include: [
                    [
                        Sequelize.col('Template.template_brand_thumbnail'),
                        'template_brand_thumbnail',
                    ],
                ],
            },
            where: {
                is_fixed: 1,
                is_published: 1,
                is_deleted: 0,
            },
            include: {
                model: Templates,
                attributes: ['template_brand_thumbnail'],
            },
        });

        return notices;
    } catch (error) {
        throw new Error(error);
    }
};

exports.findLatestAlert = async function () {
    let alert = undefined;
    try {
        alert = await Alerts.findOne({
            limit: 1,
            order: [['alert_id', 'DESC']],
        });

        return alert;
    } catch (error) {
        throw new Error(error);
    }
};
