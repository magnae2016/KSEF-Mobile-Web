'use strict';
const { v4 } = require('uuid');
require('dotenv').config();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'TEAMS',
            [
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'MBRF',
                    team_entry: 57,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '손성운',
                    team_entry: 58,
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('TEAMS', null, {
            cascade: true,
        });
    },
};
