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
                    team_name: '박무경',
                    team_entry: 1,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '황준철',
                    team_entry: 2,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '두가키분당',
                    team_entry: 3,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '모튤&스핀휠',
                    team_entry: 4,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '리페어바이크',
                    team_entry: 5,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '드래곤빌리지',
                    team_entry: 6,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '박명호',
                    team_entry: 7,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'FX3',
                    team_entry: 8,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '기흥레이싱팀',
                    team_entry: 9,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '스르스',
                    team_entry: 10,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '마이너스',
                    team_entry: 11,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'KIMA A',
                    team_entry: 12,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '혼다레이싱대구',
                    team_entry: 13,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '초보운전',
                    team_entry: 14,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '태광미디어모터스포츠',
                    team_entry: 15,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '짤바이크1',
                    team_entry: 16,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '레드블리츠',
                    team_entry: 17,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '팀MBC1',
                    team_entry: 18,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '모터바이크',
                    team_entry: 19,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '네아이아빠',
                    team_entry: 20,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '이동현',
                    team_entry: 21,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '모토스퀘어',
                    team_entry: 22,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '제니초이',
                    team_entry: 23,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '트라이엄프코리아',
                    team_entry: 24,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '대구피크인',
                    team_entry: 25,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '짤바이크2',
                    team_entry: 26,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'KIMA B',
                    team_entry: 27,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'M-SSAno1',
                    team_entry: 28,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'M-SSAno2',
                    team_entry: 29,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'MBRR',
                    team_entry: 30,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '두발레리노',
                    team_entry: 31,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '태광미디어모토스포츠',
                    team_entry: 32,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '엄기조',
                    team_entry: 33,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '모토그레시브',
                    team_entry: 34,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '삼수팀',
                    team_entry: 35,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: 'M-SSAno3',
                    team_entry: 36,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '솔레이싱',
                    team_entry: 37,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '임효진',
                    team_entry: 38,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '짠짜이',
                    team_entry: 39,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '모토라드대구',
                    team_entry: 40,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '팀mbc2',
                    team_entry: 41,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '김정용',
                    team_entry: 42,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '메카닉로드',
                    team_entry: 43,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '박성철',
                    team_entry: 44,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '오토바이가게',
                    team_entry: 45,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '방탄중년단',
                    team_entry: 46,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '팀제로',
                    team_entry: 47,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '헥사허브',
                    team_entry: 48,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '와이드오픈스로틀',
                    team_entry: 49,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '진로 이지짤',
                    team_entry: 50,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '허스크바나 강남A',
                    team_entry: 51,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '허스크바나 강남B',
                    team_entry: 52,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '디모토',
                    team_entry: 53,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '허스크바나 강남C',
                    team_entry: 54,
                },
                {
                    team_uuid: v4(),
                    team_year: process.env.YEAR,
                    team_name: '모토그레시브1',
                    team_entry: 55,
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
