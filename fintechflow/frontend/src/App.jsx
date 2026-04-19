import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ToastProvider } from "./components/ToastContext";
import WalletPage from "./pages/WalletPage";
import TransactionsPage from "./pages/TransactionsPage";
import LoanFormPage from "./pages/LoanFormPage";
import LoanStatusPage from "./pages/LoanStatusPage";
import EMIPage from "./pages/EMIPage";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.body.className = darkMode ? "dark" : "";
  }, [darkMode]);

  return (
    <BrowserRouter>
      <ToastProvider>
        <div className={`app ${darkMode ? "dark" : ""}`}>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<WalletPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/loans" element={<LoanFormPage />} />
              <Route path="/loan-status" element={<LoanStatusPage />} />
              <Route path="/emi" element={<EMIPage />} />
            </Routes>
          </main>
        </div>
      </ToastProvider>
    </BrowserRouter>
  );
}
