import { useState, useEffect } from 'react';
import { Box, useColorMode } from '@chakra-ui/react';
import '../css/vendereApp.css';
import { setCookie } from 'set-cookie';

import ResponsiveNav from '../components/ResponsiveNav';
import Items from '../components/Items';
import Invoice from '../components/Invoice';

export default function Cashier() {
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

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [pay, setPay] = useState(0);
  const [change, setChange] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [search, setSearch] = useState('');

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
    <Box className="vendereApp">
      <ResponsiveNav active={'cashier'} />
      <Box
        borderRadius={'10px solid red'}
        h={'100%'}
        w={'100%'}
        p={2}
        background={colorMode === 'light' ? '#ccdff9' : '#2d3748'}
      >
        {screenWidth <= 820 ? '' : <Items />}
        <Invoice
          items={items}
          total={total}
          setTotal={setTotal}
          pay={pay}
          setPay={setPay}
          change={change}
          setChange={setChange}
          cartList={cartList}
          setCartList={setCartList}
          search={search}
          setSearch={setSearch}
        />
      </Box>
    </Box>
  );
}
