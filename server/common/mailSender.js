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
        return sendgridMail.send(msg);
    },

    sendConfigTransaction: function(user, tokenVerifyTrans) {
        const msg = {
            to: user.email,
            from: 'kcoinclub@ico.com',
            subject: 'Xác nhận giao dịch',
            text: 'Xác nhận giao dịch',
            html: `<strong>Nhấn vào link sau để xác nhận giao dịch</strong><br/><a href="${urlClientSide}/transactions/confirm/${tokenVerifyTrans.token}">${urlClientSide}/transactions/confirm/${tokenVerifyTrans.token}</a>`
        };
        return sendgridMail.send(msg);
    }
};