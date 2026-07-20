import API from "../services/api";
import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import Doctors from "./Doctors";
import AddDoctor from "./AddDoctor";
import Patients from "./Patients";
import AddPatient from "./AddPatient";
import AddAppointment from "./AddAppointment";
import Appointments from "./Appointments";
import AddPrescription from "./AddPrescription";
import Prescriptions from "./Prescriptions";
import AddBill from "./AddBill";
import Bills from "./Bills";
import "./Dashboard.css";
import Sidebar from "../components/Sidebar";

function Dashboard() {
const [stats, setStats] = useState({
    total_doctors: 0,
    total_patients: 0,
    total_appointments: 0,
    total_bills: 0
});

const chartData = [
    {
        name: "Doctors",
        value: stats.total_doctors
    },
    {
        name: "Patients",
        value: stats.total_patients
    },
    {
        name: "Appointments",
        value: stats.total_appointments
    },
    {
        name: "Bills",
        value: stats.total_bills
    }
];

useEffect(() => {

    fetch(`${API}/dashboard`)
    .then(res => res.json())
    .then(data => setStats(data));

}, []);
    return (
        <div className="dashboard">

            <div className="sidebar">
                <Sidebar />
            </div>

            <div className="content">

                <h1>🏥 Hospital Management Dashboard</h1>

                <h3>Welcome Admin</h3>

                <div className="cards">

                    <div className="card">
                        <h2>👨‍⚕️ Doctors</h2>
			<h3>{stats.total_doctors}</h3>
    
                    </div>

                    <div className="card">
                        <h2>🧑 Patients</h2>
			<h3>{stats.total_patients}</h3>
                        
                    </div>

                    <div className="card">
                        <h2>📅 Appointments</h2>
			<h3>{stats.total_appointments}</h3>
                        
                    </div>

                    <div className="card">
                        <h2>💳 Bills</h2>
			<h3>{stats.total_bills}</h3>
                        
                    </div>

                </div>

<div style={{
    width: "100%",
    height: "300px",
    marginTop: "30px"
}}>

    <h2>📊 Hospital Statistics</h2>

    <ResponsiveContainer>
        <BarChart data={chartData}>

            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            <Bar 
                dataKey="value"
            />

        </BarChart>
    </ResponsiveContainer>

</div>

		<hr />
		<AddDoctor />
		<hr />

		<AddPatient />		
		<hr />

		<AddAppointment />
		<hr />

		<Doctors />

		<hr />

		<Patients />

		<hr />
		<Appointments />

		<hr />

		<AddPrescription />

		<hr />

		<Prescriptions />

		<hr />

		<AddBill />

		<hr />

		<Bills />
	
            </div>

        </div>
    );
}

export default Dashboard;
