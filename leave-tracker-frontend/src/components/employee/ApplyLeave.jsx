import { useState } from "react";
import api from "../../services/api";

function ApplyLeave({ userId, onLeaveApplied }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const leaveRequest = {
      employee: { id: userId },
      startDate,
      endDate,
      reason
    };

    try {
      await api.post("/leaves", leaveRequest);
      setMessage("Leave request submitted successfully ✅");

      setStartDate("");
      setEndDate("");
      setReason("");

      onLeaveApplied && onLeaveApplied(); // 🔥 refresh leaves
    } catch (error) {
      setMessage("Failed to submit leave request ❌");
    }
  };

  return (
    <>
      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label className="form-label">Start Date</label>
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">End Date</label>
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label className="form-label">Reason</label>
          <textarea
            className="form-control"
            rows="2"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary w-100">
          Submit Leave Request
        </button>
      </form>
    </>
  );
}

export default ApplyLeave;
