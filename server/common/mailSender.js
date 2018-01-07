const sendgridMail = require('@sendgrid/mail');

const apiSendgrid = require('../secret.json').apiSendgrid;
const urlClientSide = require('../config/config-system.json').urlClientSide;

sendgridMail.setApiKey(apiSendgrid);

module.exports = {

    sendVerifyEmail: function (req, user, tokenVerify) {
        const msg = {
            to: user.email,
            from: 'kcoinclub@ico.com',
            subject: 'Xác thực tài khoản',
            text: 'Mời xác thực tài khoản',
            html: '<strong>Sử dụng đoạn mã sau để xác thực tài khoản</strong><br/>' + tokenVerify.token,
        };
        console.log(msg);
        return sendgridMail.send(msg);
    },

    sendResetPassword: function (user, tokenVerify) {
        const msg = {
            to: user.email,
            from: 'kcoinclub@ico.com',
            subject: 'Reset Password',
            text: 'Reset Password',
            html: '<strong>Sử dụng đoạn mã sau để lấy lại mật khẩu</strong><br/>' + tokenVerify.token,
        };
        console.log(msg);
        return sendgridMail.send(msg);
    }

};