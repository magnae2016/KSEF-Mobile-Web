'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('TEMPLATES', {
            template_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            template_uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            template_file: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            template_brand_color: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            template_brand_thumbnail: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            template_og_image: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            has_shortcut: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            shortcut_title: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            shortcut_link: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            template_created_at: {
                type: 'TIMESTAMP',
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('TEMPLATES');
    },
};
