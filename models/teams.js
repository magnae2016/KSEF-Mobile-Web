'use strict';
module.exports = (sequelize, DataTypes) => {
    const Teams = sequelize.define(
        'Teams',
        {
            team_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            team_uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            team_year: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 2020,
            },
            team_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            team_entry: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            team_created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
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
            tableName: 'TEAMS',
            underscored: true,
        }
    );
    Teams.associate = function (models) {
        // associations can be defined here
        models.Teams.belongsToMany(models.Users, {
            through: 'Participants',
            foreignKey: 'team_id',
        });
    };
    return Teams;
};
