const express = require("express");
const router = express.Router();

const {
    bookAppointment,
    getAppointments,
    deleteAppointment,
    updateAppointment

} = require("../controllers/appointmentController");


router.post("/", bookAppointment);

router.get("/", getAppointments);

router.delete("/:id", deleteAppointment);

router.put("/:id", updateAppointment);

module.exports = router;
