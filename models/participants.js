'use strict';
module.exports = (sequelize, DataTypes) => {
    const Participants = sequelize.define(
        'Participants',
        {
            participant_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                unique: true,
            },
            participant_uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'USERS',
                    key: 'user_id',
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
            participant_alias: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            role_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'ROLES',
                    key: 'role_id',
                },
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'PARTICIPANTS',
            underscored: true,
        }
    );
    Participants.associate = function (models) {
        // associations can be defined here
        models.Participants.belongsTo(models.Users, {
            foreignKey: 'user_id',
        });

        models.Participants.belongsTo(models.Teams, {
            foreignKey: 'team_id',
        });

        models.Participants.belongsTo(models.Roles, {
            foreignKey: 'role_id',
            targetKey: 'role_id',
        });
    };
    return Participants;
};
