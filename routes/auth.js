/* 
    Auth routes 
    host + /api/auth
*/

const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

const { createUser, loginUser, renewToken } = require("../controllers/auth");

router.post(
  "/new",
  [
    // middlewares
    check("name", "Name is required").notEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "The password must have at least 6 characters").isLength({
      min: 6,
    }),
  ],
  createUser
);
router.post(
  "/",
  [
    // middlewares
    check("email", "Email is required").isEmail(),
    check("password", "The password must have at least 6 characters").isLength({
      min: 6,
    }),
  ],
  loginUser
);
router.post("/renew", renewToken);

module.exports = router;
