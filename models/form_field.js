'use strict';
module.exports = (sequelize, DataTypes) => {
    const form_field = sequelize.define(
        'FormFields',
        {
            field_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            form_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                references: {
                    model: 'FORMS',
                    key: 'form_id',
                },
            },
            field_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            field_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            is_required: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            },
            fieldset_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
                references: {
                    model: 'FORM_FIELDSET',
                    key: 'fieldset_id',
                },
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'FORM_FIELDS',
            underscored: true,
        }
    );
    form_field.associate = function (models) {
        // associations can be defined here
        models.FormFields.belongsTo(models.Forms, {
            foreignKey: 'form_id',
            targetKey: 'form_id',
        });

        models.FormFields.belongsTo(models.FormFieldset, {
            foreignKey: 'fieldset_id',
            targetKey: 'fieldset_id',
        });
    };
    return form_field;
};
