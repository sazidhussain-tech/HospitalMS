const db = require("../config/db");

// Add Bill
exports.addBill = async (req, res) => {
    try {
        const {
            patient_id,
            appointment_id,
            amount,
            payment_status
        } = req.body;

        const result = await db.query(
            `INSERT INTO bills
            (patient_id, appointment_id, amount, payment_status)
            VALUES($1,$2,$3,$4)
            RETURNING *`,
            [
                patient_id,
                appointment_id,
                amount,
                payment_status
            ]
        );

        res.json({
            message: "Bill Generated Successfully",
            bill: result.rows[0]
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Get Bills
exports.getBills = async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM bills");
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
// Update Bill
exports.updateBill = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            patient_id,
            appointment_id,
            amount,
            payment_status
        } = req.body;

        await db.query(
            `UPDATE bills
             SET patient_id=$1,
                 appointment_id=$2,
                 amount=$3,
                 payment_status=$4
             WHERE id=$5`,
            [
                patient_id,
                appointment_id,
                amount,
                payment_status,
                id
            ]
        );

        res.json({
            message: "Bill Updated Successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Delete Bill
exports.deleteBill = async (req, res) => {
    try {
        const { id } = req.params;

        await db.query(
            "DELETE FROM bills WHERE id=$1",
            [id]
        );

        res.json({
            message: "Bill Deleted Successfully"
        });

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
