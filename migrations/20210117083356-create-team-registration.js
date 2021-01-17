'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('TEAM_REGISTRATION', {
            participation_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
            },
            participation_uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            regist_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'REGISTRATIONS',
                    key: 'regist_id',
                },
            },
            team_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'TEAMS',
                    key: 'team_id',
                },
            },
            formdata_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'FORMDATA',
                    key: 'formdata_id',
                },
            },
            participation_created_at: {
                type: 'TIMESTAMP',
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            participation_updated_at: {
                type: Sequelize.DATE,
                allowNull: true,
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
        return queryInterface.dropTable('TEAM_REGISTRATION');
    },
};
