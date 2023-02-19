import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';

import './css/vendereApp.css';

import LandingPage from './routes/LandingPage';
import RedirectToCashier from './routes/RedirectToCashier';
import Cashier from './routes/Cashier';
import Transactions from './routes/Transactions';
import Debts from './routes/Debts';
import Reports from './routes/Reports';
import Profile from './routes/Profile';

const BadRequest = () => {
  return <h1>404 TOD</h1>;
};

export default function App() {
  const DOMAINAPI = 'http://localhost:8080';

  // !!! DEV PURPOSE
  const dummyItems = [
    {
      id: 1,
      code: '089686010947',
      name: 'Indomie Goreng',
      price: 3500,
      supply: 100,
    },
    {
      id: 2,
      code: '089686910704',
      name: 'Indomie Goreng Rendang',
      price: 3500,
      supply: 100,
    },
    {
      id: 3,
      code: '089686010527',
      name: 'Indomie Kari Ayam',
      price: 3500,
      supply: 100,
    },
    {
      id: 4,
      code: '089686010046',
      name: 'Indomie Ayam Spesial',
      price: 3000,
      supply: 100,
    },
    {
      id: 5,
      code: '089686010015',
      name: 'Indomie Ayam Bawang',
      price: 3000,
      supply: 100,
    },
    {
      id: 6,
      code: '089686010343',
      name: 'Indomie Soto',
      price: 3000,
      supply: 100,
    },
    {
      id: 7,
      code: '089686043433',
      name: 'Indomie Hype Abis Ayam Geprek',
      price: 3000,
      supply: 100,
    },
    {
      id: 8,
      code: '8998866203104',
      name: 'Sedap Singapore Spicy Laksa',
      price: 3500,
      supply: 100,
    },
    {
      id: 9,
      code: '8998866200578',
      name: 'Sedap Kari Spesial',
      price: 3500,
      supply: 100,
    },
    {
      id: 10,
      code: '8998866200318',
      name: 'Sedap Ayam Bawang',
      price: 3500,
      supply: 100,
    },
    {
      id: 11,
      code: '8998866200301',
      name: 'Sedap Goreng',
      price: 3500,
      supply: 100,
    },
    {
      id: 12,
      code: '8886008101053',
      name: 'Aqua 600ml (tanggung)',
      price: 3000,
      supply: 100,
    },
    {
      id: 13,
      code: '8886008101091',
      name: 'Aqua 1500ml | 1.5L (besar)',
      price: 6000,
      supply: 100,
    },
    {
      id: 14,
      code: 'ndog1',
      name: 'Telur 1kg',
      price: 27500,
      supply: 100,
    },
    {
      id: 15,
      code: 'ndog2',
      name: 'Telur 1/2kg',
      price: 14000,
      supply: 100,
    },
    {
      id: 16,
      code: 'ndog4',
      name: 'Telur 1/4kg',
      price: 7500,
      supply: 100,
    },
    {
      id: 17,
      code: 'pasir1',
      name: 'Gula Pasir 1kg',
      price: 14500,
      supply: 100,
    },
    {
      id: 18,
      code: 'pasir2',
      name: 'Gula Pasir 1/2kg',
      price: 7500,
      supply: 100,
    },
    {
      id: 19,
      code: 'pasir4',
      name: 'Gula Pasir 1/4kg',
      price: 4000,
      supply: 100,
    },
    {
      id: 20,
      code: 'beras1',
      name: 'Beras Stroberi 1kg',
      price: 12000,
      supply: 100,
    },
  ];
  // !!! DEV PURPOSE

  const [items, setItems] = useState(dummyItems);

  // const itemsAPI = new URL(`${DOMAINAPI}/api/v1/products`);

  // useEffect(() => {
  //   fetch(itemsAPI)
  //     .then(r => r.json())
  //     .then(json => setItems(json));
  // }, []);

  const toast = useToast();

  const [total, setTotal] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [search, setSearch] = useState('');

  function addItemToCartList({
    itemId,
    itemCode,
    itemName,
    itemPrice,
    itemQty,
  }) {
    let itemInCartList = false;

    const newCartList = {
      id: itemId,
      code: itemCode,
      name: itemName,
      price: itemPrice,
      qty: itemQty,
      totalPrice: itemPrice * itemQty,
    };

    // console.log(newCartList);

    cartList.forEach(item => {
      if (item.id === itemId) {
        itemInCartList = true;
        item.qty += itemQty;
        item.totalPrice += itemPrice * itemQty;
      }
    });

    if (!itemInCartList) {
      setCartList(prevCartList => [...prevCartList, newCartList]);
    }

    let updateTotal = itemPrice * itemQty;

    setTotal(total + updateTotal);
    // setChange(pay - (total + updateTotal));
    // console.log(cartList);
    toast.closeAll();

    toast({
      title: 'Item added.',
      description: `${itemQty} ${itemName} added, total ${updateTotal.toLocaleString()}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      transition: 'none',
    });
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/vendere-app">
        <Route index element={<RedirectToCashier />} />
        <Route
          path="cashier"
          element={
            <Cashier
              items={items}
              total={total}
              setTotal={setTotal}
              cartList={cartList}
              setCartList={setCartList}
              search={search}
              setSearch={setSearch}
              addItemToCartList={addItemToCartList}
            />
          }
        />
        <Route path="transactions" element={<Transactions />} />
        <Route path="debts" element={<Debts />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<BadRequest />} />
    </Routes>
  );
}
