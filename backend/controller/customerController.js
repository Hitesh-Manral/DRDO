const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");
app.use(cors());
app.use(express.json());

exports.getCustomerByid = async (req, res) => {
  try {
    const { customer_id } = req.params;
    const customer = await db.pool.query(
      "select * from customer where customer_id = ?",
      [customer_id]
    );
    res.json(customer);
  } catch (err) {
    console.log(err.message);
  }
};
