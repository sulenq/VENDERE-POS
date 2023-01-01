import '../css/vendereApp.css';
import { Box, useColorMode } from '@chakra-ui/react';

import ResponsiveNav from '../components/ResponsiveNav';
import { Items } from '../components/Items';
import Invoice from '../components/Invoice';

export default function Cashier() {
  const { colorMode } = useColorMode();
  return (
    <Box className="vendereApp">
      <ResponsiveNav active={'cashier'} />
      <Box
        borderRadius={'10px solid red'}
        h={'100%'}
        px={'12px'}
        py={'8px'}
        background={colorMode === 'light' ? '#ccdff9' : '#2d3748'}
      >
        <Invoice />
      </Box>
    </Box>
  );
}
