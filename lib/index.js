'use strict';

const checkLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        res.redirect('/accounts/login');
        return;
    }

    return next();
};

module.exports.checkLoggedIn = checkLoggedIn;
