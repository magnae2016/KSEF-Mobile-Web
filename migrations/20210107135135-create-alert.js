'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('ALERTS', {
            alert_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            alert_message: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            alert_created_at: {
                type: 'TIMESTAMP',
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('ALERTS');
    },
};
