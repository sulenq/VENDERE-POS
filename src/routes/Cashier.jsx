import { useState, useEffect } from 'react';
import { Box, useColorMode, HStack } from '@chakra-ui/react';
import '../css/vendereApp.css';

import ResponsiveNav from '../components/ResponsiveNav';
import Items from '../components/Items';
import Invoice from '../components/Invoice';

export default function Cashier({
  total,
  setTotal,
  cartList,
  setCartList,
  search,
  setSearch,
  addItemToCartList,
}) {
  // !!! DEV PURPOSE
  function generateRandomData() {
    // Generate random data

    const data = {
      code: Math.floor(Math.random() * 10000000).toString(),
      name: 'Product ' + Math.floor(Math.random() * 1000),
      price: Math.random() * (100000 - 100) + 100,
      qty: (Math.random() * (10 - 1) + 1).toFixed(1),
    };
    return data;
  }
  function generateDummy() {
    let dummyCartList = [];
    for (let i = 0; i < 10; i++) {
      dummyCartList.push(generateRandomData());
    }

    return dummyCartList;
  }
  // !!! DEV PURPOSE

  const [items, setItems] = useState(generateDummy);

  const [invoice, setInvoice] = useState({});

  const { colorMode } = useColorMode();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const url = 'http://localhost:8080/api/v1/products/get';
  useEffect(() => {
    fetch(url)
      .then(r => r.json())
      .then(json => setItems(json));
  }, []);

  return (
    <Box className="vendereApp" p={screenWidth <= 820 ? 0 : 2}>
      <ResponsiveNav active={'cashier'} />
      <HStack
        overflow={'hidden'}
        h={'100%'}
        w={'100%'}
        p={2}
        borderRadius={'20px'}
        style={{
          background: colorMode === 'light' ? 'var(--p-50)' : '#2d3748',
        }}
      >
        {screenWidth <= 820 ? (
          ''
        ) : (
          <Items
            items={items}
            search={search}
            setSearch={setSearch}
            addItemToCartList={addItemToCartList}
          />
        )}
        <Invoice
          items={items}
          total={total}
          setTotal={setTotal}
          cartList={cartList}
          setCartList={setCartList}
          search={search}
          setSearch={setSearch}
          setInvoice={setInvoice}
          addItemToCartList={addItemToCartList}
        />
      </HStack>
    </Box>
  );
}
