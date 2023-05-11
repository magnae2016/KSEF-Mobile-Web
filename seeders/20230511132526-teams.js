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
                    team_entry: 32,
                    team_name: 'Gear6 박창현',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 33,
                    team_name: 'MBRR 고등팀',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 34,
                    team_name: 'MBRR 제주야마하',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 35,
                    team_name: '모토크로우',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 36,
                    team_name: '바이크온',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 37,
                    team_name: '투휠 ',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 38,
                    team_name: '광주KTM',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 39,
                    team_name: '쌍용 & 바로코레이싱',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 40,
                    team_name: 'CFMOTO 강북 1',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 41,
                    team_name: 'CFMOTO 강북 2',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 42,
                    team_name: '모토라드대구 A',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 43,
                    team_name: '모토라드대구 B',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 45,
                    team_name: '창원바이크몰',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 46,
                    team_name: 'KRTA 1',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 47,
                    team_name: 'KRTA 2',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 48,
                    team_name: 'KRTA 3',
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
