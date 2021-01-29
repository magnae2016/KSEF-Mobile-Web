'use strict';
module.exports = (sequelize, DataTypes) => {
    const Alerts = sequelize.define(
        'Alerts',
        {
            alert_id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
                unique: true,
            },
            alert_message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            alert_link: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            alert_created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'ALERTS',
            underscored: true,
        }
    );
    Alerts.associate = function (models) {
        // associations can be defined here
    };
    return Alerts;
};
