const express = require("express");
const router = express.Router();
const orderController = require('./order.controller');

router.get('/analytics/sales', orderController.getTotalSalesOverTime);
router.get('/analytics/growth', orderController.getSalesGrowthRate);
router.get('/analytics/repeat-customers', orderController.getRepeatCustomers);
router.get('/analytics/life-time', orderController.getCustomerLifetimeValueByCohort);

module.exports = router;
