/*
    events routes
    host + /api/events
*/

const { Router } = require("express");
const router = Router();

const { validateJWT } = require("../middlewares/validate-jwt");
const { getEvents, createEvent, updateEvent, deleteEvent } = require("../controllers/events");

// validate JWT all requests
router.use(validateJWT);

// get events
router.get("/", getEvents);
// create new event
router.post("/", createEvent);
// update event by id
router.put("/:id", updateEvent);
// delete event
router.delete("/:id", deleteEvent);

module.exports = router;
