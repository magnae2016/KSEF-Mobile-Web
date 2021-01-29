'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.addColumn('ALERTS', 'alert_link', {
                type: Sequelize.STRING,
                after: 'alert_message',
                allowNull: true,
            }),
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.removeColumn('ALERTS', 'alert_link'),
        ]);
    },
};
