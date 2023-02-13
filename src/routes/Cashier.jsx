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
  const dummyItems = [
    {
      code: '089686010947',
      name: 'Indomie Goreng',
      price: 3500,
      stok: 100,
    },
    {
      code: '089686910704',
      name: 'Indomie Goreng Rendang',
      price: 3500,
      stok: 100,
    },
    {
      code: '089686010527',
      name: 'Indomie Kari Ayam',
      price: 3500,
      stok: 100,
    },
    {
      code: '089686010046',
      name: 'Indomie Ayam Spesial',
      price: 3000,
      stok: 100,
    },
    {
      code: '089686010015',
      name: 'Indomie Ayam Bawang',
      price: 3000,
      stok: 100,
    },
    {
      code: '089686010343',
      name: 'Indomie Soto',
      price: 3000,
      stok: 100,
    },
    {
      code: '089686043433',
      name: 'Indomie Hype Abis Ayam Geprek',
      price: 3000,
      stok: 100,
    },
    {
      code: '8998866203104',
      name: 'Sedap Singapore Spicy Laksa',
      price: 3500,
      stok: 100,
    },
    {
      code: '8998866200578',
      name: 'Sedap Kari Spesial',
      price: 3500,
      stok: 100,
    },
    {
      code: '8998866200318',
      name: 'Sedap Ayam Bawang',
      price: 3500,
      stok: 100,
    },
    {
      code: '8998866200301',
      name: 'Sedap Goreng',
      price: 3500,
      stok: 100,
    },
    {
      code: '8886008101053',
      name: 'Aqua 600ml (tanggung)',
      price: 3000,
      stok: 100,
    },
    {
      code: '8886008101091',
      name: 'Aqua 1500ml | 1.5L (besar)',
      price: 6000,
      stok: 100,
    },
    {
      code: 'ndog1',
      name: 'Telur 1kg',
      price: 27500,
      stok: 100,
    },
    {
      code: 'ndog2',
      name: 'Telur 1/2kg',
      price: 14000,
      stok: 100,
    },
    {
      code: 'ndog4',
      name: 'Telur 1/4kg',
      price: 7500,
      stok: 100,
    },
    {
      code: 'pasir1',
      name: 'Gula Pasir 1kg',
      price: 14500,
      stok: 100,
    },
    {
      code: 'pasir2',
      name: 'Gula Pasir 1/2kg',
      price: 7500,
      stok: 100,
    },
    {
      code: 'pasir4',
      name: 'Gula Pasir 1.4kg',
      price: 4000,
      stok: 100,
    },
  ];
  // !!! DEV PURPOSE

  const [items, setItems] = useState(dummyItems);

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
    <Box
      className="vendereApp"
      p={screenWidth <= 1000 ? 0 : 4}
      // backgroundImage={colorMode === 'light' ? `url(${bgDark})` : ''}
      // backgroundImage={`url(${bgDark})`}
    >
      <ResponsiveNav active={'cashier'} />
      <HStack
        overflow={'hidden'}
        h={'100%'}
        w={'100%'}
        p={2}
        borderRadius={screenWidth <= 1000 ? 0 : '20px'}
        style={{
          background: colorMode === 'light' ? 'var(--p-50)' : '#2d3748',
        }}
      >
        {screenWidth <= 1000 ? (
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
