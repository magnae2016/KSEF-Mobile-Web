'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('NOTICES', {
            notice_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            notice_uuid: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4,
                allowNull: false,
            },
            category_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'CATEGORIES',
                    key: 'category_id',
                },
            },
            user_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'USERS',
                    key: 'user_id',
                },
            },
            notice_title: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            notice_subtitle: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            template_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'TEMPLATES',
                    key: 'template_id',
                },
            },
            notice_views: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            notice_created_at: {
                type: 'TIMESTAMP',
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            is_fixed: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            is_published: {
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
        return queryInterface.dropTable('NOTICES');
    },
};
