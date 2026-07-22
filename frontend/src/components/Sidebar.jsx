import { useEffect, useState } from "react";
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

            <div className="menu-item">
                🏠 Dashboard
            </div>

{isAdmin && (
<div className="menu-item">
    👨‍⚕️ Doctors
</div>
)}
{isAdmin && (
<div className="menu-item">
    🧑 Patients
</div>
)}

{isAdmin && (
<div className="menu-item">
    📅 Appointments
</div>
)}

{isAdmin && (
<div className="menu-item">
    💊 Prescriptions
</div>
)}

{isAdmin && (
<div className="menu-item">
    💳 Billing
</div>
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
