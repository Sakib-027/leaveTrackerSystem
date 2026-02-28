import { useEffect, useState } from "react";
import ApplyLeave from "../components/employee/ApplyLeave";
import MyLeaves from "../components/employee/MyLeaves";
import api from "../services/api";

const EmployeeDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [employee, setEmployee] = useState(null);
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    if (!user) return;

    api.get(`/employees/${user.id}`)
      .then(res => setEmployee(res.data));

  }, [user]);

  if (!employee) return null;

  const usedLeaves = employee.totalLeave - employee.remainingLeave;

  return (
    <div
      className="container-fluid"
      style={{
        height: "calc(100vh - 64px)",
        paddingTop: "8px",
        overflow: "hidden"
      }}
    >

      {/* SUMMARY CARDS */}
      <div className="row g-2 mb-2">
        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body p-1">
              <small>Total</small>
              <h6 className="fw-bold mb-0">{employee.totalLeave}</h6>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body p-1">
              <small>Remaining</small>
              <h6 className="fw-bold text-success mb-0">
                {employee.remainingLeave}
              </h6>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center">
            <div className="card-body p-1">
              <small>Used</small>
              <h6 className="fw-bold text-danger mb-0">
                {usedLeaves}
              </h6>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="row g-2" style={{ height: "calc(100% - 60px)" }}>
        <div className="col-md-4 h-100">
          <div className="card h-100">
            <div className="card-header py-1 fw-semibold">
              Apply Leave
            </div>
            <div className="card-body p-1">
              <ApplyLeave
                userId={user.id}
                onLeaveApplied={() => setLeaves([])}
              />

            </div>
          </div>
        </div>

        <div className="col-md-8 h-100">
          <div className="card h-100">
            <div className="card-header py-1 fw-semibold">
              My Leaves
            </div>
            <div className="card-body p-1">

              {/* ✅ THIS IS THE FIX */}
              <MyLeaves
                userId={user.id}
                onLeavesLoaded={setLeaves}
              />

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EmployeeDashboard;
