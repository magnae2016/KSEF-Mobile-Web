'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'CATEGORIES',
            [
                {
                    category_id: 1,
                    category_name: '공지',
                },
                {
                    category_id: 2,
                    category_name: '정보',
                },
                {
                    category_id: 3,
                    category_name: '결과',
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('CATEGORIES', null, {
            cascade: true,
        });
    },
};
