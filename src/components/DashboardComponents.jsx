import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

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
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';

import '../css/vendereApp.css';

import { PrimaryButton } from '../components/Buttons';
import { ModalContent, ModalFooter, ModalOverlay } from '../components/Modals';
import { Input } from '../components/Inputs';
import { Skeleton } from '../components/Skeleton';

const RDashboard = props => {
  const [loading, setLoading] = useState(false);
  const baseURL = 'http://localhost:8080';
  const token = Cookies.get('_auth');
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });
  const employeesSkeletonLength = ['', '', ''];

  useEffect(() => {
    const getEmployeesAPI = `${baseURL}/api/v1/cashiers`;

    setLoading(true);

    setTimeout(() => {
      axios
        .get(getEmployeesAPI, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          // console.log(r);
          let totalOnline = 0;
          r?.data?.data?.forEach(emp => {
            if (emp.online) {
              totalOnline += 1;
            }
          });
          // console.log(totalOnline);
          props.setData({
            ...props.data,
            employees: {
              total: r.data.data?.length || 0,
              totalOnline: totalOnline,
              list: r.data.data,
            },
          });
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }, 1000);
  }, [props.refresh]);

  const RegisterEmployee = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [registerData, setRegisterData] = useState({
      username: '',
      password: '',
    });
    const [isCreatingAcount, setIsCreatingCashierAccount] = useState(false);

    function signUp(e) {
      e.preventDefault();

      console.log('Creating Employee Account...');
      // console.log(registerData);
      // console.log(authTokenValue);
      setIsCreatingCashierAccount(true);

      const cashierRegisterAPI = new URL(
        `${baseURL}/api/v1/users/cashier/register`
      );

      axios
        .post(cashierRegisterAPI, registerData, {
          headers: { Authorization: `Bearer ${token}` },
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
            onClose();
            props.setRefresh(!props.refresh);
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
                    <AlertIcon alignSelf={'flex-start'} />
                    This registered account will be your employees account of
                    this shop.
                  </Alert>

                  <form id="signUpForm">
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
      <HStack
        className="dashboardLabel"
        style={{ width: '100%', justifyContent: 'space-between' }}
      >
        <Text fontWeight={'bold'} opacity={0.5}>
          Employees
        </Text>
        <Link to={'/vendere-app/employees'}>
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
        pb={3}
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
          {!loading ? (
            <HStack>
              <Text fontWeight={'bold'}>
                {props.data?.employees?.total?.toLocaleString()}
              </Text>
              <Text mt={'0px !important'} color={'var(--p-200)'}>
                Total Employees
              </Text>
            </HStack>
          ) : (
            <HStack w={'150px'}>
              <Skeleton h={'10px'} />
            </HStack>
          )}

          {!loading ? (
            <HStack>
              <Badge
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50px',
                }}
                colorScheme={'green'}
              ></Badge>
              <Text>{props.data?.employees.totalOnline}</Text>
              <Text opacity={'0.5'}>Online</Text>
            </HStack>
          ) : (
            <HStack w={'100px'}>
              <Skeleton h={'10px'} />
            </HStack>
          )}
        </HStack>

        <VStack w={'100%'}>
          {!loading
            ? props.data?.employees?.list?.map((emp, index) => {
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
                      <Text mt={'0px !important'}>{emp.username}</Text>
                      <Text style={{ color: 'var(--p-200)', marginTop: '0' }}>
                        {emp.role}
                      </Text>
                    </VStack>
                  </HStack>
                );
              }) || (
                <VStack h={'300px'} justifyContent={'center'} opacity={0.2}>
                  <Icon as={PersonOffOutlinedIcon} fontSize={'10rem'} />
                  <Text fontSize={'x-large'} fontWeight={'bold'}>
                    No Employees
                  </Text>
                </VStack>
              )
            : employeesSkeletonLength.map((val, index) => {
                return <Skeleton key={index} h={'70px'} />;
              })}
        </VStack>

        <RegisterEmployee />
      </VStack>
    </VStack>
  );
};

const LDashboard = props => {
  const [loading, setLoading] = useState(false);
  const baseURL = 'http://localhost:8080';
  const token = Cookies.get('_auth');
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });
  const employeesSkeletonLength = ['', '', ''];

  useEffect(() => {
    const getMonthReportAPI = `${baseURL}/api/v1/rekap/days`;
    setLoading(true);

    function getMonthReport() {
      axios
        .get(getMonthReportAPI, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          console.log(r);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }

    setTimeout(() => {
      getMonthReport();
    }, 1000);
  }, [props.refresh]);

  return (
    <VStack mt={'16px !important'} w={'100%'} alignItems={'flex-start'}>
      <Text className="dashboardLabel" fontWeight={'bold'} opacity={0.5}>
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
              {props?.data?.currentMonth?.totalRevenue?.toLocaleString() ||
                'Null'}
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
              {props?.data?.currentMonth?.totalExpenses?.toLocaleString() ||
                'Null'}
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

export { RDashboard, LDashboard };
