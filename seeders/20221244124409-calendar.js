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
                    cal_date: '2월 25일 금요일 오전 11시',
                    prog_id: 1,
                },
                {
                    cal_uuid: v4(),
                    cal_year: process.env.YEAR,
                    cal_seq: 2,
                    cal_name: '내구페스티발 2차 접수',
                    cal_date: '3월 25일 금요일 오전 11시',
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
