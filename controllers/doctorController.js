const db = require("../config/db");

// Add Doctor
exports.addDoctor = async (req, res) => {
    try {
        const { user_id, specialization, phone, address } = req.body;

        const result = await db.query(
            `INSERT INTO doctors(user_id, specialization, phone, address)
             VALUES($1,$2,$3,$4)
             RETURNING *`,
            [user_id, specialization, phone, address]
        );

        res.json({
            message: "Doctor Added Successfully",
            doctor: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Get All Doctors
exports.getDoctors = async (req, res) => {
    try {
        const result = await db.query(
            "SELECT * FROM doctors"
        );

        res.json(result.rows);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
// Search Doctors
exports.searchDoctors = async (req, res) => {
    try {
        const { specialization } = req.query;

        const result = await db.query(
            "SELECT * FROM doctors WHERE specialization ILIKE $1",
            [`%${specialization}%`]
        );

        res.json(result.rows);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
