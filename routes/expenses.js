const path = require('path');
const express = require('express');
const rootDir = require("../util/path");

const router = express.Router();
const appointmentController=require("../controllers/expenses")


router.get("/", appointmentController.getbooking)

router.post("/expense",appointmentController.postAddbooking)

router.get('/previous-bookings',appointmentController.getPreviousBookings)

router.delete('/delete-booking/:id',appointmentController.deletebooking)

router.put('/appointment/:id',appointmentController.Editbooking)

module.exports = router;


