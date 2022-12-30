import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RedirectToCashier() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/vendere-app') {
      navigate('/vendere-app/cashier');
    }
  }, [location, navigate]);
}
