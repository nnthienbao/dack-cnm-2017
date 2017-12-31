const bcrypt = require('bcrypt');
const crypto = require('crypto');
const generateAddress = require('../common/Utils').generateAddress;
const User = require('../models/User');
const TokenVerify = require('../models/TokenVerify');
const { sendVerifyEmail } = require('../common/mailSender');

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
}





















