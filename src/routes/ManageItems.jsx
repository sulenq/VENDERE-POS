import { useState, useEffect } from 'react';

import {
  ButtonGroup,
  Button,
  HStack,
  Text,
  Box,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalBody,
  Icon,
  FormControl,
  Input,
  FormLabel,
  useColorMode,
  Divider,
  VStack,
  Select,
  useToast,
  Avatar,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

import ResponsiveNav from '../components/ResponsiveNav';

export default function ManageItems() {
  const { colorMode } = useColorMode();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  return (
    <HStack
      className="vendereApp"
      p={screenWidth <= 1000 ? 0 : 4}
      alignItems={'center'}
    >
      <ResponsiveNav active={'Dashboard'} />
      <VStack
        id="appContentWrapper"
        h={'100%'}
        w={'100%'}
        p={2}
        ml={'0px !important'}
        style={{
          background:
            colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-400)',
          borderRadius: screenWidth <= 1000 ? 0 : '12px',
        }}
      >
        <>
          <VStack
            style={{
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              paddingBottom: screenWidth <= 1000 ? '64px' : '',
              borderRadius: '12px',
              background: colorMode === 'light' ? 'white' : 'var(--dark)',
            }}
          >
            
          </VStack>
        </>
      </VStack>
    </HStack>
  );
}
