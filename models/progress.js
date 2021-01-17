'use strict';
module.exports = (sequelize, DataTypes) => {
    const Progress = sequelize.define(
        'Progress',
        {
            prog_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            prog_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'PROGRESS',
            underscored: true,
        }
    );
    Progress.associate = function (models) {
        // associations can be defined here
        models.Progress.hasMany(models.Calendar, {
            foreignKey: 'prog_id',
            sourceKey: 'prog_id',
        });
    };
    return Progress;
};
