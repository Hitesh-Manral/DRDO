const express = require("express");
const adminRoutes = express.Router();
const {
  getAdminByid,
  getComplaintsForAdmin,
} = require("../controller/adminController");

adminRoutes.get("/admin/complaints", getComplaintsForAdmin);
adminRoutes.get("/admin/:admin_id", getAdminByid);

module.exports = adminRoutes;
