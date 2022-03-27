const express = require("express");
require("dotenv").config();

// Create express server
const app = express();

// Public directory
app.use(express.static("public"));

// Routes
app.use('/api/auth', require('./routes/auth'))
// TODO: CRUD // events

// Listen request
app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
