const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");

app.use(cors());
app.use(express.json());

exports.getAdminByid = async (req, res) => {
  try {
    const { admin_id } = req.params;
    const admin = await db.pool.query(
      "select * from admin where admin_id = ?",
      [admin_id]
    );
    res.json(admin);
  } catch (err) {
    console.log(err.message);
  }
};

// New function to get complaints for the admin
exports.getComplaintsForAdmin = async (req, res) => {
  try {
    const [allComplaints] = await db.pool.query(
      "SELECT * FROM complaint ORDER BY created_at DESC"
    );
    res.json(allComplaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
