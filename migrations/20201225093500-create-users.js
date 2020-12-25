'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('USERS', {
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            user_uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            user_email: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_salt: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            user_phone: {
                type: Sequelize.STRING(15),
                allowNull: true,
            },
            user_birth_date: {
                type: Sequelize.STRING(10),
                allowNull: true,
            },
            app_token: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            user_created_at: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            last_update_time: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            is_admin: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            is_deleted: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            deleted_time: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('USERS');
    },
};
