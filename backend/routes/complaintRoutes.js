const express = require("express");
const complaintRoutes = express.Router();
const {
  postComplaints,
  putComplaintsByid,
  getAllComplaintsByUser,
  getUserType,
  getUserDetails,
  deleteComplaints,
} = require("../controller/complaintController");
const { authorizeAdmin } = require("../middleware/auth");

// Route to post a new complaint
complaintRoutes.post("/complaints", postComplaints);

// Route to update a complaint by ID
complaintRoutes.post("/complaints/:id", putComplaintsByid);

// Route to delete a complaint by ID
complaintRoutes.delete("/complaints/:id", deleteComplaints);

// Route to get user type
complaintRoutes.get("/userType", getUserType);

// Route to get user details by ID
complaintRoutes.get("/userDetails/:id", getUserDetails);

// New route to get all complaints for the authenticated user
complaintRoutes.get("/complaints", getAllComplaintsByUser);

module.exports = complaintRoutes;
