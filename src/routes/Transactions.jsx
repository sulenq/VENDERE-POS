import React, { useState, useEffect } from 'react';

import ResponsiveNav from '../components/ResponsiveNav';

export default function Transactions() {
  return (
    <div className="vendereApp">
      <ResponsiveNav active={'transactions'} />
      <h1>transactions Page</h1>
    </div>
  );
}
