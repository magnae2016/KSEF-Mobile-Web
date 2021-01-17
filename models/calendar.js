'use strict';
module.exports = (sequelize, DataTypes) => {
    const calendar = sequelize.define(
        'Calendar',
        {
            cal_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            cal_uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            cal_seq: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            cal_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cal_date: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            prog_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'PROGRESS',
                    key: 'prog_id',
                },
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'CALENDAR',
            underscored: true,
        }
    );
    calendar.associate = function (models) {
        // associations can be defined here
        models.Calendar.belongsTo(models.Progress, {
            foreignKey: 'prog_id',
            targetKey: 'prog_id',
        });
    };
    return calendar;
};
