const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();

// Create express server
const app = express();

// Database
dbConnection();

// Public directory
app.use(express.static("public"));

// Read and parse body
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
// TODO: CRUD // events

// Listen request
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
