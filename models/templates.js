'use strict';
module.exports = (sequelize, DataTypes) => {
    const Templates = sequelize.define(
        'Templates',
        {
            template_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            template_uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            template_summary: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            template_brand_color: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            template_brand_thumbnail: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            has_shortcut: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            shortcut_title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            shortcut_link: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'TEMPLATES',
            underscored: true,
        }
    );
    Templates.associate = function (models) {
        // associations can be defined here
        models.Templates.hasOne(models.Notices, {
            foreignKey: 'template_id',
        });
    };
    return Templates;
};
