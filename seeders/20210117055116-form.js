'use strict';
const { v4 } = require('uuid');
require('dotenv').config();

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'FORMS',
            [
                {
                    form_id: 1,
                    form_uuid: v4(),
                    form_name: 'KSEF 내구페스티발 참가 신청서',
                    form_file: `${process.env.YEAR}-form-ENDURANCE`,
                    content_file: `${process.env.YEAR}-content-ENDURANCE`,
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('FORMS', null, {
            cascade: true,
        });
    },
};
