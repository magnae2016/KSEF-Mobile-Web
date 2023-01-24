'use strict';
const { v4 } = require('uuid');
require('dotenv').config();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'REGISTRATIONS',
            [
                {
                    regist_id: 3,
                    regist_uuid: v4(),
                    regist_year: process.env.YEAR,
                    regist_title: 'KSEF 내구페스티발 참가 신청서',
                    type_id: 1,
                    form_id: 3,
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('REGISTRATIONS', null, {
            cascade: true,
        });
    },
};
