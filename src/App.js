import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { RequireAuth } from 'react-auth-kit';

import {
  useToast,
  HStack,
  useColorMode,
  SimpleGrid,
  VStack,
  Text,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Icon,
} from '@chakra-ui/react';

// MUI Icons
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

import './css/vendereApp.css';

import ResponsiveNav from './components/ResponsiveNav';
import LandingPage from './routes/LandingPage';
import Cashier from './routes/Cashier';
import Transactions from './routes/Transactions';
import Debts from './routes/Debts';
import Reports from './routes/Reports';
import Profile from './routes/Profile';
import { Stat } from './components/Data';

const Home = () => {
  const { colorMode } = useColorMode();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const PriorityDashboard = () => {
    return (
      <HStack w={'100%'} px={2}>
        <Stat
          w={'40%'}
          content={
            <>
              <StatLabel>
                <HStack>
                  <Icon as={PaymentsOutlinedIcon} fontSize={'lg'} />
                  <Text>Income</Text>
                </HStack>
              </StatLabel>
              <StatNumber>
                <HStack alignItems={'flex-start'}>
                  <Text fontSize={'sm'}>Rp. </Text>
                  <Text>0</Text>
                </HStack>
              </StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </>
          }
        />

        <Stat
          w={'30%'}
          content={
            <>
              <StatLabel>
                <HStack>
                  <Icon as={ReceiptLongOutlinedIcon} fontSize={'lg'} />
                  <Text>Transactions</Text>
                </HStack>
              </StatLabel>
              <StatNumber>0</StatNumber>
              <StatHelpText>
                <StatArrow type="increase" />
                23.36%
              </StatHelpText>
            </>
          }
        />

        <Stat
          w={'30%'}
          content={
            <>
              <StatLabel>
                <HStack>
                  <Icon as={ReceiptLongOutlinedIcon} fontSize={'lg'} />
                  <Text>Running Out Items</Text>
                </HStack>
              </StatLabel>
              <StatNumber>0</StatNumber>
            </>
          }
        />
      </HStack>
    );
  };

  return (
    <HStack
      className="vendereApp"
      p={screenWidth <= 1000 ? 0 : 4}
      alignItems={'center'}
      // backgroundImage={colorMode === 'light' ? `url(${bgDark})` : ''}
      // backgroundImage={`url(${bgDark})`}
    >
      <ResponsiveNav active={'home'} w={'15%'} />
      <VStack
        id="appContentWrapper"
        h={'100%'}
        w={'100%'}
        p={2}
        ml={'0px !important'}
        borderRadius={screenWidth <= 1000 ? 0 : '12px'}
        style={{
          background: colorMode === 'light' ? 'var(--p-50)' : '#2d3748',
        }}
      >
        <VStack
          w={'100%'}
          h={'100%'}
          py={2}
          borderRadius={'12px'}
          style={{
            background: colorMode === 'light' ? 'white' : 'var(--dark)',
          }}
        >
          <PriorityDashboard />
        </VStack>
      </VStack>
    </HStack>
  );
  // const navigate = useNavigate();
  // const location = useLocation();
  // useEffect(() => {
  //   if (
  //     location.pathname === '/vendere-app' ||
  //     location.pathname === '/vendere-app/'
  //   ) {
  //     navigate('/vendere-app/cashier');
  //   }
  // }, [location, navigate]);
};

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
      position: 'bottom-right',
      duration: 3000,
      isClosable: true,
      transition: 'none',
    });
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/vendere-app">
        <Route
          index
          element={
            <RequireAuth loginPath="/">
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="cashier"
          element={
            <RequireAuth loginPath="/">
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
            </RequireAuth>
          }
        />

        <Route
          path="transactions"
          element={
            <RequireAuth loginPath="/">
              <Transactions />
            </RequireAuth>
          }
        />
        <Route path="debts" element={<Debts />} />
        <Route path="reports" element={<Reports />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<BadRequest />} />
    </Routes>
  );
}
