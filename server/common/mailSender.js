const sendgridMail = require('@sendgrid/mail');

const apiSendgrid = require('../secret.json').apiSendgrid;

sendgridMail.setApiKey(apiSendgrid);

module.exports = {

    sendVerifyEmail: function (req, user, tokenVerify) {
        const msg = {
            to: user.email,
            from: 'kcoinclub@ico.com',
            subject: 'Xác thực tài khoản',
            text: 'Mời xác thực tài khoản',
            html: '<strong>Để xác thực tài khoản, vui lòng nhập đoạn code sau và nhấn submit như hướng dẫn</strong><br/>' + tokenVerify.token,
        };
        console.log(msg);
        return sendgridMail.send(msg);
    },

    sendResetPassword: function (user) {

    }

};