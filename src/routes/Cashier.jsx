import React, { useState, useEffect } from 'react';

import ResponsiveNav from '../components/ResponsiveNav';

export default function Cashier() {
  return (
    <div className="vendereApp">
      <ResponsiveNav active={'cashier'} />
      <h1>cashier Page</h1>
    </div>
  );
}
