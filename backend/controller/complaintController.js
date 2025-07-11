const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");
const { jwtGenerator, jwtDecoder } = require("../utils/jwtToken");

app.use(cors());
app.use(express.json());

const decodeUser = async (token) => {
  try {
    const decodedToken = jwtDecoder(token);
    console.log(decodedToken);

    const { user_id, type } = decodedToken.user;
    let userInfo;

    if (type === "customer") {
      const query = `
        SELECT customer_id, fault, fault_id
        FROM customer 
        WHERE customer_id = ?
      `;

      const result = await db.pool.query(query, [user_id]);
      console.log(result);
      if (result.length > 0) {
        userInfo = result[0];
      }
    }

    if (type === "admin") {
      const query = `
        SELECT admin_id, fault_id
        FROM admin 
        WHERE admin_id = ?
      `;

      const result = await db.pool.query(query, [user_id]);

      if (result.length > 0) {
        userInfo = result[0];
      }
    }

    return userInfo;
  } catch (err) {
    console.error("here111", err.message);
  }
};

exports.postComplaints = async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const userInfo = await decodeUser(token);

    const {
      name,
      pickup_location = null, // Updated
      address = null, // Updated
      description,
      fault,
      phone_no = null, // New field
      repair_location = null, // New field
      is_completed,
      assigned_at,
    } = req.body;

    const query = `insert into complaint 
            (name, address, 
            pickup_location, 
            description, fault, phone_no, repair_location, is_completed, created_at,
            assigned_at) 
            values (?,?,?,?,?,?,?,?,?,?)`;

    await db.pool.query(query, [
      name,
      address,
      pickup_location,
      description,
      fault,
      phone_no, // New field
      repair_location, // New field
      false,
      new Date().toISOString(),
      null,
    ]);

    // Get the inserted complaint
    const [insertedComplaint] = await db.pool.query(
      "SELECT * FROM complaint WHERE id = LAST_INSERT_ID()"
    );
    res.json(insertedComplaint[0]);
  } catch (err) {
    console.log(err.message);
  }
};

exports.putComplaintsByid = async (req, res) => {
  const token = req.headers.authorization;
  const decodedToken = jwtDecoder(token);
  console.log(decodedToken);
  const { user_id, type } = decodedToken.user;

  try {
    const { id } = req.params;

    if (type === "admin") {
      await db.pool.query(
        "UPDATE complaint SET is_completed = NOT is_completed, assigned_at = CURRENT_TIMESTAMP WHERE id = ?",
        [id]
      );
      const [updatedComplaint] = await db.pool.query(
        "SELECT * FROM complaint WHERE id = ?",
        [id]
      );
      res.json(updatedComplaint[0]);
    } else {
      res.status(404).json({ error: "Complaint not found" });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllComplaintsByUser = async (req, res) => {
  const token = req.headers.authorization;
  console.log(token);
  const decodedToken = jwtDecoder(token);
  console.log(decodedToken);

  const { user_id, type } = decodedToken.user;

  try {
    if (type === "admin") {
      const [allComplaints] = await db.pool.query(
        "SELECT * FROM complaint ORDER BY created_at DESC"
      );
      res.json(allComplaints);
    } else if (type === "customer") {
      const [myComplaints] = await db.pool.query(
        "SELECT * FROM complaint WHERE customer_id = ? ORDER BY created_at DESC",
        [user_id]
      );
      res.json(myComplaints);
    } else {
      res.status(403).json({ error: "Unauthorized" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserType = async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const decodedToken = jwtDecoder(token);
    console.log(decodedToken);
    const { type } = decodedToken.user;

    res.json({ userType: type });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const decodedToken = jwtDecoder(token);
    console.log(decodedToken);
    const { user_id, type } = decodedToken.user;

    console.log("Decoded Token:", decodedToken);
    console.log("User Type:", type);
    console.log("User ID:", user_id);

    if (type == "customer") {
      const customerDetails = await db.pool.query(
        `SELECT u.full_name, u.email, u.phone, c.usn, f.fault_id, f.fault_name, c.fault
      FROM users u, customer c, fault f
      WHERE u.user_id = ? AND u.user_id = c.customer_id AND c.fault_id = f.fault_id`,
        [user_id]
      );
      res.json(customerDetails);
    }
    if (type == "admin") {
      const adminDetails = await db.pool.query(
        `select u.full_name,u.email,u.phone
                                                  from users u 
                                                  where user_id=? `,
        [user_id]
      );
      res.json(adminDetails);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteComplaints = async (req, res) => {
  try {
    const token = req.headers.authorization;
    console.log(token);
    const decodedToken = jwtDecoder(token);
    console.log(decodedToken);
    const { type } = decodedToken.user;
    const { id } = req.params;

    if (type == "admin") {
      const deleteComplaint = await db.pool.query(
        `delete from complaint where id = ?`,
        [id]
      );
      res.json("complaint deleted");
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
