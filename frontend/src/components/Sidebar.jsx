function Sidebar() {

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    return (
        <div className="sidebar-menu">

            <h2>🏥 HMS</h2>

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
