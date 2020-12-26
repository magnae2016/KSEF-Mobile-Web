'use strict';

const indexServices = require('../services/indexServices');

exports.requireHome = async function (req, res, next) {
    res.render('index', { title: '홈', userData: req.user });
};
