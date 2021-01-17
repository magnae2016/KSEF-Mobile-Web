'use strict';
module.exports = (sequelize, DataTypes) => {
    const Form = sequelize.define(
        'Forms',
        {
            form_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            form_uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            form_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            form_file: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            content_file: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            form_created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            freezeTableName: true,
            timestamps: false,
            tableName: 'FORMS',
            underscored: true,
        }
    );
    Form.associate = function (models) {
        // associations can be defined here
        models.Forms.hasOne(models.Registrations, {
            foreignKey: 'form_id',
        });
    };
    return Form;
};
