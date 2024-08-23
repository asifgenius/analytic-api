const express = require("express");
const router = express.Router();
const customerRouter = require("../customer/customer.route")
const orderRouter = require("../order/order.route");

router.use('/api/v1/customers',  customerRouter)
router.use('/api/v1/orders',  orderRouter)

module.exports = router;
