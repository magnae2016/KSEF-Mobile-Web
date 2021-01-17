'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('CALENDAR', {
            cal_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            cal_uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            cal_seq: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            cal_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            cal_date: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            prog_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'PROGRESS',
                    key: 'prog_id',
                },
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('CALENDAR');
    },
};
