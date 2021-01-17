'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('FORMS', {
            form_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            form_uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            form_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            form_file: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            content_file: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            form_created_at: {
                type: 'TIMESTAMP',
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('FORMS');
    },
};
