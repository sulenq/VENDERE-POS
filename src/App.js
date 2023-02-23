import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { RequireAuth, useSignIn, useAuthHeader } from 'react-auth-kit';

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
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import GoogleIcon from '@mui/icons-material/Google';

import './css/vendereApp.css';

import ResponsiveNav from './components/ResponsiveNav';
import LandingPage from './routes/LandingPage';
import Cashier from './routes/Cashier';
import Transactions from './routes/Transactions';
import Debts from './routes/Debts';
import Reports from './routes/Reports';
import Profile from './routes/Profile';
import Employees from './routes/Employees';
import { Stat } from './components/Data';
import { PrimaryButton } from './components/Buttons';
import { ModalContent, ModalFooter, ModalOverlay } from './components/Modals';

const BadRequest = () => {
  return (
    <VStack justifyContent={'center'} width={'100%'}>
      <Text textAlign={'center'} fontSize={'20rem'} fontWeight={'bold'}>
        404 TOD
      </Text>
    </VStack>
  );
};

export default function App() {
  const DOMAINAPI = 'http://localhost:8080';

  const Dashboard = () => {
    const DOMAIN_API = 'http://localhost:8080';

    const { colorMode } = useColorMode();
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    useEffect(() => {
      function handleResize() {
        setScreenWidth(window.innerWidth);
      }
      window.addEventListener('resize', handleResize);
    });

    const authHeader = useAuthHeader();

    const toast = useToast();

    const [dashboardData, setDashboardData] = useState({
      today: {
        income: 4024000,
        transactions: 23,
        items: 3,
      },
      currentMonth: {
        totalRevenue: 12030400,
        totalExpenses: 8040300,
      },
      employees: {
        total: 2,
        list: [
          { name: 'Jolitos Kurniawan', role: 'Cashier' },
          { name: 'Sulenq Ndas Nogo', role: 'Cashier' },
        ],
      },
    });

    const dateOptions = {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const todayDate = new Date().toLocaleString(undefined, dateOptions);

    const ActionTopBar = () => {
      return (
        <HStack w={'100%'} px={2} justifyContent={'space-between'}>
          <Text color={'var(--p-200)'}>{todayDate}</Text>
          <ColorModeButton />
        </HStack>
      );
    };

    const PriorityDashboard = () => {
      return (
        <VStack
          mt={2}
          px={screenWidth <= 1000 ? 2 : 4}
          w={'100%'}
          alignItems={'flex-start'}
        >
          <Text fontWeight={'bold'} color={'var(--p-200)'}>
            Today
          </Text>
          <SimpleGrid columns={[1, null, 2]} gap={2} w={'100%'}>
            <Stat
              w={'100%'}
              style={{
                background:
                  colorMode === 'light'
                    ? 'linear-gradient(to left, var(--p-450), var(--p-400))'
                    : 'linear-gradient(to left, var(--p-100), var(--p-50))',
                color: colorMode === 'light' ? 'white' : 'black',
                borderRadius: '12px',
              }}
              content={
                <>
                  <StatLabel>
                    <HStack>
                      <Icon
                        as={PaymentsOutlinedIcon}
                        color={'var(--p-200)'}
                        fontSize={'lg'}
                      />
                      <Text color={'var(--p-200)'}>Income</Text>
                    </HStack>
                  </StatLabel>
                  <StatNumber>
                    <HStack alignItems={'flex-start'}>
                      <Text fontSize={'sm'}>Rp. </Text>
                      <Text fontSize={'xx-large'}>
                        {dashboardData.today.income.toLocaleString()}
                      </Text>
                    </HStack>
                  </StatNumber>
                  <StatHelpText mb={0}>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </>
              }
            />

            <HStack w={'100%'}>
              <Stat
                w={'50%'}
                style={{
                  border:
                    colorMode === 'light'
                      ? '2px solid var(--p-75)'
                      : '2px solid var(--p-350)',
                  borderRadius: '12px',
                }}
                content={
                  <>
                    <StatLabel>
                      <HStack>
                        <Icon
                          as={ReceiptLongOutlinedIcon}
                          color={'var(--p-200)'}
                          fontSize={'lg'}
                        />
                        <Text color={'var(--p-200)'}>Transactions</Text>
                      </HStack>
                    </StatLabel>
                    <StatNumber fontSize={'xx-large'}>
                      {dashboardData.today.transactions}
                    </StatNumber>
                    <StatHelpText mb={0}>
                      <StatArrow type="increase" />
                      23.36%
                    </StatHelpText>
                  </>
                }
              />

              <Stat
                w={'50%'}
                style={{
                  border:
                    colorMode === 'light'
                      ? '2px solid var(--p-75)'
                      : '2px solid var(--p-350)',
                  borderRadius: '12px',
                }}
                content={
                  <>
                    <StatLabel>
                      <HStack>
                        <Icon
                          as={Inventory2OutlinedIcon}
                          color={'var(--p-200)'}
                          fontSize={'lg'}
                        />
                        <Text color={'var(--p-200)'}>Items</Text>
                      </HStack>
                    </StatLabel>
                    <StatNumber fontSize={'xx-large'}>
                      {dashboardData.today.items}
                    </StatNumber>
                    <StatHelpText mb={0}>Need resupply</StatHelpText>
                  </>
                }
              />
            </HStack>
          </SimpleGrid>
        </VStack>
      );
    };

    const LDashboard = () => {
      return (
        <VStack mt={'16px !important'} w={'100%'} alignItems={'flex-start'}>
          <Text fontWeight={'bold'} color={'var(--p-200)'}>
            Current Month
          </Text>

          <VStack
            alignItems={'flex-start'}
            py={2}
            px={4}
            w={'100%'}
            style={{
              border:
                colorMode === 'light'
                  ? '2px solid var(--p-75)'
                  : '2px solid var(--p-350)',
              borderRadius: '12px',
            }}
          >
            <VStack alignItems={'flex-start'}>
              <HStack alignItems={'flex-start'}>
                <Text fontWeight={'bold'}>Rp.</Text>
                <Text fontSize={'xx-large'} fontWeight={'bold'}>
                  {dashboardData.currentMonth.totalRevenue.toLocaleString()}
                </Text>
              </HStack>
              <Text mt={'0px !important'} color={'var(--p-200)'}>
                Total Revenue
              </Text>
            </VStack>

            <VStack alignItems={'flex-start'}>
              <HStack alignItems={'flex-start'}>
                <Text fontWeight={'bold'}>Rp.</Text>
                <Text fontSize={'xx-large'} fontWeight={'bold'}>
                  {dashboardData.currentMonth.totalExpenses.toLocaleString()}
                </Text>
              </HStack>
              <Text mt={'0px !important'} color={'var(--p-200)'}>
                Total Expenses
              </Text>
            </VStack>
          </VStack>
        </VStack>
      );
    };

    const RDashboard = () => {
      const RegisterEmployee = () => {
        const { isOpen, onOpen, onClose } = useDisclosure();
        const [registerData, setRegisterData] = useState({
          username: '',
          password: '',
        });
        const [isCreateAccountLoading, setIsCreateAccountLoading] =
          useState(false);

        function toastRegisterStatus(r) {
          console.log(r);
          if (r.error) {
            toast({
              position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
              title: 'Sorry, fail to create account.',
              description: r.error,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } else if (r.data.code === 200 && r.status === 'OK') {
            toast({
              position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
              title: 'Account created.',
              description: `your account has been registered!, with username/email ${r.data.user_id}`,
              status: 'success',
              duration: 5000,
              isClosable: true,
            });
            onClose();
          } else {
            toast({
              position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
              title: 'Error.',
              description: 'Please buy a new computer!',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        }

        function signUp(e) {
          e.preventDefault();
          console.log('Creating Employee Account...');
          console.log(registerData);
          setIsCreateAccountLoading(true);

          //! Simulasi loading
          setTimeout(() => {
            const adminRegisterAPI = new URL(
              `${DOMAIN_API}/api/v1/users/cashier/register`
            );

            fetch(adminRegisterAPI, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + authTokenValue,
              },
              body: JSON.stringify(registerData),
            })
              .then(response => response.json())
              .then(responseData => {
                setRegisterData({
                  username: '',
                  password: '',
                });
                toastRegisterStatus(responseData);
              })
              .finally(setIsCreateAccountLoading(false));
          }, 1000);
          //! Simulasi loading
        }

        return (
          <>
            <PrimaryButton
              w={'100%'}
              label={'Sign Up for Employee Account'}
              // size={'sm'}
              onClick={onOpen}
              // mr={'-8px !important'}
            />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
              <ModalOverlay />

              <ModalContent
                content={
                  <>
                    <ModalHeader>
                      <HStack>
                        <Icon
                          as={AccountCircleOutlinedIcon}
                          fontSize={'xx-large'}
                        />
                        <Text>Create Employee's Account</Text>
                      </HStack>
                    </ModalHeader>

                    <ModalBody pb={6}>
                      <Alert
                        borderRadius={'8px'}
                        status="info"
                        variant={'left-accent'}
                      >
                        This registered account will be your employees account
                        of this shop.
                      </Alert>

                      <form id="signUpForm">
                        {/* <FormControl mt={4} isRequired>
                        <FormLabel>Role</FormLabel>
                        <Select
                          onChange={e => {
                            setRegisterData({
                              ...registerData,
                              role: e.target.value,
                            });
                          }}
                        >
                          <option value={'Cashier'}>Cashier</option>
                          <option value={'Storageman'}>Storageman</option>
                        </Select>
                      </FormControl> */}

                        <FormControl mt={4} isRequired>
                          <FormLabel>Username</FormLabel>
                          <Input
                            placeholder="e.g jolitoskurniawan"
                            value={registerData.username}
                            onChange={e => {
                              setRegisterData({
                                ...registerData,
                                username: e.target.value,
                              });
                            }}
                          />
                        </FormControl>

                        <FormControl mt={4} isRequired>
                          <FormLabel>Password</FormLabel>
                          <Input
                            type={'password'}
                            placeholder="Type strong password"
                            value={registerData.password}
                            onChange={e => {
                              setRegisterData({
                                ...registerData,
                                password: e.target.value,
                              });
                            }}
                          />
                        </FormControl>
                      </form>
                    </ModalBody>

                    <ModalFooter
                      content={
                        <>
                          <ButtonGroup alignSelf={'flex-end'}>
                            <Button
                              className="btn"
                              onClick={onClose}
                              variant={'ghost'}
                            >
                              Close
                            </Button>
                            <PrimaryButton
                              label={'Create Account'}
                              onClick={signUp}
                              isLoading={isCreateAccountLoading}
                            />
                          </ButtonGroup>
                        </>
                      }
                    />
                  </>
                }
              />
            </Modal>
          </>
        );
      };

      return (
        <VStack mt={'16px !important'} w={'100%'} alignItems={'flex-start'}>
          <Text fontWeight={'bold'} color={'var(--p-200)'}>
            Employees
          </Text>

          <VStack
            alignItems={'flex-start'}
            py={2}
            px={4}
            w={'100%'}
            style={{
              border:
                colorMode === 'light'
                  ? '2px solid var(--p-75)'
                  : '2px solid var(--p-350)',
              borderRadius: '12px',
            }}
          >
            <HStack w={'100%'}>
              <Text fontWeight={'bold'}>
                {dashboardData.employees.total.toLocaleString()}
              </Text>
              <Text mt={'0px !important'} color={'var(--p-200)'}>
                Total Employees
              </Text>
            </HStack>

            <VStack w={'100%'} pb={2}>
              {dashboardData.employees.list.map((emp, index) => {
                return (
                  <HStack key={index} w={'100%'}>
                    <Avatar
                      size={'lg'}
                      name={emp.name}
                      background={'var(--p-75)'}
                      color={'black'}
                    />
                    <VStack alignItems={'flex-start'} pl={1}>
                      <Text mt={'0px !important'}>{emp.name}</Text>
                      <Text style={{ color: 'var(--p-200)', marginTop: '0' }}>
                        {emp.role}
                      </Text>
                    </VStack>
                  </HStack>
                );
              })}
            </VStack>

            <RegisterEmployee />
          </VStack>
        </VStack>
      );
    };

    // Dashboard Main Section
    return (
      <HStack
        className="vendereApp"
        p={screenWidth <= 1000 ? 0 : 4}
        alignItems={'center'}
      >
        <ResponsiveNav active={'Dashboard'} />
        <VStack
          id="appContentWrapper"
          h={'100%'}
          w={'100%'}
          p={2}
          ml={'0px !important'}
          style={{
            background:
              colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-450)',
            borderRadius: screenWidth <= 1000 ? 0 : '12px',
          }}
        >
          <>
            <ActionTopBar />
            <VStack
              w={'100%'}
              h={'100%'}
              overflowY={'auto'}
              pb={'5rem'}
              // py={2}
              borderRadius={'12px'}
              style={{
                background: colorMode === 'light' ? 'white' : 'var(--dark)',
              }}
            >
              <PriorityDashboard />

              <SimpleGrid
                w={'100%'}
                px={screenWidth <= 1000 ? 2 : 4}
                columns={[1, 2, 2]}
                gap={2}
              >
                <LDashboard />

                <RDashboard />
              </SimpleGrid>
            </VStack>
          </>
        </VStack>
      </HStack>
    );
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const signIn = useSignIn();
  const [user, setUser] = useState({});
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const authToken = document.cookie
    .split('; ')
    .find(row => row.startsWith('_auth='));
  const authTokenValue = authToken?.split('=')[1];

  // useEffect(() => {
  //   console.log('Validating as Admin...');
  //   setIsAuthLoading(true);

  //   //!Simulasi Loading
  //   setTimeout(() => {
  //     const authValidationAPI = new URL(
  //       `${DOMAINAPI}/api/v1/users/admin/check`
  //     );

  //     let data = {
  //       token_input: authTokenValue,
  //     };

  //     console.log(authTokenValue);

  //     fetch(authValidationAPI, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: 'Bearer ' + authTokenValue,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then(response => response.json())
  //       .then(r => {
  //         console.log(r);
  //         if (r.error) {
  //           console.log(r.error);
  //         } else if (r.code === 200 && r.status === 'OK') {
  //           console.log('logged in');
  //           signIn({
  //             token: r.data.tokenCookie,
  //             tokenType: 'Bearer',
  //             expiresIn: 300,
  //             authState: {
  //               userId: r.data.user_id,
  //               displayName: r.data.nama,
  //               userRole: r.data.role,
  //             },
  //           });
  //         }
  //       })
  //       .finally(setIsAuthLoading(false));
  //   }, 1000);
  //   //!Simulasi Loading
  // }, []);

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
        {isAuthLoading ? (
          <>
            <Route
              index
              element={
                <VStack
                  h={'100%'}
                  w={'100%'}
                  justifyContent={'center'}
                  pb={screenWidth <= 1000 ? 20 : 0}
                >
                  <Icon
                    as={AdminPanelSettingsOutlinedIcon}
                    fontSize={'10rem'}
                    opacity={0.1}
                  />
                  <HStack>
                    <Spinner />
                    <Text
                      mt={'0px !important'}
                      ml={2}
                      fontSize={'xl'}
                      fontWeight={'bold'}
                    >
                      Validating as admin...
                    </Text>
                  </HStack>
                </VStack>
              }
            />
          </>
        ) : (
          <>
            <Route
              index
              element={
                <RequireAuth loginPath="/">
                  <Dashboard
                    isAuthLoading={isAuthLoading}
                    setIsAuthLoading={setIsAuthLoading}
                  />
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
            <Route
              path="employees"
              element={
                <RequireAuth loginPath="/">
                  <Employees />
                </RequireAuth>
              }
            />
          </>
        )}
      </Route>
      <Route path="*" element={<BadRequest />} />
    </Routes>
  );
}
