import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ButtonGroup,
  Button,
  HStack,
  Text,
  Box,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalBody,
  Icon,
  FormControl,
  Input,
  FormLabel,
  useColorMode,
  Divider,
  VStack,
  Select,
  useToast,
  Avatar,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

import { useSignIn, useAuthUser, useIsAuthenticated } from 'react-auth-kit';

import '../css/landingPage.css';

// MUI Icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import GoogleIcon from '@mui/icons-material/Google';

import { ColorModeIconButton } from '../components/ColorModeSwitcher';
import { PrimaryButton, PrimaryButtonOutline } from '../components/Buttons';
import { ModalOverlay, ModalContent, ModalFooter } from '../components/Modals';

export default function LandingPage() {
  const DOMAIN_API = 'http://localhost:8080';

  // to vendere app if still logged in
  // function checkAuthCookie() {
  //   // Get all cookies
  //   const cookies = document.cookie.split(';');

  //   // Check if _auth cookie exists and is not empty
  //   const authCookie = cookies.find(cookie =>
  //     cookie.trim().startsWith('_auth=')
  //   );
  //   if (authCookie && authCookie.split('=')[1].trim() !== '') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  // useEffect(() => {
  //   if (checkAuthCookie()) {
  //     navigate('/vendere-app');
  //   }
  // }, []);

  const auth = useAuthUser();
  const isAuthenticated = useIsAuthenticated();
  const navigate = useNavigate();
  const toast = useToast();

  const { colorMode } = useColorMode();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  // Coming Soon Toast
  function comingSoon() {
    toast({
      position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
      duration: 2000,
      title: 'Coming Soon! ╰(*°▽°*)╯ 💻',
      description: 'we are working on it for you.',
      isClosable: true,
    });
  }

  // SIGN UP SECTION
  const SignUp = () => {
    function toastRegisterStatus(r) {
      console.log(r);
      if (r.data.error) {
        toast({
          position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
          title: 'Sorry, fail to create account.',
          description: r.data.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else if (r.data.code === 201 && r.status === 'Created') {
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

    const [registerData, setRegisterData] = useState({
      shop_name: '',
      email: '',
      password: '',
    });

    const [isCreateAccountLoading, setIsCreateAccountLoading] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    function signUp(e) {
      e.preventDefault();
      console.log('Creating Account...');
      console.log(registerData);
      setIsCreateAccountLoading(true);

      //! Simulasi loading
      setTimeout(() => {
        const adminRegisterAPI = new URL(
          `${DOMAIN_API}/api/v1/users/admin/register`
        );

        fetch(adminRegisterAPI, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerData),
        })
          .then(response => response.json())
          .then(responseData => {
            setRegisterData({
              shop_name: '',
              email: '',
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
        <PrimaryButtonOutline
          id={'signUpBtn'}
          label="SIGN UP"
          onClick={onOpen}
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
                    <Text>Create Your Account</Text>
                  </HStack>
                </ModalHeader>

                <ModalBody pb={6}>
                  <Alert
                    borderRadius={'8px'}
                    status="info"
                    variant={'left-accent'}
                  >
                    Here you will register your shop and this registered account
                    will be admin account of this shop.
                  </Alert>

                  <form id="signUpForm">
                    <FormControl mt={4} isRequired>
                      <FormLabel>Shop's Name</FormLabel>
                      <Input
                        placeholder="e.g Kiosk Melati"
                        value={registerData.shop_name}
                        onChange={e => {
                          setRegisterData({
                            ...registerData,
                            shop_name: e.target.value,
                          });
                        }}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired>
                      <FormLabel>E-mail</FormLabel>
                      <Input
                        placeholder="e.g marcoleo@email.com"
                        value={registerData.email}
                        onChange={e => {
                          setRegisterData({
                            ...registerData,
                            email: e.target.value,
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

                  <HStack my={4} w={'100%'}>
                    <Divider />
                    <Text>or</Text>
                    <Divider />
                  </HStack>

                  <Button
                    w={'100%'}
                    py={6}
                    leftIcon={<GoogleIcon />}
                    variant={'outline'}
                    onClick={comingSoon}
                  >
                    Sign In with Google
                  </Button>
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

  // SIGN IN SECTION
  const SignIn = () => {
    const signIn = useSignIn();

    const [isSignInLoading, setIsSignInLoading] = useState(false);

    const [loginRole, setLoginRole] = useState('admin');
    function selectLoginRole(e) {
      const role = e.target.value;
      setLoginRole(role);
    }

    const [loginData, setLoginData] = useState({
      username: '',
      password: '',
    });

    function adminSignIn(e) {
      e.preventDefault();
      console.log('Loging in as Admin...');
      setIsSignInLoading(true);

      //!Simulasi Loading
      setTimeout(() => {
        const adminLoginAPI = new URL(`${DOMAIN_API}/api/v1/users/admin/login`);

        let data = {
          role: loginRole,
          email: loginData.username,
          password: loginData.password,
        };

        fetch(adminLoginAPI, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(r => {
            console.log(r);
            if (r.data.error) {
              if (r.data.error === 'password not match') {
                setLoginData({ ...loginData, password: '' });
              } else {
                setLoginData({ username: '', password: '' });
              }
              toast({
                position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
                title: 'Sorry, fail to sign in',
                description: r.data.error,
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            } else if (r.code === 200 && r.status === 'OK') {
              console.log('logged in');
              signIn({
                token: r.data.tokenCookie,
                tokenType: 'Bearer',
                expiresIn: 300,
                authState: {
                  userId: r.data.user_id,
                  displayName: r.data.nama,
                  userRole: r.data.role,
                },
              });
              navigate('/vendere-app');
            }
          })
          .catch(err => {
            if (err) {
              toast({
                position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
                title: 'Sorry, fail to sign in',
                description: 'internet problem, please check your connection',
                status: 'error',
                duration: 5000,
                isClosable: true,
              });
            }
          })
          .finally(setIsSignInLoading(false));
      }, 1000);
      //!Simulasi Loading
    }

    function cashierSignIn() {
      console.log('cashier login');
      const cashierLoginAPI = new URL(
        `${DOMAIN_API}/api/v1/users/cashier/login`
      );

      let data = {
        role: loginRole,
        username: loginData.username,
        password: loginData.password,
      };

      fetch(cashierLoginAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
    }

    function toSignUp() {
      const signUpBtn = document.querySelector('#signUpBtn');
      signUpBtn.click();
    }

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <PrimaryButton label={'SIGN IN'} onClick={onOpen} />

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />

          <ModalContent
            id="signInModal"
            content={
              <>
                <ModalHeader>
                  <HStack>
                    <Icon as={StorefrontOutlinedIcon} fontSize={'xx-large'} />
                    <Text>Let's Get into Bussiness</Text>
                  </HStack>
                </ModalHeader>

                <ModalBody pb={6}>
                  <form id="loginForm">
                    <FormControl mt={4} isRequired>
                      <FormLabel>Sign In As...</FormLabel>
                      <Select onChange={selectLoginRole}>
                        <option value={'admin'}>Admin</option>
                        <option value={'cashier'}>Cashier</option>
                      </Select>
                    </FormControl>

                    <FormControl mt={4} isRequired>
                      <FormLabel>E-mail / Username</FormLabel>
                      <Input
                        className="inputBox"
                        placeholder="e.g marcoleo@email.com / marcoleo"
                        value={loginData.username}
                        onChange={e =>
                          setLoginData({
                            ...loginData,
                            username: e.target.value,
                          })
                        }
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type={'password'}
                        placeholder="Type your password"
                        value={loginData.password}
                        onChange={e =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                      />
                    </FormControl>

                    <HStack my={4} w={'100%'}>
                      <Divider />
                      <Text>or</Text>
                      <Divider />
                    </HStack>

                    <Button
                      w={'100%'}
                      py={6}
                      leftIcon={<GoogleIcon />}
                      variant={'outline'}
                      onClick={comingSoon}
                    >
                      Sign In with Google
                    </Button>
                  </form>

                  <Text
                    fontSize={'sm'}
                    mt={8}
                    cursor={'pointer'}
                    style={{
                      color:
                        colorMode === 'light' ? 'var(--p-500)' : 'var(--p-300)',
                    }}
                    _hover={{ textDecoration: 'underline' }}
                    onClick={toSignUp}
                  >
                    Don't have account?, let's register yours
                  </Text>
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
                          label={'Sign In'}
                          onClick={
                            loginRole === 'admin' ? adminSignIn : cashierSignIn
                          }
                          isLoading={isSignInLoading}
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

  // Lading Page Main
  return (
    <VStack
      className="landingPage"
      p={screenWidth <= 1000 ? '16px 0' : '16px 100px'}
    >
      <HStack w={'100%'} justifyContent={'space-between'} px={'24px'}>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          VENDERE
        </Text>
        <ButtonGroup>
          <ColorModeIconButton />

          {isAuthenticated() ? (
            <>
              <HStack
                onClick={() => {
                  navigate('/vendere-app');
                }}
                _hover={{ cursor: 'pointer' }}
                style={{
                  border: '2px solid var(--p-500)',
                  borderRadius: '50px',
                  padding: '4px 12px',
                  color: 'var(--p-500)',
                  fontWeight: 'bold',
                }}
              >
                <Avatar style={{ background: 'var(--p-500)' }} size={'xs'} />
                <Text>{auth().displayName}</Text>
              </HStack>
            </>
          ) : (
            <>
              <SignUp />
              <SignIn />
            </>
          )}
        </ButtonGroup>
      </HStack>

      <VStack id="hero" position={'relative'} justifyContent={'center'} px={10}>
        <Text fontSize={'xxx-large'} fontWeight={'bold'} lineHeight={'3.75rem'}>
          Responsive, powerful system to grow your bussiness
        </Text>
      </VStack>
    </VStack>
  );
}
