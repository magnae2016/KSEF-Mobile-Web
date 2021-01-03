'use strict';
const { Users } = require('../models');

const checkLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        res.redirect('/accounts/login');
        return;
    }

    return next();
};

module.exports.checkLoggedIn = checkLoggedIn;

const checkIsAdmin = async (req, res, next) => {
    const { id: user_id } = req.user;

    const user = await Users.findOne({
        where: {
            user_id,
        },
    });
    const { is_admin } = user;
    if (!is_admin) {
        res.status(401);
        return res.render('redirect', {
            message: '관리자만 접근할 수 있는 페이지입니다.',
        });
    }

    return next();
};

module.exports.checkIsAdmin = checkIsAdmin;
