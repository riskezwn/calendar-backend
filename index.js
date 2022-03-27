const express = require("express");

// Create express server
const app = express();

// Routes
app.get("/", (req, res) => {
  res.json({
    ok: true,
  });
});

// Listen request
app.listen(4001, () => {
  console.log(`Server running on ${4001}`);
});
