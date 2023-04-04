import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';

import { useSignOut } from 'react-auth-kit';

import { useToast, VStack, Text } from '@chakra-ui/react';
import { ColorModeButton } from './components/ColorModeSwitcher';

import './css/vendereApp.css';

import ResponsiveNav from './components/ResponsiveNav';
import LandingPage from './routes/LandingPage';
import Dashboard from './routes/Dashboard';
import Cashier from './routes/Cashier';
import Transactions from './routes/Transactions';
import Debts from './routes/Debts';
import Reports from './routes/Reports';
import Profile from './routes/Profile';
import Employees from './routes/Employees';
import ManageItems from './routes/ManageItems';
import Expenses from './routes/Expenses';
import Support from './routes/Support';
import RequireRoleAuth from './routes/RequireRoleAuth';

const PageNotFound = () => {
  return (
    <VStack justifyContent={'center'} width={'100%'}>
      <Text textAlign={'center'} fontSize={'10rem'} fontWeight={'bold'}>
        404 TOD
      </Text>
    </VStack>
  );
};

export default function App() {
  const baseUrl = 'http://localhost:8080';
  const auth = useAuthUser();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const [signedOut, setSignedOut] = useState(false);
  const [token, setToken] = useState();
  const logout = useSignOut();
  const navigate = useNavigate();

  // setToken if rendered
  useEffect(() => {
    if (Cookies.get('_auth')) {
      setToken(Cookies.get('_auth'));
    }
  }, []);

  useEffect(() => {
    const isSignedOut = Cookies.get('isSignedOut');
    const tokenListener = setInterval(() => {
      const newToken = Cookies.get('_auth');
      // console.log(token);
      // console.log('new Token ' + newToken);
      if (isSignedOut == 'yes') {
        setToken();
        Cookies.set('isSignedOut', 'no');
        navigate('/');
      } else {
        if (token) {
          if (newToken !== token) {
            if (auth().userRole === 'cashier') {
              axios
                .put(`${baseUrl}/api/v1/users/kasir/badalakingkong`, null, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then(response => {
                  console.log(response);
                })
                .catch(error => {
                  console.error(error);
                });
            }
            setToken();
            console.log('auth token was lost');
            logout();
            navigate('/');
            toast({
              position: screenWidth <= 1000 ? 'bottom-center' : 'bottom-right',
              title: "You've been signed out",
              description: 'please sign in to use the application.',
              status: 'info',
              duration: 5000,
              isClosable: true,
            });
          }
        }
      }
    }, 100);

    return () => clearInterval(tokenListener);
  });

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
    itemModal,
  }) {
    let itemInCartList = false;
    const newCartList = {
      id: itemId,
      code: itemCode,
      name: itemName,
      price: itemPrice,
      qty: itemQty,
      totalPrice: itemPrice * itemQty,
      modal: itemModal,
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
      position: screenWidth <= 1000 ? 'bottom' : 'bottom-right',
      title: 'Item added.',
      description: `${itemQty} ${itemName} added, total ${updateTotal.toLocaleString(
        'id-ID'
      )}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
      transition: 'none',
    });
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage setToken={setToken} />} />
      <Route path="/vendere-app">
        <Route
          index
          element={
            <RequireRoleAuth
              loginPath="/?login=1"
              restriction="admin"
              element={<Dashboard />}
            />
          }
        />

        <Route
          path="cashier"
          element={
            <RequireRoleAuth
              loginPath="/?login=1"
              restriction="cashier"
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
          }
        />

        <Route
          path="manageproducts"
          element={
            <RequireRoleAuth
              loginPath="/?login=1"
              restriction="admin"
              element={<ManageItems />}
            />
          }
        />

        <Route
          path="transactions"
          element={
            <RequireRoleAuth
              loginPath="/?login=1"
              restriction=""
              element={<Transactions />}
            />
          }
        />

        <Route
          path="debts"
          element={
            <RequireRoleAuth
              loginPath="/?login=1"
              restriction="admin"
              element={<Debts />}
            />
          }
        />

        <Route
          path="expenses"
          element={
            <RequireRoleAuth
              loginPath="/?login=1"
              restriction="admin"
              element={<Expenses />}
            />
          }
        />

        <Route
          path="employees"
          element={
            <RequireRoleAuth
              loginPath="/?login=1"
              restriction="admin"
              element={<Employees />}
            />
          }
        />

        <Route
          path="reports"
          element={
            <RequireRoleAuth
              loginPath="/?login=1"
              restriction="admin"
              element={<Reports />}
            />
          }
        />

        <Route
          path="support"
          element={
            <RequireRoleAuth
              loginPath="/?login=1"
              restriction=""
              element={<Support />}
            />
          }
        />

        <Route
          path="profile"
          element={
            <RequireRoleAuth
              loginPath="/?login=1"
              restriction=""
              element={<Profile />}
            />
          }
        />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
