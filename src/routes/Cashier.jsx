import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

import Nav from '../components/Nav';
import NavMobile from '../components/NavMobile';

export default function Cashier() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
  });

  if (screenWidth <= 820) {
    return (
      <Box className="vendereApp">
        <NavMobile active="cashier" />
        <p>
          Screen : {screenWidth}px x {screenHeight}px
        </p>
      </Box>
    );
  }

  return (
    <div className="vendereApp">
      <Nav active="cashier" />
      <p>Screen width: {screenWidth}px</p>
    </div>
  );
}
