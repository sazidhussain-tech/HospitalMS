const db = require("../config/db");

// Add Prescription
exports.addPrescription = async (req, res) => {
    try {
        const {
            appointment_id,
            doctor_id,
            patient_id,
            medicine,
            description
        } = req.body;

        const result = await db.query(
            `INSERT INTO prescriptions
            (appointment_id, doctor_id, patient_id, medicine, description)
            VALUES($1,$2,$3,$4,$5)
            RETURNING *`,
            [
                appointment_id,
                doctor_id,
                patient_id,
                medicine,
                description
            ]
        );

        res.json({
            message: "Prescription Added Successfully",
            prescription: result.rows[0]
        });

    } catch(error) {
        res.status(500).json({
            error:error.message
        });
    }
};


// Get Prescriptions
exports.getPrescriptions = async (req,res)=>{
    try{
        const result = await db.query(
            "SELECT * FROM prescriptions"
        );

        res.json(result.rows);

    }catch(error){
        res.status(500).json({
            error:error.message
        });
    }
};
