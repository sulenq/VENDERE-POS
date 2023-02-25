import { useState, useEffect } from 'react';
import {
  Link,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import axios from 'axios';

import {
  RequireAuth,
  useSignIn,
  useAuthHeader,
  useAuthUser,
  useSignOut,
} from 'react-auth-kit';

import {
  Badge,
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
import { ColorModeButton } from '../components/ColorModeSwitcher';

// MUI Icons
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import GoogleIcon from '@mui/icons-material/Google';

import '../css/vendereApp.css';

import ResponsiveNav from '../components/ResponsiveNav';
import Cashier from './Cashier';
import Transactions from './Transactions';
import Debts from './Debts';
import Reports from './Reports';
import Profile from './Profile';
import Employees from './Employees';
import { ActionTopBar } from '../components/ActionTopBar';
import { Stat } from '../components/Data';
import { PrimaryButton } from '../components/Buttons';
import { ModalContent, ModalFooter, ModalOverlay } from '../components/Modals';
import { height } from '@mui/system';

export default function Dashboard() {
  const baseURL = 'http://localhost:8080';

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
      totalOnline: 1,
      list: [
        { name: 'Jolitos Kurniawan', role: 'Cashier', online: true },
        { name: 'Sulenq Ndas Nogo', role: 'Cashier', online: false },
      ],
    },
  });

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
                colorMode === 'light' ? 'var(--p-450)' : 'var(--p-50)',
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
      const [isCreatingAcount, setIsCreatingCashierAccount] = useState(false);

      function signUp(e) {
        e.preventDefault();

        const authToken = document.cookie
          .split('; ')
          .find(row => row.startsWith('_auth='));
        const authTokenValue = authToken?.split('=')[1];

        console.log('Creating Employee Account...');
        // console.log(registerData);
        // console.log(authTokenValue);
        setIsCreatingCashierAccount(true);

        const cashierRegisterAPI = new URL(
          `${baseURL}/api/v1/users/cashier/register`
        );

        axios
          .post(cashierRegisterAPI, registerData, {
            headers: { Authorization: `Bearer ${authTokenValue}` },
          })
          .then(r => {
            console.log(r);
            setRegisterData({
              username: '',
              password: '',
            });
            if (r.status === 201) {
              toast({
                position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
                title: 'Cashier account registered',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            }
          })
          .catch(err => {
            console.log(err);
            if (err) {
              toast({
                position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
                title: 'Sorry, fail to create account.',
                description: err.response.data.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            }
          })
          .finally(setIsCreatingCashierAccount(false));
      }

      return (
        <>
          <PrimaryButton
            w={'100%'}
            label={'Sign Up Employee Account'}
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
                      This registered account will be your employees account of
                      this shop.
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
                            isLoading={isCreatingAcount}
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
        {/* Heading */}
        <HStack style={{ width: '100%', justifyContent: 'space-between' }}>
          <Text fontWeight={'bold'} color={'var(--p-200)'}>
            Employees
          </Text>
          <Link to={'vendere-app/employees'}>
            <Text
              fontSize={'sm'}
              style={{ color: 'var(--p-200)' }}
              _hover={{ textDecoration: 'underline' }}
            >
              See More
            </Text>
          </Link>
        </HStack>

        {/* Body */}
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
          <HStack w={'100%'} justifyContent={'space-between'}>
            <HStack>
              <Text fontWeight={'bold'}>
                {dashboardData.employees.total.toLocaleString()}
              </Text>
              <Text mt={'0px !important'} color={'var(--p-200)'}>
                Total Employees
              </Text>
            </HStack>
            <HStack>
              <Badge
                style={{ width: '10px', height: '10px', borderRadius: '50px' }}
                colorScheme={'green'}
              ></Badge>
              <Text>{dashboardData.employees.totalOnline}</Text>
              <Text opacity={'0.5'}>Online</Text>
            </HStack>
          </HStack>

          <VStack w={'100%'} pb={2}>
            {dashboardData.employees.list.map((emp, index) => {
              return (
                <HStack
                  key={index}
                  style={{
                    width: '100%',
                    alignItems: 'flex-start',
                    padding: '8px 0',
                  }}
                >
                  <Avatar
                    size={'lg'}
                    name={emp.name}
                    background={
                      colorMode == 'light' ? 'var(--p-75)' : 'var(--p-350)'
                    }
                    color={
                      colorMode == 'light' ? 'var(--p-350)' : 'var(--p-75)'
                    }
                  />
                  <VStack alignItems={'flex-start'} pl={1}>
                    {emp.online ? (
                      <Badge colorScheme={'green'}>Online</Badge>
                    ) : (
                      <Badge>Offline</Badge>
                    )}
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
            colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-400)',
          borderRadius: screenWidth <= 1000 ? 0 : '12px',
        }}
      >
        <>
          <ActionTopBar />
          <VStack
            style={{
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              paddingBottom: screenWidth <= 1000 ? '64px' : '',
              borderRadius: '12px',
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
}
