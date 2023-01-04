import { useState, useEffect } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import '../css/vendereApp.css';

import ResponsiveNav from '../components/ResponsiveNav';
import Items from '../components/Items';
import Invoice from '../components/Invoice';

export default function Cashier() {
  const { colorMode } = useColorMode();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });
  return (
    <Box className="vendereApp">
      <ResponsiveNav active={'cashier'} />
      <Box
        borderRadius={'10px solid red'}
        h={'100%'}
        w={'100%'}
        px={'12px'}
        py={'8px'}
        background={colorMode === 'light' ? '#ccdff9' : '#2d3748'}
      >
        {screenWidth <= 820 ? '' : <Items />}
        <Invoice />
      </Box>
    </Box>
  );
}
