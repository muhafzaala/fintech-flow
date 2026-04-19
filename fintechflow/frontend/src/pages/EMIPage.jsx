import { useState } from "react";
import { useToast } from "../components/ToastContext";
import { useCountUp } from "../hooks/useCountUp";
import { formatPKR } from "../utils/formatPKR";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function StatCard({ label, value }) {
  const count = useCountUp(Math.round(value));
  return (
    <div className="emi-stat card">
      <p className="emi-stat-label">{label}</p>
      <p className="emi-stat-value">{formatPKR(count)}</p>
    </div>
  );
}

export default function EMIPage() {
  const [form, setForm] = useState({ principal: "", annualRate: "", months: "" });
  const [result, setResult] = useState(null);
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function calculate() {
    const { principal, annualRate, months } = form;
    if (!principal || !annualRate || !months) {
      return showToast("All fields are required", "error");
    }

    setLoading(true);
    try {
      const url = `${API}/api/emi-calculator?principal=${principal}&annualRate=${annualRate}&months=${months}`;
      const res = await fetch(url);
      const data = await res.json();
      if (!res.ok) return showToast(data.error, "error");

      setResult(data);

      // Build amortization table on frontend using server-returned EMI
      const r = parseFloat(annualRate) / 100 / 12;
      const emi = data.emi;
      let balance = parseFloat(principal);
      const rows = [];

      for (let m = 1; m <= parseInt(months); m++) {
        const interest = parseFloat((balance * r).toFixed(2));
        const principalPart = parseFloat((emi - interest).toFixed(2));
        balance = parseFloat((balance - principalPart).toFixed(2));
        rows.push({ month: m, principal: principalPart, interest, balance: Math.max(0, balance) });
      }
      setTable(rows);
    } catch {
      showToast("Calculation failed", "error");
    } finally {
      setLoading(false);
    }
  }

  const principalPct = result
    ? ((parseFloat(form.principal) / result.totalPayable) * 100).toFixed(1)
    : 0;

  return (
    <div className="page">
      <h1 className="page-title">EMI Calculator</h1>

      <div className="card form-card wide">
        <div className="emi-inputs">
          <div className="form-group">
            <label>Principal (PKR)</label>
            <input className="input" type="number" value={form.principal} onChange={(e) => update("principal", e.target.value)} placeholder="e.g. 100000" />
          </div>
          <div className="form-group">
            <label>Annual Interest Rate (%)</label>
            <input className="input" type="number" value={form.annualRate} onChange={(e) => update("annualRate", e.target.value)} placeholder="e.g. 12" />
          </div>
          <div className="form-group">
            <label>Tenure (months)</label>
            <input className="input" type="number" value={form.months} onChange={(e) => update("months", e.target.value)} placeholder="e.g. 12" />
          </div>
        </div>
        <button className="btn btn-primary" onClick={calculate} disabled={loading}>
          {loading ? "Calculating..." : "Calculate EMI"}
        </button>
      </div>

      {result && (
        <>
          <div className="emi-stats-row">
            <StatCard label="Monthly EMI" value={result.emi} />
            <StatCard label="Total Payable" value={result.totalPayable} />
            <StatCard label="Total Interest" value={result.totalInterest} />
          </div>

          {/* Principal vs Interest bar */}
          <div className="card breakdown-bar-card">
            <h3>Principal vs Interest Breakdown</h3>
            <div className="breakdown-bar">
              <div className="bar-principal" style={{ width: `${principalPct}%` }}>
                Principal {principalPct}%
              </div>
              <div className="bar-interest" style={{ width: `${100 - principalPct}%` }}>
                Interest {(100 - parseFloat(principalPct)).toFixed(1)}%
              </div>
            </div>
          </div>

          {/* Amortization table */}
          <div className="card">
            <h3>Monthly Breakdown</h3>
            <div className="table-wrap">
              <table className="amort-table">
                <thead>
                  <tr>
                    <th>Month</th>
                    <th>Principal (PKR)</th>
                    <th>Interest (PKR)</th>
                    <th>Remaining Balance (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {table.map((row) => (
                    <tr key={row.month} className="fade-in-row">
                      <td>{row.month}</td>
                      <td>{formatPKR(row.principal)}</td>
                      <td>{formatPKR(row.interest)}</td>
                      <td>{formatPKR(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
