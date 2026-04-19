import { useState, useEffect } from "react";
import { useCountUp } from "../hooks/useCountUp";
import { useToast } from "../components/ToastContext";
import { formatPKR } from "../utils/formatPKR";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function WalletPage() {
  const [wallet, setWallet] = useState(null);
  const [depositAmt, setDepositAmt] = useState("");
  const [withdrawAmt, setWithdrawAmt] = useState("");
  const [loading, setLoading] = useState(true);
  const [cardPulse, setCardPulse] = useState("");
  const { showToast } = useToast();

  const displayBalance = useCountUp(wallet?.balance || 0);

  useEffect(() => {
    fetchWallet();
  }, []);

  async function fetchWallet() {
    try {
      const res = await fetch(`${API}/api/wallet`);
      const data = await res.json();
      setWallet(data);
    } catch {
      showToast("Failed to load wallet", "error");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeposit(e) {
    e.preventDefault();
    const amount = parseFloat(depositAmt);
    if (!amount || amount <= 0) return showToast("Enter a valid amount", "error");

    try {
      const res = await fetch(`${API}/api/wallet/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok) return showToast(data.error, "error");
      setWallet(data.wallet);
      setDepositAmt("");
      setCardPulse("pulse-green");
      setTimeout(() => setCardPulse(""), 600);
      showToast(`Deposited ${formatPKR(amount)} successfully!`, "success");
    } catch {
      showToast("Deposit failed", "error");
    }
  }

  async function handleWithdraw(e) {
    e.preventDefault();
    const amount = parseFloat(withdrawAmt);
    if (!amount || amount <= 0) return showToast("Enter a valid amount", "error");

    try {
      const res = await fetch(`${API}/api/wallet/withdraw`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCardPulse("shake");
        setTimeout(() => setCardPulse(""), 600);
        return showToast(data.error, "error");
      }
      setWallet(data.wallet);
      setWithdrawAmt("");
      setCardPulse("pulse-red");
      setTimeout(() => setCardPulse(""), 600);
      showToast(`Withdrawn ${formatPKR(amount)} successfully!`, "success");
    } catch {
      showToast("Withdrawal failed", "error");
    }
  }

  if (loading) {
    return (
      <div className="page">
        <div className="skeleton skeleton-card"></div>
        <div className="skeleton skeleton-form"></div>
      </div>
    );
  }

  return (
    <div className="page">
      <h1 className="page-title">My Wallet</h1>

      <div className={`balance-card ${cardPulse}`}>
        <p className="balance-label">Current Balance</p>
        <h2 className="balance-amount">{formatPKR(displayBalance)}</h2>
        <p className="balance-owner">{wallet?.owner} &bull; {wallet?.currency}</p>
      </div>

      <div className="forms-row">
        <form className="card form-card" onSubmit={handleDeposit}>
          <h3>💰 Deposit</h3>
          <input
            type="number"
            className="input"
            placeholder="Enter amount (PKR)"
            value={depositAmt}
            onChange={(e) => setDepositAmt(e.target.value)}
            min="1"
          />
          <button type="submit" className="btn btn-success">Deposit</button>
        </form>

        <form className="card form-card" onSubmit={handleWithdraw}>
          <h3>💸 Withdraw</h3>
          <input
            type="number"
            className="input"
            placeholder="Enter amount (PKR)"
            value={withdrawAmt}
            onChange={(e) => setWithdrawAmt(e.target.value)}
            min="1"
          />
          <button type="submit" className="btn btn-danger">Withdraw</button>
        </form>
      </div>
    </div>
  );
}
