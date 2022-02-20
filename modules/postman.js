const nodemailer = require('nodemailer');
const smtpPool = require('nodemailer-smtp-pool');
const Email = require('email-templates');
require('dotenv').config();

const transporter = nodemailer.createTransport(
    smtpPool({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: '465',
        tls: {
            rejectUnauthorize: false,
        },
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
        maxConnections: 5,
    })
);

const email = new Email({
    message: {
        from: `"KSEF Team" <${process.env.NODEMAILER_USER}>`,
        attachments: [],
    },
    transport: transporter,
    views: { options: { extension: 'ejs' } },
    preview: false,
    send: true,
});

module.exports.deliver = (data) => {
    const { envelope, locals } = data;
    const { template, subject, to } = envelope;
    try {
        email
            .send({
                template,
                message: {
                    subject,
                    to,
                },
                locals: {
                    ...locals,
                },
            })
            .then((info) => {
                delete info.originalMessage.html;
            });
    } catch (error) {
        logger.error(error);
    }
};
