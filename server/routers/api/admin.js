const express = require('express');
const Router = express.Router();

const adminController = require('../../controllers/adminController');

Router.get('/statistic', (req, res) => {
    adminController.getStatistics(req, res);
});

Router.get('/list/user-account', (req, res) => {
    adminController.getInfoUserAccount(req, res);
});

Router.get('/list/transaction', (req, res) => {
    adminController.getListTransaction(req, res);
});

Router.get('/list/address', (req, res) => {
    adminController.getListAddress(req, res);
});

module.exports = Router;