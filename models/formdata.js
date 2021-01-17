'use strict';
module.exports = (sequelize, DataTypes) => {
    const formdata = sequelize.define(
        'Formdata',
        {
            formdata_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            formdata_values: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            is_completed: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'USERS',
                    key: 'user_id',
                },
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'FORMDATA',
            underscored: true,
        }
    );
    formdata.associate = function (models) {
        // associations can be defined here
        models.Formdata.belongsTo(models.Users, {
            foreignKey: 'user_id',
            targetKey: 'user_id',
        });

        models.Formdata.hasMany(models.TeamRegistration, {
            foreignKey: 'formdata_id',
            sourceKey: 'formdata_id',
        });
    };
    return formdata;
};
