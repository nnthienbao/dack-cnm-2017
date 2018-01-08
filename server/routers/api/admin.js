const express = require('express');
const Router = express.Router();

const adminController = require('../../controllers/adminController');

Router.get('/statistic', (req, res) => {
    adminController.getStatistics(req, res);
});

Router.get('/get-user-account', (req, res) => {
    adminController.getInfoUserAccount(req, res);
});

module.exports = Router;