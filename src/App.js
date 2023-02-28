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
  const logout = useSignOut();

  const navigate = useNavigate();

  const [token, setToken] = useState(Cookies.get('_auth'));

  useEffect(() => {
    if (token) {
      const tokenListener = setInterval(() => {
        // console.log(token || 'no auth token');
        const newToken = Cookies.get('_auth');
        if (newToken !== token) {
          console.log('auth token was lost');
          setToken('');
          logout();
          setItems([]);
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

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  //* DUMMY ITEMS SECTION
  const dummyItems = [
    {
      id: 1,
      code: '089686010947',
      name: 'Indomie Goreng',
      price: 3500,
      stock: 100,
    },
    {
      id: 2,
      code: '089686910704',
      name: 'Indomie Goreng Rendang',
      price: 3500,
      stock: 100,
    },
    {
      id: 3,
      code: '089686010527',
      name: 'Indomie Kari Ayam',
      price: 3500,
      stock: 100,
    },
    {
      id: 4,
      code: '089686010046',
      name: 'Indomie Ayam Spesial',
      price: 3000,
      stock: 100,
    },
    {
      id: 5,
      code: '089686010015',
      name: 'Indomie Ayam Bawang',
      price: 3000,
      stock: 100,
    },
    {
      id: 6,
      code: '089686010343',
      name: 'Indomie Soto',
      price: 3000,
      stock: 100,
    },
    {
      id: 7,
      code: '089686043433',
      name: 'Indomie Hype Abis Ayam Geprek',
      price: 3000,
      stock: 100,
    },
    {
      id: 8,
      code: '8998866203104',
      name: 'Sedap Singapore Spicy Laksa',
      price: 3500,
      stock: 100,
    },
    {
      id: 9,
      code: '8998866200578',
      name: 'Sedap Kari Spesial',
      price: 3500,
      stock: 100,
    },
    {
      id: 10,
      code: '8998866200318',
      name: 'Sedap Ayam Bawang',
      price: 3500,
      stock: 100,
    },
    {
      id: 11,
      code: '8998866200301',
      name: 'Sedap Goreng',
      price: 3500,
      stock: 100,
    },
    {
      id: 12,
      code: '8886008101053',
      name: 'Aqua 600ml (tanggung)',
      price: 3000,
      stock: 100,
    },
    {
      id: 13,
      code: '8886008101091',
      name: 'Aqua 1500ml | 1.5L (besar)',
      price: 6000,
      stock: 100,
    },
    {
      id: 14,
      code: 'ndog1',
      name: 'Telur 1kg',
      price: 27500,
      stock: 100,
    },
    {
      id: 15,
      code: 'ndog2',
      name: 'Telur 1/2kg',
      price: 14000,
      stock: 100,
    },
    {
      id: 16,
      code: 'ndog4',
      name: 'Telur 1/4kg',
      price: 7500,
      stock: 100,
    },
    {
      id: 17,
      code: 'pasir1',
      name: 'Gula Pasir 1kg',
      price: 14500,
      stock: 100,
    },
    {
      id: 18,
      code: 'pasir2',
      name: 'Gula Pasir 1/2kg',
      price: 7500,
      stock: 100,
    },
    {
      id: 19,
      code: 'pasir4',
      name: 'Gula Pasir 1/4kg',
      price: 4000,
      stock: 100,
    },
    {
      id: 20,
      code: 'beras1',
      name: 'Beras Stroberi 1kg',
      price: 12000,
      stock: 100,
    },
  ];
  //* DUMMY ITEMS SECTION

  const [items, setItems] = useState([]);

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
              element={<Dashboard items={items} setItems={setItems} />}
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
              setItems={setItems}
              element={
                <Cashier
                  items={items}
                  setItems={setItems}
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
              element={<Transactions items={items} setItems={setItems} />}
            />
          }
        />
        <Route path="debts" element={<Debts />} />
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
              element={<ManageItems items={items} setItems={setItems} />}
            />
          }
        />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
