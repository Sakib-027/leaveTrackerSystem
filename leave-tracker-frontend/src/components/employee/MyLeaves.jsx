import { useEffect, useState } from "react";
import api from "../../services/api";

function MyLeaves({ userId, onLeavesLoaded }) {
  const [leaves, setLeaves] = useState([]);
  const [message, setMessage] = useState("");

  // 🔹 fetch leaves automatically for logged-in employee
  useEffect(() => {
    if (!userId) return;

    const fetchLeaves = async () => {
      try {
        const response = await api.get(`/leaves/employee/${userId}`);

        if (response.data.length === 0) {
          setMessage("No leave records found");
          setLeaves([]);
          onLeavesLoaded && onLeavesLoaded([]);
        } else {
          setLeaves(response.data);
          setMessage("");
          onLeavesLoaded && onLeavesLoaded(response.data);
        }
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong. Please try again.");
        setLeaves([]);
        onLeavesLoaded && onLeavesLoaded([]);
      }
    };

    fetchLeaves();
  }, [userId]);

  const getStatusBadge = (status) => {
    if (status === "APPROVED") return "badge bg-success";
    if (status === "REJECTED") return "badge bg-danger";
    return "badge bg-warning text-dark";
  };

  return (
    <>
      {message && <div className="alert alert-info">{message}</div>}

      {leaves.length > 0 && (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((leave) => (
                <tr key={leave.leaveId}>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>
                    <span className={getStatusBadge(leave.status)}>
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default MyLeaves;
