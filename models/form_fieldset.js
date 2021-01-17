'use strict';
module.exports = (sequelize, DataTypes) => {
    const form_fieldset = sequelize.define(
        'FormFieldset',
        {
            fieldset_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            fieldset_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'FORM_FIELDSET',
            underscored: true,
        }
    );
    form_fieldset.associate = function (models) {
        // associations can be defined here
        models.FormFieldset.hasMany(models.FormFields, {
            foreignKey: 'fieldset_id',
            sourceKey: 'fieldset_id',
        });
    };
    return form_fieldset;
};
