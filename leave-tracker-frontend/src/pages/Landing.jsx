import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    navigate(user.role === "MANAGER" ? "/manager" : "/employee");
  }
}, [navigate]);

  return (
    <div className="d-flex flex-column min-vh-100">
        
      {/* HERO SECTION */}
      <div className="container flex-grow-1 d-flex align-items-center">
        <div className="row w-100 align-items-center">
          
          <div className="col-md-6">
            <h1 className="fw-bold mb-3">Apply and Manage Leaves</h1>
            <p className="text-muted fs-5">
              A simple and efficient system to manage employee leave requests.
              Employees can apply for leave, managers can review and approve
              requests — all in one place.
            </p>

            <button
              className="btn btn-primary btn-lg mt-3"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>

          <div className="col-md-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Leave Tracker"
              style={{ maxWidth: "70%" }}
            />
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bg-dark text-light text-center py-3">
        © 2026 Leave Tracker | Built by Sakib
      </footer>
    </div>
  );
};

export default Landing;
