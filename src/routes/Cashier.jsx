import { useState, useEffect } from 'react';
import { useColorMode, HStack } from '@chakra-ui/react';

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
      id: 1,
      code: '089686010947',
      name: 'Indomie Goreng',
      price: 3500,
      stok: 100,
    },
    {
      id: 2,
      code: '089686910704',
      name: 'Indomie Goreng Rendang',
      price: 3500,
      stok: 100,
    },
    {
      id: 3,
      code: '089686010527',
      name: 'Indomie Kari Ayam',
      price: 3500,
      stok: 100,
    },
    {
      id: 4,
      code: '089686010046',
      name: 'Indomie Ayam Spesial',
      price: 3000,
      stok: 100,
    },
    {
      id: 5,
      code: '089686010015',
      name: 'Indomie Ayam Bawang',
      price: 3000,
      stok: 100,
    },
    {
      id: 6,
      code: '089686010343',
      name: 'Indomie Soto',
      price: 3000,
      stok: 100,
    },
    {
      id: 7,
      code: '089686043433',
      name: 'Indomie Hype Abis Ayam Geprek',
      price: 3000,
      stok: 100,
    },
    {
      id: 8,
      code: '8998866203104',
      name: 'Sedap Singapore Spicy Laksa',
      price: 3500,
      stok: 100,
    },
    {
      id: 9,
      code: '8998866200578',
      name: 'Sedap Kari Spesial',
      price: 3500,
      stok: 100,
    },
    {
      id: 10,
      code: '8998866200318',
      name: 'Sedap Ayam Bawang',
      price: 3500,
      stok: 100,
    },
    {
      id: 11,
      code: '8998866200301',
      name: 'Sedap Goreng',
      price: 3500,
      stok: 100,
    },
    {
      id: 12,
      code: '8886008101053',
      name: 'Aqua 600ml (tanggung)',
      price: 3000,
      stok: 100,
    },
    {
      id: 13,
      code: '8886008101091',
      name: 'Aqua 1500ml | 1.5L (besar)',
      price: 6000,
      stok: 100,
    },
    {
      id: 14,
      code: 'ndog1',
      name: 'Telur 1kg',
      price: 27500,
      stok: 100,
    },
    {
      id: 15,
      code: 'ndog2',
      name: 'Telur 1/2kg',
      price: 14000,
      stok: 100,
    },
    {
      id: 16,
      code: 'ndog4',
      name: 'Telur 1/4kg',
      price: 7500,
      stok: 100,
    },
    {
      id: 17,
      code: 'pasir1',
      name: 'Gula Pasir 1kg',
      price: 14500,
      stok: 100,
    },
    {
      id: 18,
      code: 'pasir2',
      name: 'Gula Pasir 1/2kg',
      price: 7500,
      stok: 100,
    },
    {
      id: 19,
      code: 'pasir4',
      name: 'Gula Pasir 1/4kg',
      price: 4000,
      stok: 100,
    },
    {
      id: 20,
      code: 'beras1',
      name: 'Beras Stroberi 1kg',
      price: 12000,
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

  // Ctrl to checkout
  // document.documentElement.addEventListener('keydown', e => {
  //   if (e.ctrlKey) {
  //     const checkoutConfirmationBtn = document.querySelector(
  //       '#checkoutConfirmationBtn'
  //     );
  //     checkoutConfirmationBtn.click();
  //   }
  // });

  const itemsAPI = new URL('http://localhost:8080/api/v1/products/get');

  useEffect(() => {
    fetch(itemsAPI)
      .then(r => r.json())
      .then(json => setItems(json));
  }, []);

  return (
    <HStack
      className="vendereApp"
      p={screenWidth <= 1000 ? 0 : 4}
      alignItems={'center'}
      // backgroundImage={colorMode === 'light' ? `url(${bgDark})` : ''}
      // backgroundImage={`url(${bgDark})`}
    >
      <ResponsiveNav active={'cashier'} />
      <HStack
        id="appContentWrapper"
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
    </HStack>
  );
}
