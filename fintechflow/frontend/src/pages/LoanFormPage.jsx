import { useState } from "react";
import { useToast } from "../components/ToastContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

const INITIAL = {
  applicant: "",
  cnic: "",
  contact: "",
  amount: "",
  purpose: "Business",
  tenure: "",
};

export default function LoanFormPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submittedLoan, setSubmittedLoan] = useState(null);
  const { showToast } = useToast();

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  }

  function validateStep1() {
    const errs = {};
    if (!form.applicant.trim()) errs.applicant = "Name is required";
    if (!/^\d{5}-\d{7}-\d$/.test(form.cnic)) errs.cnic = "CNIC must be in format XXXXX-XXXXXXX-X";
    if (!form.contact.trim()) errs.contact = "Contact number is required";
    return errs;
  }

  function validateStep2() {
    const errs = {};
    const amt = parseFloat(form.amount);
    const ten = parseInt(form.tenure);
    if (!form.amount || isNaN(amt) || amt < 5000 || amt > 5000000)
      errs.amount = "Amount must be between PKR 5,000 and PKR 5,000,000";
    if (!form.tenure || isNaN(ten) || ten < 3 || ten > 60)
      errs.tenure = "Tenure must be between 3 and 60 months";
    return errs;
  }

  function handleNext() {
    const errs = step === 1 ? validateStep1() : validateStep2();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStep((s) => s + 1);
  }

  async function handleSubmit() {
    try {
      const res = await fetch(`${API}/api/loans/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicant: form.applicant,
          amount: parseFloat(form.amount),
          purpose: form.purpose,
          tenure: parseInt(form.tenure),
        }),
      });
      const data = await res.json();
      if (!res.ok) return showToast(data.error, "error");
      setSubmittedLoan(data.loan);
      showToast("Loan application submitted!", "success");
    } catch {
      showToast("Submission failed", "error");
    }
  }

  if (submittedLoan) {
    return (
      <div className="page center-page">
        <div className="success-screen card">
          <div className="success-icon">✅</div>
          <h2>Application Submitted!</h2>
          <p>Your Loan ID is <strong>#{submittedLoan.id}</strong></p>
          <p>Status: <span className="badge badge-pending">Pending</span></p>
          <button className="btn btn-primary" onClick={() => { setSubmittedLoan(null); setForm(INITIAL); setStep(1); }}>
            Apply Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">Loan Application</h1>

      {/* Progress bar */}
      <div className="progress-bar-wrap">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`progress-step ${step >= s ? "active" : ""}`}>
            <div className="step-circle">{s}</div>
            <span>{s === 1 ? "Personal Info" : s === 2 ? "Loan Details" : "Review"}</span>
          </div>
        ))}
        <div className="progress-line">
          <div className="progress-fill" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
        </div>
      </div>

      <div className="card form-card wide">

        {step === 1 && (
          <div className="step-content">
            <h3>Step 1 — Personal Information</h3>
            <div className="form-group">
              <label>Full Name</label>
              <input className="input" value={form.applicant} onChange={(e) => update("applicant", e.target.value)} placeholder="Ali Raza" />
              {errors.applicant && <span className="field-error">{errors.applicant}</span>}
            </div>
            <div className="form-group">
              <label>CNIC</label>
              <input className="input" value={form.cnic} onChange={(e) => update("cnic", e.target.value)} placeholder="XXXXX-XXXXXXX-X" />
              {errors.cnic && <span className="field-error">{errors.cnic}</span>}
            </div>
            <div className="form-group">
              <label>Contact Number</label>
              <input className="input" value={form.contact} onChange={(e) => update("contact", e.target.value)} placeholder="03001234567" />
              {errors.contact && <span className="field-error">{errors.contact}</span>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h3>Step 2 — Loan Details</h3>
            <div className="form-group">
              <label>Loan Amount (PKR)</label>
              <input className="input" type="number" value={form.amount} onChange={(e) => update("amount", e.target.value)} placeholder="e.g. 100000" />
              {errors.amount && <span className="field-error">{errors.amount}</span>}
            </div>
            <div className="form-group">
              <label>Purpose</label>
              <select className="input" value={form.purpose} onChange={(e) => update("purpose", e.target.value)}>
                {["Business", "Education", "Medical", "Personal"].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Tenure (months)</label>
              <input className="input" type="number" value={form.tenure} onChange={(e) => update("tenure", e.target.value)} placeholder="3 to 60" />
              {errors.tenure && <span className="field-error">{errors.tenure}</span>}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h3>Step 3 — Review & Submit</h3>
            <div className="review-grid">
              <div><span>Name</span><strong>{form.applicant}</strong></div>
              <div><span>CNIC</span><strong>{form.cnic}</strong></div>
              <div><span>Contact</span><strong>{form.contact}</strong></div>
              <div><span>Amount</span><strong>PKR {parseFloat(form.amount).toLocaleString()}</strong></div>
              <div><span>Purpose</span><strong>{form.purpose}</strong></div>
              <div><span>Tenure</span><strong>{form.tenure} months</strong></div>
            </div>
          </div>
        )}

        <div className="step-actions">
          {step > 1 && (
            <button className="btn btn-outline" onClick={() => setStep((s) => s - 1)}>← Back</button>
          )}
          {step < 3 ? (
            <button className="btn btn-primary" onClick={handleNext}>Next →</button>
          ) : (
            <button className="btn btn-success" onClick={handleSubmit}>Submit Application</button>
          )}
        </div>
      </div>
    </div>
  );
}
