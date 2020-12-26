'use strict';

var bkfd2Password = require('pbkdf2-password');
var hasher = bkfd2Password();
const jwt = require('jsonwebtoken');
const config = require(__dirname + '/../config/jsonwebtoken.json')[
    'JWT_SECRET'
];

const hashPassword = (user) => {
    return new Promise((resolve, reject) => {
        hasher(
            { password: user.user_password },
            function (err, pass, salt, hash) {
                if (err) {
                    return reject(new Error(err));
                }

                user.user_salt = salt;
                user.user_password = hash;
                resolve(hash);
            }
        );
    });
};
module.exports.hashPassword = hashPassword;

const setPassword = (user) => {
    return new Promise((resolve, reject) => {
        hasher(user, (err, pass, salt, hash) => {
            if (err) {
                return reject(new Error(err));
            }

            resolve(hash);
        });
    });
};
module.exports.setPassword = setPassword;

const generateToken = (user) => {
    const token = jwt.sign(
        {
            id: user.user_id,
            uuid: user.user_uuid,
            email: user.user_email,
            name: user.user_name,
        },
        config.secretOrPrivateKey,
        {
            issuer: 'Trinity',
        }
    );
    return token;
};
module.exports.generateToken = generateToken;
