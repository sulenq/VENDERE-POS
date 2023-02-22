import React from 'react';

import { useState, useEffect } from 'react';
import { useColorMode, HStack } from '@chakra-ui/react';

import { useAuthUser } from 'react-auth-kit';

import '../css/vendereApp.css';
import ResponsiveNav from '../components/ResponsiveNav';
import Items from '../components/Items';
import Invoice from '../components/Invoice';

export default function Employees() {
  const [invoice, setInvoice] = useState({});

  const { colorMode } = useColorMode();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  document.documentElement.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!screenWidth <= 1000) {
        // const addItemBtn = document.querySelector('#addItemBtn');
        // addItemBtn.click();

        const itemSearchBox = document.querySelector('#itemSearchBox');

        itemSearchBox.focus();
      }
    }
  });

  return (
    <HStack
      className="vendereApp"
      p={screenWidth <= 1000 ? 0 : 4}
      alignItems={'center'}
      // backgroundImage={colorMode === 'light' ? `url(${bgDark})` : ''}
      // backgroundImage={`url(${bgDark})`}
    >
      <ResponsiveNav active={'employees'} w={'15%'} />
      <HStack
        id="appContentWrapper"
        h={'100%'}
        w={'100%'}
        p={2}
        ml={'0px !important'}
        borderRadius={screenWidth <= 1000 ? 0 : '12px'}
        style={{
          background:
            colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-450)',
        }}
      ></HStack>
    </HStack>
  );
}
