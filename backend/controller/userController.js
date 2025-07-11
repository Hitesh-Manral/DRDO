const express = require("express");
const cors = require("cors");
const app = express();
const db = require("../db");
const bcrypt = require("bcrypt");
const { jwtGenerator, jwtDecoder } = require("../utils/jwtToken");
app.use(cors());
app.use(express.json());

exports.userRegister = async (req, res) => {
  const { full_name, email, phone, password, type } = req.body;

  try {
    const [faults] = await db.pool.query("SELECT * FROM fault");
    console.log("Faults in the database:", faults);

    const [user] = await db.pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    console.log("User query result:", user);

    if (user.length > 0) {
      return res.status(401).json("User already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    await db.pool.query(
      "INSERT INTO users (full_name, email,  phone, password,  type) VALUES (?, ?, ?, ?, ?)",
      [full_name, email, phone, bcryptPassword, type]
    );

    const [newUser] = await db.pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    const jwtToken = jwtGenerator(newUser[0].user_id, newUser[0].type);

    if (type === "student") {
      const { fault_id, usn, room } = req.body;
      console.log(newUser.rows);
      await db.pool.query(
        "INSERT INTO student (student_id, fault_id, usn, room) VALUES (?, ?, ?, ?)",
        [newUser[0].user_id, fault_id, usn, room]
      );
    } else if (type === "warden") {
      const { fault_id } = req.body;
      await db.pool.query(
        "INSERT INTO warden (warden_id,fault_id) VALUES (?, ?)",
        [newUser[0].user_id, fault_id]
      );
    }
    console.log(jwtDecoder(jwtToken));
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    console.log("Login query result:", user);

    if (user.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compare(password, user[0].password);

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }
    const jwtToken = jwtGenerator(user[0].user_id, user[0].type);
    console.log(jwtDecoder(jwtToken));
    return res.json({ jwtToken });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
