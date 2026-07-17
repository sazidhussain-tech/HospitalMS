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
// Delete Prescription
exports.deletePrescription = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            "DELETE FROM prescriptions WHERE id=$1",
            [id]
        );

        res.json({
            message: "Prescription Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Update Prescription
exports.updatePrescription = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            appointment_id,
            doctor_id,
            patient_id,
            medicine,
            description
        } = req.body;

        await db.query(
            `UPDATE prescriptions
             SET appointment_id=$1,
                 doctor_id=$2,
                 patient_id=$3,
                 medicine=$4,
                 description=$5
             WHERE id=$6`,
            [
                appointment_id,
                doctor_id,
                patient_id,
                medicine,
                description,
                id
            ]
        );

        res.json({
            message: "Prescription Updated Successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
