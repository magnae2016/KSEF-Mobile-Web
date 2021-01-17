'use strict';
module.exports = (sequelize, DataTypes) => {
    const team_registration = sequelize.define(
        'TeamRegistration',
        {
            participation_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
            },
            participation_uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            regist_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'REGISTRATIONS',
                    key: 'regist_id',
                },
            },
            team_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'TEAMS',
                    key: 'team_id',
                },
            },
            formdata_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'FORMDATA',
                    key: 'formdata_id',
                },
            },
            participation_created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            participation_updated_at: {
                type: DataTypes.DATE,
                allowNull: true,
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
            tableName: 'TEAM_REGISTRATION',
            underscored: true,
        }
    );
    team_registration.associate = function (models) {
        // associations can be defined here
        models.TeamRegistration.belongsTo(models.Registrations, {
            foreignKey: 'regist_id',
        });

        models.TeamRegistration.belongsTo(models.Teams, {
            foreignKey: 'team_id',
        });

        models.TeamRegistration.belongsTo(models.Formdata, {
            foreignKey: 'formdata_id',
            targetKey: 'formdata_id',
        });
    };
    return team_registration;
};
