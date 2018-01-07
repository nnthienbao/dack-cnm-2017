const bcrypt = require('bcrypt');
const crypto = require('crypto');
const isEqual = require('lodash').isEqual;

const { generateAddress, createTokenVerifyWithUser } = require('../common/Utils');
const User = require('../models/User');
const TokenVerify = require('../models/TokenVerify');
const { sendVerifyEmail, sendResetPassword } = require('../common/mailSender');
const {checkValidCaptcha, getCoinLocked, getRealableWallet} = require('../common/Utils');
const validateResetPassword = require('../validation/validateResetPassword').default;

module.exports.createUser = function (req, res) {
    const key = generateAddress();
    let user = new User(req.body);
    user.hashPassword = bcrypt.hashSync(req.body.password, 10);
    user.key = key;

    user.save(function (err) {
        if(err) {
            console.log(err);
            return res.status(500).json({msg: "fail"});
        }

        // Luu token va gui config mail
        const token = crypto.randomBytes(16).toString('hex');
        const tokenVerify = new TokenVerify({
            _userId: user._id,
            token: token
        });
        tokenVerify.save(function (err) {
            if(err) {
                console.log(err);
                return res.status(500).json({msg: "fail"});
            }

            sendVerifyEmail(req, user, tokenVerify)
                .then(() => {
                    return res.sendStatus(200);
                })
                .catch(err => {
                    console.log(err);
                    return res.status(500).json({msg: "fail"});
                })
        })
    })
}

module.exports.verifyAccount = function (req, res) {
    const { token } = req.body;
    TokenVerify.findOne({token: token}, function (err, tokenVerify) {
        if(err) {
            console.log(err);
            return res.status(500).json({msg: "Fail"});
        }

        if(!tokenVerify) return res.status(400).json({token: "Không tìm thấy token"});

        User.findOne({_id: tokenVerify._userId}, function (err, user) {
            if(err) return res.status(500).json({msg: "Fail"});

            if(!user) return res.status(400).json({token: "Không tìm thấy user ứng với token"});

            if(user.isVerified) return res.status(400).json({token: "Tài khoản này đã kích hoạt"});

            user.isVerified = true;
            user.save(function (err) {
                if(err) return res.status(500).json({msg: "Fail"});
                res.sendStatus(200);
            })
        })
    });
};

module.exports.ResendTokenVerify = function (req, res) {
    const { username } = req.body;

    User.findOne({ username: username }, function (err, user) {
        if(err) return res.status(500).json({msg: "Fail"});
        if(!user) return res.status(400).json({error: "Tài khoản không có trong hệ thống"});
        if(user.isVerified) return res.status(400).json({error: "Tài khoản này đã xác nhận"});

        TokenVerify.findOne({_userId: user._id}, function (err, tokenVerify) {
            if(err) return res.status(500).json({msg: "Fail"});

            if(!tokenVerify) {
                const token = crypto.randomBytes(16).toString('hex');
                const tokenVerifyNew = new TokenVerify({
                    _userId: user._id,
                    token: token
                });

                tokenVerifyNew.save(function (err) {
                    if(err) {
                        console.log(err);
                        return res.status(500).json({msg: "fail"});
                    }
                    sendVerifyEmail(req, user, tokenVerifyNew)
                        .then(() => {
                            return res.sendStatus(200);
                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(500).json({msg: "fail"});
                        })
                })
            } else {
                sendVerifyEmail(req, user, tokenVerify)
                    .then(() => {
                        return res.sendStatus(200);
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(500).json({msg: "fail"});
                    })
            }
        })
    })
};

module.exports.requestResetPassword = function(req, res) {
    const { email, responseCaptcha } = req.body;

    checkValidCaptcha(responseCaptcha)
        .then(resolve => {
            const parseData = JSON.parse(resolve);
            if(!parseData.success) {
                reject("Wrong captcha");
            }

            User.findOne({email: email}, function (err, user) {
                if(err) return res.status(500).json({msg: "fail"});
                if(!user) return res.status(400).json({error: "Không tìm thấy tài khoản ứng với email trong hệ thống"});

                const tokenVerify = createTokenVerifyWithUser(user, "ResetPassword");
                tokenVerify.save(function (err) {
                    if(err) return res.status(500).json({msg: "Fail"});

                    sendResetPassword(user, tokenVerify)
                        .then((resolve) => {
                            return res.sendStatus(200);
                        })
                        .catch(err => {
                            console.log(err);
                            return res.status(500).json({msg: "fail"});
                        })
                });
            })
        })
        .catch(err => {
            return res.status(400).json({responseCaptcha: "Captcha không đúng"});
        });
};

module.exports.resetPassword = function (req, res) {
    const { errors, isValid } = validateResetPassword(req.body);
    if(!isValid) return res.status(400).json(errors);

    const { token, passwordNew, rePasswordNew } = req.body;

    TokenVerify.findOne({token: token}, function (err, tokenVerify) {
        if(err) return res.status(500).json({err: "Fail"});
        if(!tokenVerify) return res.status(400).json({token: "Không tìm thấy token"});

        User.findOne({_id: tokenVerify._userId}, function (err, user) {
            if(err) return res.status(500).json({err: "Fail"});

            user.hashPassword = bcrypt.hashSync(passwordNew, 10);
            user.save(function (err) {
                if(err) return res.status(500).json({err: "Fail"});
                tokenVerify.remove();
                res.sendStatus(200);
            })
        })
    })
};

module.exports.getUser = function(req, res) {
    User.findOne({_id: req.user._id}).then(user => {
        if(!user) return res.sendStatus(401);

        let data = {
            username: user.username,
            email: user.email,
            address: user.key.address,
        };

        // Tim so du thuc te va kha dung
        getRealableWallet(user.key.address).then(realableWallet => {
            data = {
                ...data,
                realableWallet: realableWallet
            }
        }).then(() => {
            getCoinLocked(user.key.address).then(coinLocked => {
                data = {
                    ...data,
                    availableWallet: data.realableWallet - coinLocked
                };
                return res.status(200).json(data);
            });
        })

    }).catch(err => {
        console.log(err);
        return res.status(500).json({msg: "Fail"});
    })
};





















