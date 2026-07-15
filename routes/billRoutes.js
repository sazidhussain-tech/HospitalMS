const express = require("express");
const router = express.Router();

const {
    addBill,
    getBills
} = require("../controllers/billController");

router.post("/", addBill);

router.get("/", getBills);

module.exports = router;
