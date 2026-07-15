const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
    addDoctor,
    getDoctors,
    searchDoctors
} = require("../controllers/doctorController");

router.post("/", authMiddleware, roleMiddleware("admin"), addDoctor);

router.get("/", authMiddleware, roleMiddleware("admin", "doctor"), getDoctors);
router.get("/search", authMiddleware, roleMiddleware("admin", "doctor"), searchDoctors);


module.exports = router;
