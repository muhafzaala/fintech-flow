import { useState, useEffect } from "react";
import { formatPKR } from "../utils/formatPKR";
import { useToast } from "../components/ToastContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    fetch(`${API}/api/transactions`)
      .then((r) => r.json())
      .then((data) => setTransactions(data))
      .catch(() => showToast("Failed to load transactions", "error"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = transactions
    .filter((t) => filter === "all" || t.type === filter)
    .filter((t) =>
      t.description.toLowerCase().includes(search.toLowerCase())
    );

  const totalCredits = filtered.filter((t) => t.type === "credit").reduce((s, t) => s + t.amount, 0);
  const totalDebits = filtered.filter((t) => t.type === "debit").reduce((s, t) => s + t.amount, 0);

  if (loading) {
    return (
      <div className="page">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="skeleton skeleton-row"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Transaction History</h1>

      <div className="summary-bar">
        <div className="summary-item">
          <span>Total Credits</span>
          <strong className="text-success">{formatPKR(totalCredits)}</strong>
        </div>
        <div className="summary-item">
          <span>Total Debits</span>
          <strong className="text-danger">{formatPKR(totalDebits)}</strong>
        </div>
        <div className="summary-item">
          <span>Net Balance</span>
          <strong>{formatPKR(totalCredits - totalDebits)}</strong>
        </div>
      </div>

      <div className="filters-row">
        <input
          className="input search-input"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="filter-btns">
          {["all", "credit", "debit"].map((f) => (
            <button
              key={f}
              className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-outline"}`}
              onClick={() => setFilter(f)}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="empty-msg">No transactions found.</p>
      ) : (
        <div className="tx-list">
          {filtered.map((tx, i) => (
            <div
              key={tx.id}
              className="tx-card card"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="tx-icon">
                {tx.type === "credit" ? "⬆️" : "⬇️"}
              </div>
              <div className="tx-info">
                <p className="tx-desc">{tx.description}</p>
                <p className="tx-time">{new Date(tx.timestamp).toLocaleString()}</p>
              </div>
              <div className="tx-right">
                <span className={`badge badge-${tx.type}`}>{tx.type}</span>
                <p className={`tx-amount ${tx.type === "credit" ? "text-success" : "text-danger"}`}>
                  {tx.type === "credit" ? "+" : "-"}{formatPKR(tx.amount)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
