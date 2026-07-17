const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
    addDoctor,
    getDoctors,
    searchDoctors,
    deleteDoctor,
    updateDoctor
} = require("../controllers/doctorController");
router.post("/", authMiddleware, roleMiddleware("admin"), addDoctor);

router.get("/", authMiddleware, roleMiddleware("admin", "doctor"), getDoctors);
router.get("/search", authMiddleware, roleMiddleware("admin", "doctor"), searchDoctors);
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteDoctor);
router.put("/:id", authMiddleware, roleMiddleware("admin"), updateDoctor);
module.exports = router;
