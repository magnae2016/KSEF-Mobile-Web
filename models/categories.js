'use strict';
module.exports = (sequelize, DataTypes) => {
    const Categories = sequelize.define(
        'Categories',
        {
            category_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            category_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'CATEGORIES',
            underscored: true,
        }
    );
    Categories.associate = function (models) {
        // associations can be defined here
        models.Categories.hasMany(models.Notices, {
            foreignKey: 'category_id',
            sourceKey: 'category_id',
        });
    };
    return Categories;
};
