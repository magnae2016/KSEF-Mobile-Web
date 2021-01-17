'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'PROGRESS',
            [
                {
                    prog_id: 1,
                    prog_name: '예정',
                },
                {
                    prog_id: 2,
                    prog_name: '진행',
                },
                {
                    prog_id: 3,
                    prog_name: '마감',
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('PROGRESS', null, {
            cascade: true,
        });
    },
};
