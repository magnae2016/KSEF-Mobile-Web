'use strict';

const { hashPassword } = require('../modules/util');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        'Users',
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                unique: true,
            },
            user_uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            user_email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_alias: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            user_password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            user_salt: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            user_phone: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            user_birth_date: {
                type: DataTypes.STRING(10),
                allowNull: true,
            },
            app_token: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            user_created_at: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            last_update_time: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            is_admin: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
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
            tableName: 'USERS',
            underscored: true,
        }
    );
    Users.associate = function (models) {
        // associations can be defined here
        models.Users.belongsToMany(models.Teams, {
            through: 'Participants',
            foreignKey: 'user_id',
        });

        models.Users.hasMany(models.Notices, {
            foreignKey: 'user_id',
            sourceKey: 'user_id',
        });
    };

    Users.beforeCreate(async (user) => {
        try {
            const hashedPassword = await hashPassword(user);
            if (hashedPassword) {
                console.log('Create hashed salt/password successfully');
            }
        } catch (error) {
            throw new Error(error);
        }
    });

    return Users;
};
