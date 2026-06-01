<div align="center">

# 💳 FintechFlow
### *A Modern Fintech Web Application — Wallets, Loans & EMI Calculator*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-ISC-blue?style=for-the-badge)](LICENSE)

<br/>

> **Manage your money. Apply for loans. Calculate EMIs.**
>
> A full-stack fintech dashboard built with React 19 + Express.js, featuring a digital wallet,
> transaction history, multi-step loan applications, loan management, and an EMI calculator
> with full amortization breakdown — all in PKR.

<br/>

[✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [🗺️ API Reference](#️-api-reference) • [📁 Structure](#-project-structure) • [📬 Contact](#-contact)

</div>

---

## 📖 Overview

**FintechFlow** is a pixel-polished fintech dashboard that simulates a real-world financial management system. It covers the full fintech lifecycle: fund your wallet, withdraw money, track every transaction, apply for a loan through a guided multi-step form, manage loan statuses with an interactive flip-card UI, and calculate monthly EMIs with a complete month-by-month amortization table.

The project is split into two independently runnable apps:

```
fintech-flow/
├── 🖥️  backend/   — Express.js REST API (Node.js, in-memory store)
└── 🎨  frontend/  — React 19 SPA (Vite, React Router, custom CSS)
```

---

## ✨ Features

### 💰 Wallet
The financial command centre — deposit, withdraw, and track your balance in real time.

| Feature | Description |
|---|---|
| 📊 **Live Balance Card** | Animated count-up number that rolls to your current balance on load |
| 💚 **Deposit** | Add funds with instant balance update and green pulse animation on the card |
| 🔴 **Withdraw** | Withdraw funds with insufficient-balance protection and shake animation on error |
| 🧾 **PKR Formatting** | All amounts formatted using `Intl.NumberFormat` for proper Pakistani Rupee display |
| 💀 **Skeleton Loading** | Placeholder skeleton cards shown while API data is loading |

---

### 📜 Transaction History
Every credit and debit — searchable, filterable, and summarised.

| Feature | Description |
|---|---|
| ⬆️⬇️ **Credit/Debit Entries** | Each transaction shows type icon, description, timestamp, amount, and badge |
| 🔍 **Live Search** | Filter transactions by description in real time as you type |
| 🏷️ **Type Filter** | One-click filter buttons: All / Credit / Debit |
| 📊 **Summary Bar** | Shows total credits, total debits, and net balance for the current filter |
| ✨ **Staggered Animations** | Each transaction card fades in with a cascading delay |

---

### 📋 Loan Application — Multi-Step Form
A guided 3-step wizard to apply for a loan, with per-step validation and a review screen.

```
Step 1 — Personal Info      Step 2 — Loan Details      Step 3 — Review & Submit
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│ ● Full Name         │ ──▶ │ ● Loan Amount (PKR) │ ──▶ │ Review all fields   │
│ ● CNIC (validated)  │     │ ● Purpose (dropdown)│     │ Confirm & Submit    │
│ ● Contact Number    │     │ ● Tenure (3–60 mo.) │     │                     │
└─────────────────────┘     └─────────────────────┘     └─────────────────────┘
```

| Feature | Description |
|---|---|
| 🧭 **Progress Bar** | Visual 3-step progress indicator with active step highlighting |
| ✅ **Per-Step Validation** | Errors shown inline — CNIC format, amount range (5K–5M), tenure (3–60 months) |
| 📝 **Review Screen** | Full summary grid before final submission |
| 🎉 **Success Screen** | Confirmation screen with assigned Loan ID and pending status badge |
| 🔄 **Apply Another** | Reset form and start a fresh application after submission |

**Loan purposes supported:** Business, Education, Medical, Personal

---

### 🃏 Loan Status — Flip Card Management
View all loan applications with animated flip cards for approval/rejection.

| Feature | Description |
|---|---|
| 🔄 **Flip Cards** | Hover any card to flip it and reveal management actions |
| ✅❌ **Approve / Reject** | One-click status update with API call and optimistic UI update |
| 📊 **Stats Row** | Animated count-up boxes showing Pending / Approved / Rejected counts |
| 🔽 **Sort Controls** | Sort by Default, Amount High→Low, Amount Low→High, or Status |
| 💀 **Skeleton Loading** | Grid of skeleton cards while loans are loading |

---

### 🧮 EMI Calculator
Calculate monthly repayments and see a complete amortization breakdown.

| Feature | Description |
|---|---|
| 📐 **EMI Formula** | `EMI = P × r × (1+r)^n / ((1+r)^n - 1)` computed server-side |
| 🎯 **3 Stat Cards** | Animated count-up cards for Monthly EMI, Total Payable, Total Interest |
| 📊 **Visual Breakdown Bar** | CSS percentage bar showing Principal % vs Interest % split |
| 📅 **Amortization Table** | Full month-by-month table: Principal paid, Interest paid, Remaining balance |
| ✨ **Fade-in Rows** | Each table row fades in sequentially for a polished feel |

---

### 🎨 UI & UX Polish

| Feature | Description |
|---|---|
| 🌙☀️ **Dark / Light Mode** | Toggle in the navbar — preference saved to `localStorage` |
| 🔔 **Toast Notifications** | Global toast system via React Context — success (green) and error (red) |
| 💀 **Skeleton Screens** | All data-fetching pages show skeleton placeholders while loading |
| 🔢 **Count-Up Hook** | `useCountUp` custom hook — numbers animate from 0 to target on mount |
| 💱 **PKR Formatting** | `formatPKR` utility — consistent Pakistani Rupee formatting everywhere |
| 📱 **Responsive Design** | Adapts to mobile and tablet viewports |

---

## 📦 Tech Stack

### Frontend

| Technology | Version | Purpose |
|---|---|---|
| ⚛️ React | 19.2 | UI framework |
| ⚡ Vite | 8.0 | Build tool & dev server |
| 🧭 React Router DOM | 7.14 | Client-side routing |
| 🎨 Custom CSS | — | All styling (no CSS framework) |
| 🔔 React Context | — | Global toast notification system |
| 🔢 useCountUp | — | Custom hook for animated numbers |
| 💱 formatPKR | — | Intl.NumberFormat PKR utility |

### Backend

| Technology | Version | Purpose |
|---|---|---|
| 🟢 Node.js | 18+ | Runtime |
| 🚂 Express.js | 5.2 | REST API framework |
| 🌐 CORS | 2.8 | Cross-origin resource sharing |
| 🗃️ In-Memory Store | — | `store.js` — no database needed |

---

## 🗺️ API Reference

Base URL: `http://localhost:5000`

### 💰 Wallet

| Method | Endpoint | Description | Body |
|---|---|---|---|
| `GET` | `/api/wallet` | Get current wallet balance and owner | — |
| `POST` | `/api/wallet/deposit` | Deposit funds | `{ amount: number }` |
| `POST` | `/api/wallet/withdraw` | Withdraw funds (balance check) | `{ amount: number }` |

**Wallet Response:**
```json
{
  "owner": "Ali Raza",
  "balance": 50000,
  "currency": "PKR"
}
```

---

### 📜 Transactions

| Method | Endpoint | Description | Query |
|---|---|---|---|
| `GET` | `/api/transactions` | Get all transactions | `?type=credit` or `?type=debit` |

**Transaction Object:**
```json
{
  "id": 1,
  "type": "credit",
  "amount": 50000,
  "description": "Deposit of PKR 50000",
  "timestamp": "2026-04-19T16:00:00.000Z"
}
```

---

### 📋 Loans

| Method | Endpoint | Description | Body |
|---|---|---|---|
| `POST` | `/api/loans/apply` | Submit a new loan application | `{ applicant, amount, purpose, tenure }` |
| `GET` | `/api/loans` | Get all loan applications | — |
| `PATCH` | `/api/loans/:id/status` | Approve or reject a loan | `{ status: "approved" \| "rejected" }` |

**Loan Object:**
```json
{
  "id": 1,
  "applicant": "Ali Raza",
  "amount": 100000,
  "purpose": "Business",
  "tenure": 12,
  "status": "pending",
  "appliedAt": "2026-04-19T16:00:00.000Z"
}
```

---

### 🧮 EMI Calculator

| Method | Endpoint | Description | Query Params |
|---|---|---|---|
| `GET` | `/api/emi-calculator` | Calculate EMI | `?principal=100000&annualRate=12&months=12` |

**Response:**
```json
{
  "emi": 8884.88,
  "totalPayable": 106618.56,
  "totalInterest": 6618.56
}
```

**EMI Formula:**
```
EMI = P × r × (1 + r)^n
      ─────────────────
         (1 + r)^n - 1

Where:
  P = Principal amount
  r = Monthly interest rate (annual rate / 12 / 100)
  n = Number of months
```

---

## 📁 Project Structure

```
fintech-flow-main/
└── fintechflow/
    │
    ├── 🖥️ backend/
    │   ├── server.js              # Express app — routes, CORS, EMI endpoint
    │   ├── package.json           # Node dependencies (express, cors)
    │   ├── data/
    │   │   └── store.js           # In-memory wallet, transactions & loans store
    │   └── routes/
    │       ├── wallet.js          # GET /api/wallet, POST /deposit, POST /withdraw
    │       └── loans.js           # POST /apply, GET /, PATCH /:id/status
    │
    └── 🎨 frontend/
        ├── index.html             # HTML entry point
        ├── vite.config.js         # Vite config with React plugin
        ├── package.json           # React 19, React Router, Vite
        └── src/
            ├── App.jsx            # Root — BrowserRouter, dark mode, ToastProvider
            ├── main.jsx           # React DOM entry point
            ├── index.css          # All custom styles (dark mode, animations, cards)
            │
            ├── components/
            │   ├── Navbar.jsx         # Top nav with NavLinks and dark mode toggle
            │   └── ToastContext.jsx   # Global toast system via React Context
            │
            ├── hooks/
            │   └── useCountUp.js      # Animated number count-up custom hook
            │
            ├── utils/
            │   └── formatPKR.js       # PKR currency formatter (Intl.NumberFormat)
            │
            └── pages/
                ├── WalletPage.jsx         # Balance card, deposit & withdraw forms
                ├── TransactionsPage.jsx   # Transaction list, search, filter, summary
                ├── LoanFormPage.jsx       # 3-step loan application wizard
                ├── LoanStatusPage.jsx     # Flip-card loan management dashboard
                └── EMIPage.jsx            # EMI calculator + amortization table
```

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### 1. Clone the Repository

```bash
git clone https://github.com/muhafzaala/your-repo-name.git
cd fintech-flow-main/fintechflow
```

### 2. Start the Backend

```bash
cd backend
npm install
npm start
# API running at http://localhost:5000
```

### 3. Start the Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
# App running at http://localhost:5173
```

### 4. Configure the API URL (Optional)

By default the frontend points to `http://localhost:5000`. To use a different backend URL, create a `.env` file in the `frontend/` folder:

```env
VITE_API_URL=http://your-backend-url.com
```

---

## 📜 Available Scripts

### Backend

| Command | Description |
|---|---|
| `npm start` | Start the Express server |
| `npm run dev` | Same as start (no nodemon configured) |

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server with HMR |
| `npm run build` | Production build → `dist/` folder |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint across all JSX/JS files |

---

## 🗄️ Data Store

The backend uses an **in-memory JavaScript store** (`backend/data/store.js`) — no database setup required. Data resets on every server restart.

**Initial State:**
```js
wallet  = { owner: "Ali Raza", balance: 50000, currency: "PKR" }
transactions = [{ id: 1, type: "credit", amount: 50000, description: "Initial deposit" }]
loans   = []
```

**Store Functions:**

| Function | Description |
|---|---|
| `getWallet()` | Returns current wallet object |
| `updateBalance(amount)` | Adds amount to balance (negative for withdrawals) |
| `addTransaction(type, amount, desc)` | Prepends new transaction (newest first) |
| `getTransactions()` | Returns all transactions |
| `addLoan(loanData)` | Creates loan with auto-incremented ID and `pending` status |
| `getLoans()` | Returns all loan applications |
| `updateLoanStatus(id, status)` | Updates a loan's status to `approved` or `rejected` |

---

## 🚢 Deployment

### Frontend — Vercel / Netlify

```bash
cd frontend
npm run build
# Deploy the dist/ folder
```

Set environment variable:
```
VITE_API_URL=https://your-backend-url.com
```

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

### Backend — Railway / Render

1. Connect your GitHub repo
2. Set root directory to `fintechflow/backend`
3. Start command: `npm start`
4. Port: `5000` (or set via `PORT` environment variable)

---

## 🔮 Potential Enhancements

- 🗄️ Replace in-memory store with MongoDB or PostgreSQL
- 🔐 Add user authentication (JWT)
- 📊 Add charts for transaction history (Recharts / Chart.js)
- 📧 Email notifications on loan status change
- 📱 React Native mobile version
- 🏦 Multiple wallet support
- 📤 Export transactions as CSV / PDF

---

## 📬 Contact

<div align="center">

Built by **Muhammad Afzaal Asghar**

[![Email](https://img.shields.io/badge/Email-mafzaala333%40gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:mafzaala333@gmail.com)
[![GitHub](https://img.shields.io/badge/GitHub-muhafzaala-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/muhafzaala)

<br/>

Got a question or found a bug? Open an [issue](https://github.com/muhafzaala/fintech-flow/issues) or email **mafzaala333@gmail.com**

</div>

---

<div align="center">

### ⭐ Found this useful? Give it a star!

*Built with React 19, Express.js, and a passion for clean fintech UI.*

</div>
