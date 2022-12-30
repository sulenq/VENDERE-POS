import React, { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';

import Nav from '../components/Nav';
import NavMobile from '../components/NavMobile';

export default function Reports() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
  });

  return (
    <div className="vendereApp">
      {screenWidth <= 820 ? (
        <NavMobile active="reports" />
      ) : (
        <Nav active="reports" />
      )}
      <h1>reports Page</h1>
      <p>Screen width: {screenWidth}px</p>
    </div>
  );
}
