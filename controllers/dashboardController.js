const db = require("../config/db");

exports.getDashboard = async (req, res) => {
    try {
        const doctors = await db.query("SELECT COUNT(*) FROM doctors");
        const patients = await db.query("SELECT COUNT(*) FROM patients");
        const appointments = await db.query("SELECT COUNT(*) FROM appointments");
        const bills = await db.query("SELECT COUNT(*) FROM bills");
	const revenue = await db.query("SELECT COALESCE(SUM(amount),0) AS revenue FROM bills");
        res.json({
            total_doctors: doctors.rows[0].count,
            total_patients: patients.rows[0].count,
            total_appointments: appointments.rows[0].count,
            total_bills: bills.rows[0].count,
	    total_revenue: revenue.rows[0].revenue
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
