'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('PARTICIPANTS', {
            participant_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
            },
            participant_uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            participation_year: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'USERS',
                    key: 'user_id',
                },
            },
            team_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'TEAMS',
                    key: 'team_id',
                },
            },
            participant_alias: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            role_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'ROLES',
                    key: 'role_id',
                },
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('PARTICIPANTS');
    },
};
