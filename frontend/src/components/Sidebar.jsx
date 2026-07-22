import { useEffect, useState } from "react";
function Sidebar() {

const [user, setUser] = useState(null);

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

            <div className="menu-item">
                👨‍⚕️ Doctors
            </div>

            <div className="menu-item">
                🧑 Patients
            </div>

            <div className="menu-item">
                📅 Appointments
            </div>

            <div className="menu-item">
                💊 Prescriptions
            </div>

            <div className="menu-item">
                💳 Billing
            </div>

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
