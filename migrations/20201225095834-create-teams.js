'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('TEAMS', {
            team_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            team_uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            team_year: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 2020,
            },
            team_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            team_entry: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            team_created_at: {
                type: 'TIMESTAMP',
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
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
        return queryInterface.dropTable('TEAMS');
    },
};
