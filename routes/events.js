/*
    events routes
    host + /api/events
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { isDate } = require("../helpers/isDate");
const { validateField } = require("../middlewares/validate-field");
const { validateJWT } = require("../middlewares/validate-jwt");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");

// validate JWT all requests
router.use(validateJWT);

// get events
router.get("/", getEvents);
// create new event
router.post(
  "/",
  [
    check("title", "Title is required").notEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    validateField
  ],
  createEvent);
// update event by id
router.put(
  "/:id",
  [
    check("title", "Title is required").notEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    validateField
  ],
  updateEvent);
// delete event
router.delete("/:id", deleteEvent);

module.exports = router;
