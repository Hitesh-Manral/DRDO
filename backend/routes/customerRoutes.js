const express = require("express");
const customerRoutes = express.Router();
const { getCustomerByid } = require("../controller/customerController");

customerRoutes.get("/customer/:customer_id", getCustomerByid);

module.exports = customerRoutes;
