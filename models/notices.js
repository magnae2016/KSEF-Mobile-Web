'use strict';
module.exports = (sequelize, DataTypes) => {
    const Notices = sequelize.define(
        'Notices',
        {
            notice_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            notice_uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            category_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'CATEGORIES',
                    key: 'category_id',
                },
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'USERS',
                    key: 'user_id',
                },
            },
            notice_title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            template_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'TEMPLATES',
                    key: 'template_id',
                },
            },
            notice_views: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            notice_created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            is_fixed: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            is_deleted: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            deleted_time: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'NOTICES',
            underscored: true,
        }
    );
    Notices.associate = function (models) {
        // associations can be defined here
        models.Notices.belongsTo(models.Categories, {
            foreignKey: 'category_id',
            targetKey: 'category_id',
        });

        models.Notices.belongsTo(models.Users, {
            foreignKey: 'user_id',
            targetKey: 'user_id',
        });

        models.Notices.belongsTo(models.Templates, {
            foreignKey: 'template_id',
            targetKey: 'template_id',
        });
    };
    return Notices;
};
