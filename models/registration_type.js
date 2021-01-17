'use strict';
module.exports = (sequelize, DataTypes) => {
    const registration_type = sequelize.define(
        'RegistrationType',
        {
            type_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            type_keyword: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'REGISTRATION_TYPE',
            underscored: true,
        }
    );
    registration_type.associate = function (models) {
        // associations can be defined here
    };
    return registration_type;
};
