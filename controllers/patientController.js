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
// Delete Patient
exports.deletePatient = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            "DELETE FROM patients WHERE id=$1",
            [id]
        );

        res.json({
            message: "Patient Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Update Patient
exports.updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { age, gender, phone, address, blood_group } = req.body;

        await db.query(
            "UPDATE patients SET age=$1, gender=$2, phone=$3, address=$4, blood_group=$5 WHERE id=$6",
            [age, gender, phone, address, blood_group, id]
        );

        res.json({
            message: "Patient Updated Successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
