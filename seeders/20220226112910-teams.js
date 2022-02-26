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
                    team_name: '방탕중년단',
                    team_entry: 1,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '리퀴몰리무토',
                    team_entry: 2,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '짠자이',
                    team_entry: 3,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '도미노정관점',
                    team_entry: 4,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '기흥레이싱팀',
                    team_entry: 5,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '임호곤',
                    team_entry: 6,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '레드블리츠',
                    team_entry: 7,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '혼다레이싱대구',
                    team_entry: 8,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '수원도라이(홍승현)',
                    team_entry: 9,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '짤바이크',
                    team_entry: 10,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '투휠HD레이싱',
                    team_entry: 11,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'MBRR',
                    team_entry: 12,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'RevUP',
                    team_entry: 13,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '제니초이',
                    team_entry: 14,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '혼다레이싱대구2',
                    team_entry: 15,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '금강모터스1',
                    team_entry: 16,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '박성철',
                    team_entry: 17,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'KIMA(B)',
                    team_entry: 18,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'MBRF',
                    team_entry: 19,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '금강모터스2',
                    team_entry: 20,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '라크로레이싱',
                    team_entry: 21,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '양용환',
                    team_entry: 22,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '프로젝트뮤',
                    team_entry: 23,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '모터싸다구',
                    team_entry: 24,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '비전네아이아빠',
                    team_entry: 25,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'FX3',
                    team_entry: 26,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '김종립',
                    team_entry: 27,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '태광미디어모터스포츠',
                    team_entry: 28,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'KTM대구',
                    team_entry: 29,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'DUCATISRS',
                    team_entry: 30,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '팀 포어스A',
                    team_entry: 31,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '커스텀게라지',
                    team_entry: 32,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '가와사키동대문',
                    team_entry: 33,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '모토그레시브',
                    team_entry: 34,
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
