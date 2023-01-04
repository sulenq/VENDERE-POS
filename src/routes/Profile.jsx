import '../css/vendereApp.css';
import { Box, useColorMode } from '@chakra-ui/react';

import ResponsiveNav from '../components/ResponsiveNav';

export default function Cashier() {
  const { colorMode } = useColorMode();
  return (
    <Box className="vendereApp">
      <ResponsiveNav active={'profile'} />
      <Box
        borderRadius={'10px solid red'}
        h={'100%'}
        px={'12px'}
        py={'8px'}
        background={colorMode === 'light' ? '#ccdff9' : '#2d3748'}
      ></Box>
    </Box>
  );
}
