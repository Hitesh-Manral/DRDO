const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

// Create database if it doesn't exist
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL server");

  connection.query("CREATE DATABASE IF NOT EXISTS fixit_db", (err) => {
    if (err) throw err;
    console.log("Database 'fixit_db' is ready");
  });
});

const complaintRoutes = require("./routes/complaintRoutes");
const customerRoutes = require("./routes/customerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(cors());
app.use(express.json());

app.use("/", complaintRoutes);
app.use("/", customerRoutes);
app.use("/", adminRoutes);
app.use("/", userRoutes);

app.listen(3000, () => {
  console.log("Application is running on port 3000");
});
