import { useState } from 'react';
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
  const toast = useToast();

  const [total, setTotal] = useState(0);
  const [cartList, setCartList] = useState([]);
  const [search, setSearch] = useState('');

  function addItemToCartList({itemId, itemCode, itemName, itemPrice, itemQty}) {
    let itemInCartList = false;

    const newCartList = {
      id: itemId,
      code: itemCode,
      name: itemName,
      price: itemPrice,
      qty: itemQty,
      totalPrice: itemPrice * itemQty,
    };

    console.log(newCartList);

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
