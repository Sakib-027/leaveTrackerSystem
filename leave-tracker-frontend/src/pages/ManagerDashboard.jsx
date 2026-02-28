import { useEffect, useState } from "react";
import ManageLeaves from "../components/manager/ManageLeaves";
import api from "../services/api";

const ManagerDashboard = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    api.get("/leaves")
      .then(res => setLeaves(res.data));
  }, []);

  const total = leaves.length;
  const pending = leaves.filter(l => l.status === "PENDING").length;
  const approved = leaves.filter(l => l.status === "APPROVED").length;
  const rejected = leaves.filter(l => l.status === "REJECTED").length;

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
        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body p-1">
              <small>Total</small>
              <h6 className="fw-bold mb-0">{total}</h6>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body p-1">
              <small>Pending</small>
              <h6 className="fw-bold text-warning mb-0">{pending}</h6>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body p-1">
              <small>Approved</small>
              <h6 className="fw-bold text-success mb-0">{approved}</h6>
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card text-center">
            <div className="card-body p-1">
              <small>Rejected</small>
              <h6 className="fw-bold text-danger mb-0">{rejected}</h6>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ height: "calc(100% - 60px)" }}>
        <ManageLeaves leaves={leaves} setLeaves={setLeaves} />
      </div>

    </div>
  );
};

export default ManagerDashboard;
