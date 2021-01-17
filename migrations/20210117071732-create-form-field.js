'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('FORM_FIELDS', {
            field_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            form_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'FORMS',
                    key: 'form_id',
                },
            },
            field_name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            field_type: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            is_required: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            fieldset_id: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'FORM_FIELDSET',
                    key: 'fieldset_id',
                },
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('FORM_FIELDS');
    },
};
