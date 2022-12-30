import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './css/vendereApp.css';

import Home from './routes/Home';
import RedirectToCashier from './routes/RedirectToCashier';
import Cashier from './routes/Cashier';

const BadRequest = () => {
  return <h1>404 TOD</h1>;
};

export default function App() {
  const AppRouter = () => {
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendere-app">
          <Route index element={<RedirectToCashier />} />
          <Route path="cashier" element={<Cashier />} />
          <Route path="transactions" element={<Cashier />} />
          <Route path="debts" element={<Cashier />} />
          <Route path="reports" element={<Cashier />} />
        </Route>
        <Route path="*" element={<BadRequest />} />
      </Routes>
    );
  };

  return <AppRouter />;
}
