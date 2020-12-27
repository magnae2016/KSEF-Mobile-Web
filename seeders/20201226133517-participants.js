'use strict';
const { v4 } = require('uuid');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'PARTICIPANTS',
            [
                {
                    participant_uuid: v4(),
                    user_id: 1,
                    team_id: 67,
                    participant_alias: '네이만 마커스',
                    role_id: 5,
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('PARTICIPANTS', null, {
            cascade: true,
        });
    },
};
