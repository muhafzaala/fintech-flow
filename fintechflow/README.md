# FintechFlow — Personal Finance & Loan Manager

A full-stack web app built with React (Vite) and Node.js/Express.
Manage your wallet, apply for micro-loans, and calculate EMIs.

**Student:** [Your Name]  
**Roll No:** [Your Roll No]

---

## Tech Stack

- **Frontend:** React (Vite), React Router v6, plain CSS
- **Backend:** Node.js, Express.js, express.Router()
- **Storage:** In-memory (JavaScript arrays — no database)
- **Deploy:** Vercel (frontend) + Render (backend)

---

## How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/fintechflow.git
cd fintechflow
```

### 2. Run the Backend

```bash
cd backend
npm install
node server.js
# Runs on http://localhost:5000
```

### 3. Run the Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

> Make sure your `frontend/.env` has:
> ```
> VITE_API_URL=http://localhost:5000
> ```

---

## API Endpoint Table

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wallet` | Get wallet info (balance, owner, currency) |
| POST | `/api/wallet/deposit` | Deposit money `{ amount }` |
| POST | `/api/wallet/withdraw` | Withdraw money `{ amount }` |
| GET | `/api/transactions` | Get all transactions (optional `?type=credit\|debit`) |
| POST | `/api/loans/apply` | Apply for a loan `{ applicant, amount, purpose, tenure }` |
| GET | `/api/loans` | Get all loan applications |
| PATCH | `/api/loans/:id/status` | Update loan status `{ status: "approved"\|"rejected" }` |
| GET | `/api/emi-calculator` | Compute EMI `?principal=&annualRate=&months=` |

---

## Deployment

- **Frontend:** [https://fintechflow.vercel.app](https://fintechflow.vercel.app)
- **Backend:** [https://fintechflow-api.onrender.com](https://fintechflow-api.onrender.com)

---

## Features

- Wallet with deposit/withdraw and animated balance counter
- Transaction history with live search and filter
- 3-step loan application form with CNIC validation
- Loan status management with flip cards (hover to Approve/Reject)
- EMI calculator (computed on backend) with full amortization table
- Dark/Light mode toggle (saved in localStorage)
- Toast notification system (no external library)
- Skeleton loaders for all API calls
- Fully responsive (mobile, tablet, desktop)
