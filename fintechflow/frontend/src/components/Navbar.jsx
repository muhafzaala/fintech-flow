import { NavLink } from "react-router-dom";

export default function Navbar({ darkMode, setDarkMode }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">💳 FintechFlow</div>
      <div className="navbar-links">
        <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Wallet</NavLink>
        <NavLink to="/transactions" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Transactions</NavLink>
        <NavLink to="/loans" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Apply Loan</NavLink>
        <NavLink to="/loan-status" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Loan Status</NavLink>
        <NavLink to="/emi" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>EMI Calc</NavLink>
      </div>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </nav>
  );
}
