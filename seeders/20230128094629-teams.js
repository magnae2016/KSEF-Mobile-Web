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
                    team_entry: 1,
                    team_name: '두가티분당',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 2,
                    team_name: '부라더',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 3,
                    team_name: 'MBRR.GT',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 4,
                    team_name: '짠자이',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 5,
                    team_name: 'MBRR.S',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 6,
                    team_name: '짤바이크',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 7,
                    team_name: '기흥레이싱',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 8,
                    team_name: '레드블리츠',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 9,
                    team_name: '대구금강A',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 10,
                    team_name: '대만팀',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 11,
                    team_name: '양용환',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 12,
                    team_name: '그림나무',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 13,
                    team_name: '금강오토바이',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 14,
                    team_name: '프로젝트뮤',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 15,
                    team_name: '대구금강C',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 16,
                    team_name: '팀혼다대구A',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 17,
                    team_name: '팀대구혼다B',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 18,
                    team_name: 'KIMA(B)',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 19,
                    team_name: 'KIMA(A)',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 20,
                    team_name: '필리핀팀',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 21,
                    team_name: '아스펜데일',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 22,
                    team_name: 'KTM대구',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 23,
                    team_name: 'SRS',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 24,
                    team_name: 'FX3',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 25,
                    team_name: '거제대명',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 26,
                    team_name: '네아이아빠',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 27,
                    team_name: '라크로레이싱',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 28,
                    team_name: 'masskmj',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 29,
                    team_name: '드라이클러치',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 30,
                    team_name: '일본팀',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 31,
                    team_name: '신포모터스',
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_entry: 44,
                    team_name: '커스텀게러지',
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
