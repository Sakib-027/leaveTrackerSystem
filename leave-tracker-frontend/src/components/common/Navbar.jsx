import { NavLink, useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      {/* BRAND */}
      <span
        className="navbar-brand fw-bold"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        Leave Tracker
      </span>

      {/* ===== PUBLIC NAVBAR ===== */}
      {!user && !isLoginPage && (
        <div className="ms-auto">
          <button
            className="btn btn-outline-light btn-sm"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      )}

      {/* ===== PRIVATE NAVBAR ===== */}
      {user && (
        <>
          <ul className="navbar-nav me-auto ms-3">
            {user.role === "EMPLOYEE" && (
              <li className="nav-item">
                <NavLink to="/employee" className="nav-link">
                  Dashboard
                </NavLink>
              </li>
            )}

            {user.role === "MANAGER" && (
              <li className="nav-item">
                <NavLink to="/manager" className="nav-link">
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <span className="text-light small">
              {user.name} ({user.role})
            </span>

            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
