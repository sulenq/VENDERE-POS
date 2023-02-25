import React, { useState, useMemo } from 'react';

import ResponsiveNav from '../components/ResponsiveNav';

export default function Debts() {
  return (
    <div className="vendereApp">
      <ResponsiveNav active={'debts'} />
      <h1>debts Page</h1>
    </div>
  );
}
