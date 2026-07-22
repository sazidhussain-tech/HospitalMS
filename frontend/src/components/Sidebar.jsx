import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function Sidebar() {

const [user, setUser] = useState(null);
const isAdmin = user?.role === "admin";

useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
        setUser(JSON.parse(data));
    }
}, []);

const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
};
    return (
        <div className="sidebar-menu">

            <h2>🏥 HMS</h2>

		{user && (
    <div
        style={{
            textAlign: "center",
            marginBottom: "15px"
        }}
    >
        <h3>{user.full_name}</h3>
        <p>{user.role}</p>
    </div>
)}

            <hr />

<Link to="/dashboard" className="menu-item">
    🏠 Dashboard
</Link>

{isAdmin && (
<Link to="/doctors" className="menu-item">
    👨‍⚕️ Doctors
</Link>
)}

{isAdmin && (
<Link to="/patients" className="menu-item">
    🧑 Patients
</Link>
)}

{isAdmin && (
<Link to="/appointments" className="menu-item">
    📅 Appointments
</Link>
)}

{isAdmin && (
<Link to="/prescriptions" className="menu-item">
    💊 Prescriptions
</Link>
)}

{isAdmin && (
<Link to="/bills" className="menu-item">
    💳 Billing
</Link>
)}

            <hr />

            <div
                className="menu-item logout"
                onClick={logout}
            >
                🚪 Logout
            </div>

        </div>
    );
}

export default Sidebar;
