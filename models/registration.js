'use strict';
module.exports = (sequelize, DataTypes) => {
    const registration = sequelize.define(
        'Registrations',
        {
            regist_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            regist_uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            regist_year: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            regist_title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'REGISTRATION_TYPE',
                    key: 'type_id',
                },
            },
            form_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'FORMS',
                    key: 'form_id',
                },
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'REGISTRATIONS',
            underscored: true,
        }
    );
    registration.associate = function (models) {
        // associations can be defined here
        models.Registrations.belongsTo(models.RegistrationType, {
            foreignKey: 'type_id',
            targetKey: 'type_id',
        });

        models.Registrations.belongsTo(models.Forms, {
            foreignKey: 'form_id',
            targetKey: 'form_id',
        });

        models.Registrations.belongsToMany(models.Teams, {
            through: 'TeamRegistration',
            foreignKey: 'regist_id',
        });
    };
    return registration;
};
