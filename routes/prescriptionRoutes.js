const express = require("express");
const router = express.Router();

const {
    addPrescription,
    getPrescriptions,
    deletePrescription,
    updatePrescription
} = require("../controllers/prescriptionController");


router.post("/", addPrescription);

router.get("/", getPrescriptions);

router.delete("/:id", deletePrescription);

router.put("/:id", updatePrescription);

module.exports = router;
