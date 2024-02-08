'use strict';
const { v4 } = require('uuid');
require('dotenv').config();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'CALENDAR',
            [
                {
                    cal_uuid: v4(),
                    cal_year: process.env.YEAR,
                    cal_seq: 1,
                    cal_name: '내구페스티발 1차 접수',
                    cal_date: '2월 23일 금요일 오전 11시',
                    prog_id: 1,
                },
                {
                    cal_uuid: v4(),
                    cal_year: process.env.YEAR,
                    cal_seq: 2,
                    cal_name: '내구페스티발 2차 접수',
                    cal_date: '3월 29일 금요일 오전 11시',
                    prog_id: 1,
                },
                {
                    cal_uuid: v4(),
                    cal_year: process.env.YEAR,
                    cal_seq: 3,
                    cal_name: '슈퍼바이크 123 내구',
                    cal_date: '8월 3일 토요일',
                    prog_id: 1,
                },
                {
                    cal_uuid: v4(),
                    cal_year: process.env.YEAR,
                    cal_seq: 4,
                    cal_name: '7시간 내구',
                    cal_date: '8월 4일 일요일',
                    prog_id: 1,
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('CALENDAR', null, {
            cascade: true,
        });
    },
};
