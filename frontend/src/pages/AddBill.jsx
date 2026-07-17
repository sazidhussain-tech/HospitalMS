import { useState } from "react";

function AddBill() {

    const [patientId, setPatientId] = useState("");
    const [appointmentId, setAppointmentId] = useState("");
    const [amount, setAmount] = useState("");
    const [paymentStatus, setPaymentStatus] = useState("Pending");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(
            "http://localhost:3000/api/bills",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    patient_id: Number(patientId),
                    appointment_id: Number(appointmentId),
                    amount: Number(amount),
                    payment_status: paymentStatus
                })
            }
        );

        const data = await response.json();

        alert(data.message || "Bill Added Successfully");
    };

    return (
        <div>

            <h2>💳 Add Bill</h2>

            <form onSubmit={handleSubmit}>

                <input
                    placeholder="Patient ID"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Appointment ID"
                    value={appointmentId}
                    onChange={(e) => setAppointmentId(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />

                <br /><br />

                <input
                    placeholder="Payment Status"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                />

                <br /><br />

                <button type="submit">
                    Add Bill
                </button>

            </form>

        </div>
    );
}

export default AddBill;
