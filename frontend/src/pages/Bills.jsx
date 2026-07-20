import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import API from "../services/api";
import { useEffect, useState } from "react";

function Bills() {

    const [bills, setBills] = useState([]);
    const [editBill, setEditBill] = useState(null);
    const [search, setSearch] = useState("");
    const [printBill, setPrintBill] = useState(null);
    const getBills = async () => {

        const response = await fetch(
           `${API}/bills`
        );

        const data = await response.json();

        if (Array.isArray(data)) {
            setBills(data);
        } else {
            console.log(data);
            setBills([]);
        }
    };

    useEffect(() => {
        getBills();
    }, []);
const deleteBill = async (id) => {

    const response = await fetch(
        `${API}/bills/${id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    alert(data.message);

    getBills();
};

const updateBill = async () => {

    const response = await fetch(
        `${API}/bills/${editBill.id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editBill)
        }
    );

    const data = await response.json();

    alert(data.message);

    setEditBill(null);

    getBills();
};

const downloadPDF = async () => {
    const input = document.querySelector(".print-bill");

    const canvas = await html2canvas(input);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();

    const imgWidth = pageWidth - 20;

    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);

    pdf.save(`Bill-${printBill.id}.pdf`);
};

    return (
        <div>

            <h2>💳 Bills</h2>
	    <input
    type="text"
    placeholder="🔍 Search by Patient ID"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
        marginBottom: "15px",
        padding: "8px",
        width: "250px"
    }}
/>
	    
            <table border="1" cellPadding="10">

                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Patient ID</th>
                        <th>Appointment ID</th>
                        <th>Amount</th>
                        <th>Status</th>
			<th>Action</th>  
                  </tr>
                </thead>

                <tbody>

                    {bills
.filter((bill) =>
    bill.patient_id
        .toString()
        .includes(search)
)
.map((bill) => (
                        <tr key={bill.id}>
                            <td>{bill.id}</td>
                            <td>{bill.patient_id}</td>
                            <td>{bill.appointment_id}</td>
                            <td>{bill.amount}</td>
                            <td>{bill.payment_status}</td>
                            <td>

    <button
	className="edit-btn"
        onClick={() => setEditBill(bill)}
    >
        Edit
    </button>

    <button
	className="delete-btn"
        onClick={() => deleteBill(bill.id)}
    >
        Delete
    </button>
    <button
    onClick={() => setPrintBill(bill)}
>
    Print
</button>

</td>

			</tr>
                    ))}

                </tbody>

            </table>

		{printBill && (
    <div 
  className="print-bill"

  style={{
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ccc",
    width: "350px",
    background: "white"
}}>

        <h2>🏥 Hospital Management System</h2>
	<h3>Invoice</h3>

        <p>Bill ID: {printBill.id}</p>
        <p>Patient ID: {printBill.patient_id}</p>
        <p>Appointment ID: {printBill.appointment_id}</p>
        <p>Amount: ₹{printBill.amount}</p>
        <p>Status: {printBill.payment_status}</p>

		<button onClick={downloadPDF}>
    Download PDF
</button>
    </div>
)}

		{editBill && (
    <div>

        <h2>Edit Bill</h2>

        <input
            value={editBill.patient_id}
            onChange={(e) =>
                setEditBill({
                    ...editBill,
                    patient_id: e.target.value
                })
            }
        />

        <input
            value={editBill.appointment_id}
            onChange={(e) =>
                setEditBill({
                    ...editBill,
                    appointment_id: e.target.value
                })
            }
        />

        <input
            value={editBill.amount}
            onChange={(e) =>
                setEditBill({
                    ...editBill,
                    amount: e.target.value
                })
            }
        />

        <input
            value={editBill.payment_status}
            onChange={(e) =>
                setEditBill({
                    ...editBill,
                    payment_status: e.target.value
                })
            }
        />

        <button onClick={updateBill}>
            Update Bill
        </button>

    </div>
)}

        </div>
    );
}

export default Bills;
