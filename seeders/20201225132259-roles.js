'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'ROLES',
            [
                {
                    role_id: 1,
                    role_name: '팀감독',
                },
                {
                    role_id: 2,
                    role_name: '팀대표',
                },
                {
                    role_id: 3,
                    role_name: '팀미캐닉',
                },
                {
                    role_id: 4,
                    role_name: '팀매니저',
                },
                {
                    role_id: 5,
                    role_name: '팀라이더',
                },
                {
                    role_id: 6,
                    role_name: '팀서포터',
                },
                {
                    role_id: 7,
                    role_name: '미디어',
                },
                {
                    role_id: 8,
                    role_name: '파트너',
                },
                {
                    role_id: 9,
                    role_name: '스폰서',
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('ROLES', null, {
            cascade: true,
        });
    },
};
