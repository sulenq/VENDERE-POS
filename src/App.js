import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './css/vendereApp.css';

import LandingPage from './routes/LandingPage';
import RedirectToCashier from './routes/RedirectToCashier';
import Cashier from './routes/Cashier';
import Transactions from './routes/Transactions';
import Debts from './routes/Debts';
import Reports from './routes/Reports';

const BadRequest = () => {
  return <h1>404 TOD</h1>;
};

export default function App() {
  const AppRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/vendere-app">
          <Route index element={<RedirectToCashier />} />
          <Route path="cashier" element={<Cashier />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="debts" element={<Debts />} />
          <Route path="reports" element={<Reports />} />
        </Route>
        <Route path="*" element={<BadRequest />} />
      </Routes>
    );
  };

  return <AppRouter />;
}
