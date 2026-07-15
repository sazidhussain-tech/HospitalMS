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
