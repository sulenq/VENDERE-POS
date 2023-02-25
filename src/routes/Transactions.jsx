import { useState, useMemo } from 'react';
import { Box, useColorMode, HStack } from '@chakra-ui/react';

import '../css/vendereApp.css';
import bgDark from '../assets/appBg.png';
import bgLight from '../assets/bg.png';
import ResponsiveNav from '../components/ResponsiveNav';
import Items from '../components/Items';
import Invoice from '../components/Invoice';

export default function Transactions() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useMemo(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  return (
    <Box
      className="vendereApp"
      p={screenWidth <= 1000 ? 0 : 4}
      backgroundImage={`url(${bgDark})`}
    >
      <ResponsiveNav active={'transactions'} />
      <h1>transactions Page</h1>
    </Box>
  );
}
