const { Users } = require('../models');

exports.findUserByEmail = async function (user_email) {
    let user = {};
    try {
        user = await Users.findOne({
            where: {
                user_email,
                is_deleted: 0,
            },
        });
        return user;
    } catch (error) {
        throw new Error(error);
    }
};

exports.createUser = async function (user) {
    try {
        await Users.create(user, { isNewRecord: true });
    } catch (error) {
        throw new Error(error);
    }
};
