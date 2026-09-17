function Navbar({ email, role, onLogout }) {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <div className="navbar-logo">SR</div>

                <div>
                    <strong>Smart Recruitment</strong>
                    <span>Talent Matching Platform</span>
                </div>
            </div>

            <div className="navbar-user">
                <div className="user-info">
                    <span className="user-email">{email}</span>
                    <span className="user-role">{role}</span>
                </div>

                <button className="logout-button" onClick={onLogout}>
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;