'use strict';

const Joi = require('joi');
require('dotenv').config();

const accountsServices = require('../services/accountsServices');
const { setPassword, generateToken } = require('../modules/util');

exports.requireLogin = async function (req, res, next) {
    console.log(JSON.stringify(req.body));
    let hasError = false;
    let status = 200;

    const schema = Joi.object({
        email: Joi.string()
            .email({
                minDomainSegments: 2,
            })
            .messages({
                'string.email': '올바르지 않은 이메일 형식입니다.',
                'string.empty': '이메일을 입력해주세요.',
                'any.required': '이메일을 입력해주세요.',
            })
            .required(),
        password: Joi.string()
            .messages({
                'string.empty': '비밀번호를 입력해주세요.',
                'any.required': '비밀번호를 입력해주세요.',
            })
            .required(),
    });

    try {
        await schema.validateAsync(req.body, {
            abortEarly: false,
        });
    } catch (error) {
        console.error(error);
        hasError = true;
        status = 400;

        res.status(status);
        return res.render('accounts/login', {
            title: '로그인',
            invalid: true,
            _original: error._original,
            details: error.details,
        });
    }

    const { email: user_email, password } = req.body;

    try {
        // check if the user exists
        const exists = await accountsServices.findUserByEmail(user_email);
        if (exists) {
            // Password verification
            const hashedPassword = await setPassword({
                password,
                salt: exists.user_salt,
            });

            if (hashedPassword === exists.user_password) {
                // Authenticated user
                console.log('Valid User');

                const token = generateToken(exists);
                res.cookie('access_token', token, {
                    maxAge: 1000 * 60 * 60 * 24, // 1d
                    httpOnly: true,
                });

                res.status(200);
                res.redirect('/');
            } else {
                // Password does not match
                console.log('Invalid password');
                hasError = true;
                status = 401;

                res.status(status);
                return res.render('accounts/login', {
                    title: '로그인',
                    invalid: true,
                    _original: req.body,
                    details: [
                        {
                            message:
                                '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.',
                            path: ['password'],
                        },
                    ],
                });
            }
        } else {
            // ID not signed up
            console.error('This ID is not registered.');
            hasError = true;
            status = 401;

            res.status(status);
            return res.render('accounts/login', {
                title: '로그인',
                invalid: true,
                _original: req.body,
                details: [
                    {
                        message:
                            '가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.',
                        path: ['email'],
                    },
                ],
            });
        }
    } catch (error) {
        console.error('The server encountered an unexpected condition.', error);
        hasError = true;
        status = 500;

        res.status(status);
        return res.render('accounts/login', {
            title: '로그인',
            invalid: false,
        });
    }
};

exports.requireRegister = async function (req, res, next) {
    console.log(JSON.stringify(req.body));
    let hasError = false;
    let status = 200;

    const schema = Joi.object({
        username: Joi.string()
            .min(2)
            .max(30)
            .messages({
                'string.min': '2~20자의 문자만 사용 가능합니다.',
                'string.max': '2~20자의 문자만 사용 가능합니다.',
                'string.empty': '이름을 입력해주세요.',
                'any.required': '이름을 입력해주세요.',
            })
            .required(),
        alias: Joi.string()
            .min(2)
            .max(30)
            .messages({
                'string.min': '2~20자의 문자만 사용 가능합니다.',
                'string.max': '2~20자의 문자만 사용 가능합니다.',
                'string.empty': '별명을 입력해주세요.',
                'any.required': '별명을 입력해주세요.',
            })
            .required(),
        email: Joi.string()
            .email({
                minDomainSegments: 2,
            })
            .messages({
                'string.email': '올바르지 않은 이메일 형식입니다.',
                'string.empty': '이메일을 입력해주세요.',
                'any.required': '이메일을 입력해주세요.',
            })
            .required(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{3,30}$'))
            .messages({
                'string.pattern.base':
                    '비밀번호를 입력해주세요.(영문자/숫자/특수문자)',
                'string.empty': '비밀번호를 입력해주세요.',
                'any.required': '비밀번호를 입력해주세요.',
            })
            .required(),
        repeat_password: Joi.string()
            .valid(Joi.ref('password'))
            .messages({
                'any.only':
                    '입력한 비밀번호와 재입력한 비밀번호가 일치하지 않습니다. 다시 확인해 주세요.',
            })
            .required(),
        phone: Joi.string()
            .min(9)
            .max(15)
            .messages({
                'string.min': '휴대폰 번호를 올바르게 입력해주세요.',
                'string.max': '휴대폰 번호를 올바르게 입력해주세요.',
                'string.empty': '휴대폰 번호를 입력해주세요.',
                'any.required': '휴대폰 번호를 입력해주세요.',
            })
            .required(),
        birth_year: Joi.string()
            .length(8)
            .messages({
                'string.length': '8자리 생년월일을 입력해주세요.',
                'string.empty': '생년월일을 입력해주세요.',
                'any.required': '생년월일을 입력해주세요.',
            })
            .required(),
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
            invalid: true,
            _original: error._original,
            details: error.details,
        });
    }

    const {
        email: user_email,
        username: user_name,
        alias: user_alias,
        password: user_password,
        birth_year: user_birth_date,
    } = req.body;

    let { phone: user_phone } = req.body;
    user_phone = user_phone.replace(/[^0-9]/g, '');

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
                invalid: true,
                _original: req.body,
                details: [
                    {
                        message: '이미 사용중이거나 탈퇴한 아이디입니다.',
                        path: ['email'],
                    },
                ],
            });
        }

        await accountsServices.createUser({
            user_email,
            user_name,
            user_alias,
            user_password,
            user_phone,
            user_birth_date,
        });

        res.redirect('login');
    } catch (error) {
        console.log('The server encountered an unexpected condition.', error);
        hasError = true;
        status = 500;

        res.status(status);
        return res.render('accounts/create_account', {
            title: '회원가입',
            _original: req.body,
            invalid: false,
        });
    }
};

exports.requireLogout = function (req, res, next) {
    res.clearCookie('access_token');
    res.redirect('login');
};

exports.requireTeamList = async function (req, res, next) {
    try {
        const context = {
            teams: undefined,
        };

        const teams = await accountsServices.findTeams();
        context.teams = teams;

        res.render('accounts/register_team', { title: '팀 등록', context });
    } catch (error) {
        console.error('The server encountered an unexpected condition.', error);
        res.sendStatus(500);
    }
};

exports.requireRegisterTeam = async function (req, res, next) {
    try {
        const { team_id, role_id } = req.body;
        const { id: user_id, alias: participant_alias } = req.user;
        const participation_year = process.env.YEAR;

        const participant = await accountsServices.upsertParticipant({
            participation_year,
            user_id,
            team_id,
            participant_alias,
            role_id,
        });

        res.sendStatus(200);
    } catch (error) {
        console.error('The server encountered an unexpected condition.', error);
        res.sendStatus(500);
    }
};
