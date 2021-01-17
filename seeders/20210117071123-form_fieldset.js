'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert(
            'FORM_FIELDSET',
            [
                {
                    fieldset_name: '참가 정보',
                },
                {
                    fieldset_name: '팀 정보',
                },
                {
                    fieldset_name: '환불정보 입력',
                },
                {
                    fieldset_name: '라이더 정보',
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {},
};
