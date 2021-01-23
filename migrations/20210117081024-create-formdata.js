'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('FORMDATA', {
            formdata_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            formdata_values: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            is_completed: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'USERS',
                    key: 'user_id',
                },
            },
            created_at: {
                type: 'TIMESTAMP',
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('FORMDATA');
    },
};
