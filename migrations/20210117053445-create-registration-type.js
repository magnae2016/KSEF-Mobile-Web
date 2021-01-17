'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('REGISTRATION_TYPE', {
            type_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            type_keyword: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            type_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('REGISTRATION_TYPE');
    },
};
