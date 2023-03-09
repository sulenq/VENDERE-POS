import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

import { RequireAuth, useSignOut } from 'react-auth-kit';

import {
  useToast,
  HStack,
  useColorMode,
  Grid,
  SimpleGrid,
  VStack,
  Text,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Spinner,
  Avatar,
  useDisclosure,
  ButtonGroup,
  Button,
  Box,
  Modal,
  ModalHeader,
  ModalBody,
  Icon,
  FormControl,
  Input,
  FormLabel,
  Divider,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { ColorModeButton } from './components/ColorModeSwitcher';

// MUI Icons
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import GoogleIcon from '@mui/icons-material/Google';

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
import { Stat } from './components/Data';
import { PrimaryButton } from './components/Buttons';
import { ModalContent, ModalFooter, ModalOverlay } from './components/Modals';
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
  const [token, setToken] = useState(Cookies.get('_auth'));
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });
  const logout = useSignOut();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const tokenListener = setInterval(() => {
        // console.log(token || 'no auth token');
        const newToken = Cookies.get('_auth');
        if (newToken !== token) {
          console.log('auth token was lost');
          setToken('');
          logout();
          navigate('/?login=1');
          toast({
            position: screenWidth <= 1000 ? 'bottom-center' : 'bottom-right',
            title: 'Sign In needed',
            description: 'please sign in to get authorization.',
            status: 'info',
            duration: 5000,
            isClosable: true,
          });
        }
      }, 1000);
      return () => clearInterval(tokenListener);
    }
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
      position: screenWidth <= 1000 ? 'bottom-center' : 'bottom-right',
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
      <Route path="/" element={<LandingPage setToken={setToken} />} />
      <Route path="/vendere-app">
        <Route
          index
          element={
            <RequireRoleAuth
              setToken={setToken}
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
              setToken={setToken}
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
          path="transactions"
          element={
            <RequireRoleAuth
              setToken={setToken}
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
              setToken={setToken}
              loginPath="/?login=1"
              restriction="admin"
              element={<Debts />}
            />
          }
        />
        <Route path="support" element={''} />
        <Route
          path="employees"
          element={
            <RequireAuth loginPath="/">
              <Employees />
            </RequireAuth>
          }
        />
        <Route path="reports" element={<Reports />} />
        <Route
          path="manageproducts"
          element={
            <RequireRoleAuth
              setToken={setToken}
              loginPath="/?login=1"
              restriction="admin"
              element={<ManageItems />}
            />
          }
        />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
