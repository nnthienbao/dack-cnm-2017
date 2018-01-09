const express = require('express');
const Router = express.Router();

const adminController = require('../../controllers/adminController');

const adminRequired = function (req, res, next) {
    if(!req.user) {
        return res.sendStatus(403);
    } else if(!req.user.isAdmin) {
        return res.sendStatus(403);
    }

    next();
};

Router.get('/statistic', adminRequired, (req, res) => {
    adminController.getStatistics(req, res);
});

Router.get('/list/user-account', adminRequired, (req, res) => {
    adminController.getInfoUserAccount(req, res);
});

Router.get('/list/transaction', adminRequired, (req, res) => {
    adminController.getListTransaction(req, res);
});

Router.get('/list/address', adminRequired, (req, res) => {
    adminController.getListAddress(req, res);
});

Router.get('/transaction/:ref', adminRequired, (req, res) => {
    adminController.getInfoTransaction(req, res);
});

module.exports = Router;