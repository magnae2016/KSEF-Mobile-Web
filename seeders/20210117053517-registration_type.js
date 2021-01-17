'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'REGISTRATION_TYPE',
            [
                {
                    type_id: 1,
                    type_keyword: 'ENDURANCE',
                    type_name: 'KSEF 내구페스티발 참가 신청서',
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('REGISTRATION_TYPE', null, {
            cascade: true,
        });
    },
};
