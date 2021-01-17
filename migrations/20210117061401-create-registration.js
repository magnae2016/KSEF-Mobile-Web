'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('REGISTRATIONS', {
            regist_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            regist_uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            regist_year: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            regist_title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'REGISTRATION_TYPE',
                    key: 'type_id',
                },
            },
            form_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'FORMS',
                    key: 'form_id',
                },
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('REGISTRATIONS');
    },
};
