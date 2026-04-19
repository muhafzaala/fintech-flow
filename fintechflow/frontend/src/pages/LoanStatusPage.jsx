import { useState, useEffect } from "react";
import { useToast } from "../components/ToastContext";
import { useCountUp } from "../hooks/useCountUp";
import { formatPKR } from "../utils/formatPKR";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function StatBox({ label, value, color }) {
  const count = useCountUp(value);
  return (
    <div className="stat-box" style={{ borderColor: color }}>
      <span className="stat-num" style={{ color }}>{count}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}

function LoanCard({ loan, onStatusChange }) {
  const [flipped, setFlipped] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { showToast } = useToast();

  async function updateStatus(status) {
    setUpdating(true);
    try {
      const res = await fetch(`${API}/api/loans/${loan.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) return showToast(data.error, "error");
      onStatusChange(loan.id, status);
      setFlipped(false);
      showToast(`Loan #${loan.id} ${status}`, "success");
    } catch {
      showToast("Update failed", "error");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <div className="flip-container" onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}>
      <div className={`flip-card ${flipped ? "flipped" : ""}`}>
        {/* Front */}
        <div className="flip-front card">
          <div className="loan-card-header">
            <strong>#{loan.id} — {loan.applicant}</strong>
            <span className={`badge badge-${loan.status}`}>{loan.status}</span>
          </div>
          <p><span>Amount:</span> {formatPKR(loan.amount)}</p>
          <p><span>Purpose:</span> {loan.purpose}</p>
          <p><span>Tenure:</span> {loan.tenure} months</p>
          <p className="card-hint">Hover to manage →</p>
        </div>
        {/* Back */}
        <div className="flip-back card">
          <h4>Manage Loan #{loan.id}</h4>
          <p>{loan.applicant}</p>
          <p>{formatPKR(loan.amount)}</p>
          {loan.status === "pending" ? (
            <div className="action-btns">
              <button className="btn btn-success" disabled={updating} onClick={() => updateStatus("approved")}>
                ✅ Approve
              </button>
              <button className="btn btn-danger" disabled={updating} onClick={() => updateStatus("rejected")}>
                ❌ Reject
              </button>
            </div>
          ) : (
            <p className="already-done">Already {loan.status}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LoanStatusPage() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");
  const { showToast } = useToast();

  useEffect(() => {
    fetch(`${API}/api/loans`)
      .then((r) => r.json())
      .then(setLoans)
      .catch(() => showToast("Failed to load loans", "error"))
      .finally(() => setLoading(false));
  }, []);

  function handleStatusChange(id, newStatus) {
    setLoans((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
    );
  }

  const pending = loans.filter((l) => l.status === "pending").length;
  const approved = loans.filter((l) => l.status === "approved").length;
  const rejected = loans.filter((l) => l.status === "rejected").length;

  const sorted = [...loans].sort((a, b) => {
    if (sort === "amount-high") return b.amount - a.amount;
    if (sort === "amount-low") return a.amount - b.amount;
    if (sort === "status") return a.status.localeCompare(b.status);
    return 0;
  });

  if (loading) {
    return (
      <div className="page">
        <div className="loans-grid">
          {[...Array(3)].map((_, i) => <div key={i} className="skeleton skeleton-card"></div>)}
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Loan Status</h1>

      <div className="stats-row">
        <StatBox label="Pending" value={pending} color="#f59e0b" />
        <StatBox label="Approved" value={approved} color="#10b981" />
        <StatBox label="Rejected" value={rejected} color="#ef4444" />
      </div>

      <div className="sort-row">
        <label>Sort by: </label>
        <select className="input sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="default">Default</option>
          <option value="amount-high">Amount (High → Low)</option>
          <option value="amount-low">Amount (Low → High)</option>
          <option value="status">Status</option>
        </select>
      </div>

      {loans.length === 0 ? (
        <p className="empty-msg">No loan applications yet.</p>
      ) : (
        <div className="loans-grid">
          {sorted.map((loan) => (
            <LoanCard key={loan.id} loan={loan} onStatusChange={handleStatusChange} />
          ))}
        </div>
      )}
    </div>
  );
}
