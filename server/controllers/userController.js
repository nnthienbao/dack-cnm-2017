const bcrypt = require('bcrypt');

const generateAddress = require('../common/Utils').generateAddress;
const User = require('../models/User');

module.exports.createUser = function (req, res) {
    const key = generateAddress();
    let user = new User(req.body);
    user.hashPassword = bcrypt.hashSync(req.body.password, 10);
    user.key = key;

    user.save(function (err, user) {
        if(err) {
            console.log(err);
            res.status(400).json({msg: "fail"})
        } else {
            res.status(201).json({msg: "success"});
        }
    })
}