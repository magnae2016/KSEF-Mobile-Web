'use strict';

const Joi = require('joi');

const accountsServices = require('../services/accountsServices');

exports.requireRegister = async function (req, res, next) {
    console.log(JSON.stringify(req.body));
    let hasError = false;
    let status = 200;

    const schema = Joi.object({
        username: Joi.string().min(2).max(30).required(),
        email: Joi.string()
            .email({
                minDomainSegments: 2,
                tlds: { allow: ['com', 'net'] },
            })
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,30}$'))
            .required(),
        repeat_password: Joi.ref('password'),
        phone: Joi.string().min(9).max(15).required(),
        birth_year: Joi.string().length(8).required(),
    }).with('password', 'repeat_password');

    // validates Request Body using Joi
    try {
        await schema.validateAsync(req.body, {
            abortEarly: false,
        });
    } catch (error) {
        console.log('error', error);

        hasError = true;
        status = 400;

        res.status(status);
        return res.render('accounts/create_account', {
            title: '회원가입',
            _original: error._original,
            details: error.details,
        });
    }

    const {
        email: user_email,
        username: user_name,
        password: user_password,
        phone: user_phone,
        birth_year: user_birth_date,
    } = req.body;

    try {
        // check if user exists
        const exists = await accountsServices.findUserByEmail(user_email);
        if (exists) {
            console.log('A user already exists with that email');
            hasError = true;
            status = 409;

            res.status(status);
            return res.render('accounts/create_account', {
                title: '회원가입',
                _original: req.body,
            });
        }

        await accountsServices.createUser({
            user_email,
            user_name,
            user_password,
            user_phone,
            user_birth_date,
        });

        res.redirect('/');
    } catch (error) {
        console.log('The server encountered an unexpected condition.', error);
        hasError = true;
        status = 500;

        res.status(status);
        return res.render('accounts/create_account', {
            title: '회원가입',
            _original: req.body,
        });
    }
};
