const db = require("../config/db");

// Book Appointment
exports.bookAppointment = async (req, res) => {
    try {
        const {
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time
        } = req.body;

        const result = await db.query(
            `INSERT INTO appointments
            (patient_id, doctor_id, appointment_date, appointment_time)
            VALUES($1,$2,$3,$4)
            RETURNING *`,
            [
                patient_id,
                doctor_id,
                appointment_date,
                appointment_time
            ]
        );

        res.json({
            message: "Appointment Booked Successfully",
            appointment: result.rows[0]
        });

    } catch(error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Get Appointments
exports.getAppointments = async (req,res)=>{
    try{
        const result = await db.query(
            "SELECT * FROM appointments"
        );

        res.json(result.rows);

    }catch(error){
        res.status(500).json({
            error:error.message
        });
    }
};
// Delete Appointment
exports.deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            "DELETE FROM appointments WHERE id=$1",
            [id]
        );

        res.json({
            message: "Appointment Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};


// Update Appointment
exports.updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            patient_id,
            doctor_id,
            appointment_date,
            appointment_time
        } = req.body;

        await db.query(
            `UPDATE appointments
             SET patient_id=$1,
                 doctor_id=$2,
                 appointment_date=$3,
                 appointment_time=$4
             WHERE id=$5`,
            [
                patient_id,
                doctor_id,
                appointment_date,
                appointment_time,
                id
            ]
        );

        res.json({
            message: "Appointment Updated Successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
