import { useEffect, useState } from "react";
import api from "../../services/api";

function ManageLeaves() {
  const [employeeId, setEmployeeId] = useState("");
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState("");

  const fetchAllLeaves = async () => {
  try {
    const response = await api.get("/leaves");

    if (employeeId) {
      const filtered = response.data.filter(
        (leave) => leave.employeeId === Number(employeeId)
      );
      setLeaves(filtered);
    } else {
      setLeaves(response.data);
    }

    setMessage("");
  } catch (error) {
    console.error(error);
    setMessage("Failed to load leave requests ❌");
  }
};


  useEffect(() => {
    fetchAllLeaves();
  }, []);

  const approveLeave = async (leaveId) => {
    try {
      await api.put(`/leaves/${leaveId}/approve`);
      setMessage("Leave approved ✅");
      fetchAllLeaves();
    } catch (error) {
      console.error(error);
      setMessage("Failed to approve leave ❌");
    }
  };

  const rejectLeave = async (leaveId) => {
    try {
      await api.put(`/leaves/${leaveId}/reject`);
      setMessage("Leave rejected ❌");
      fetchAllLeaves();
    } catch (error) {
      console.error(error);
      setMessage("Failed to reject leave ❌");
    }
  };

  const getStatusBadge = (status) => {
    if (status === "APPROVED") return "badge bg-success";
    if (status === "REJECTED") return "badge bg-danger";
    return "badge bg-warning text-dark";
  };

  return (
    <div className="card shadow p-4">
      <h4 className="mb-3">Manage Leave Requests</h4>

      {message && <div className="alert alert-info">{message}</div>}

      <div className="row mb-3">
  <div className="col-md-4">
    <input
      type="number"
      className="form-control"
      placeholder="Search by Employee ID"
      value={employeeId}
      onChange={(e) => setEmployeeId(e.target.value)}
    />
  </div>
  <div className="col-md-2">
    <button className="btn btn-primary w-100" onClick={fetchAllLeaves}>
      Search
    </button>
  </div>
  <div className="col-md-2">
    <button
      className="btn btn-secondary w-100"
      onClick={() => {
        setEmployeeId("");
        fetchAllLeaves();
      }}
    >
      Reset
    </button>
  </div>
</div>


      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark align-middle">
            <tr>
              <th className="text-center">Employee ID</th>
              <th className="text-center">Employee Name</th>
              <th className="text-center">Start Date</th>
              <th className="text-center">End Date</th>
              <th className="text-center">Reason</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave) => (
              <tr key={leave.leaveId}>
                <td>{leave.employeeId}</td>
                <td>{leave.employeeName}</td>
                <td className="text-nowrap">{leave.startDate}</td>
                <td className="text-nowrap">{leave.endDate}</td>
                <td>{leave.reason}</td>     
                <td className="text-center">
                  <span className={getStatusBadge(leave.status)}>
                    {leave.status}
                  </span>
                </td>
                <td>
                  {leave.status === "PENDING" ? (
                    <>
                    <div className="d-flex gap-2 justify-content-center">
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => approveLeave(leave.leaveId)}>Approve</button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rejectLeave(leave.leaveId)}>Reject</button>
                        </div>
                    </>
                  ) : (
                    <span className="text-muted">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManageLeaves;
