const db = require("../config/db");

// Add Patient
exports.addPatient = async (req, res) => {
    try {
        const { user_id, age, gender, phone, address, blood_group } = req.body;

        const result = await db.query(
            `INSERT INTO patients(user_id, age, gender, phone, address, blood_group)
             VALUES($1,$2,$3,$4,$5,$6)
             RETURNING *`,
            [user_id, age, gender, phone, address, blood_group]
        );

        res.json({
            message: "Patient Added Successfully",
            patient: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Get All Patients
exports.getPatients = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM patients"
        );

        res.json(result.rows);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
