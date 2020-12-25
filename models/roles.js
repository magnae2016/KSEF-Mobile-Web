'use strict';
module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define(
        'Roles',
        {
            role_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            role_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'ROLES',
            underscored: true,
        }
    );
    Roles.associate = function (models) {
        // associations can be defined here
        models.Roles.hasMany(models.Participants, {
            foreignKey: 'role_id',
            sourceKey: 'role_id',
        });
    };
    return Roles;
};
