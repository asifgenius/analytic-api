const express = require("express");
const router = express.Router();
const customerController = require('./customer.controller');

router.get('/analytics/geographical', customerController.getGeographicalDistribution);
router.get('/analytics/new-customers-over-time', customerController.getNewCustomersOverTime);
module.exports = router;
