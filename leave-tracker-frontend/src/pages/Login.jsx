import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.role === "MANAGER") {
        navigate("/manager");
      } else {
        navigate("/employee");
      }
    }
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      // save user in localStorage
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);

      // redirect based on role
      if (response.data.role === "MANAGER") {
        navigate("/manager");
      } else {
        navigate("/employee");
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
     <div className="d-flex flex-column min-vh-100">

  {/* LOGIN SECTION */}
  <div className="container flex-grow-1 d-flex align-items-center">
    <div className="row w-100 align-items-center">

      {/* LEFT SIDE – BRANDING */}
      <div className="col-md-6 mb-4 mb-md-0">
        <h1 className="fw-bold mb-3">Welcome 👋</h1>
        <p className="text-muted fs-5">
          Login to manage your leave requests efficiently.
          Employees can apply for leave, and managers can review
          and take actions — all in one place.
        </p>
      </div>

      {/* RIGHT SIDE – LOGIN CARD */}
      <div className="col-md-5 offset-md-1">
        <div className="card shadow-lg p-4 border-0">
          <h4 className="text-center mb-4">Login to Continue</h4>

          {error && (
            <div className="alert alert-danger text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button className="btn btn-primary w-100 mt-3">
              Login
            </button>
          </form>
        </div>
      </div>

    </div>
  </div>

  {/* FOOTER */}
  <footer className="bg-dark text-light text-center py-3">
    © 2026 Leave Tracker | Secure Employee Leave Management | Sakib
  </footer>

</div>


  );
};

export default Login;
