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
} from '@chakra-ui/react';
import '../css/landingPage.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircle';
import GoogleIcon from '@mui/icons-material/Google';

import { ColorModeIconButton } from '../components/ColorModeSwitcher';
import { PrimaryButton } from '../components/Buttons';
import { ModalOverlay, ModalContent, ModalFooter } from '../components/Modals';

export default function Home() {
  const DOMAIN_API = 'http://localhost:8080';

  const navigate = useNavigate();

  function toVendereApp() {
    navigate('/vendere-app/cashier');
  }

  const { colorMode } = useColorMode();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const [dataLogin, setDataLogin] = useState(null);

  // SIGN UP SECTION
  const SignUp = () => {
    const [registerShopName, setRegisterShopName] = useState(null);
    const [registerEmail, setRegisterEmail] = useState(null);
    const [registerPassword, setRegisterPassword] = useState();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const registerFirstFocus = useRef();

    function signUp(e) {
      e.preventDefault();
      const adminRegisterAPI = new URL(
        `${DOMAIN_API}/api/v1/users/admin/register`
      );

      const data = {
        shop_name: registerShopName,
        email: registerEmail,
        password: registerPassword,
      };

      fetch(adminRegisterAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData);
          // navigate('/vendere-app');
        });
    }

    return (
      <>
        <PrimaryButton label="SIGN UP" onClick={onOpen} />

        <Modal
          initialFocusRef={registerFirstFocus}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />

          <ModalContent
            content={
              <>
                <ModalHeader>
                  <HStack>
                    <Icon as={AccountCircleRoundedIcon} fontSize={'xx-large'} />
                    <Text>Create Your Account</Text>
                  </HStack>
                </ModalHeader>

                <ModalBody pb={6}>
                  <form id="signUpForm">
                    <FormControl mt={4} isRequired>
                      <FormLabel>Shop's Name</FormLabel>
                      <Input
                        placeholder="e.g Kiosk Melati"
                        onChange={e => {
                          setRegisterShopName(e.target.value);
                        }}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired>
                      <FormLabel>E-mail</FormLabel>
                      <Input
                        placeholder="e.g marcoleo@email.com"
                        onChange={e => {
                          setRegisterEmail(e.target.value);
                        }}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type={'password'}
                        placeholder="Type strong password"
                        onChange={e => {
                          setRegisterPassword(e.target.value);
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
                  >
                    Login with Google
                  </Button>
                </ModalBody>

                <ModalFooter
                  content={
                    <>
                      <ButtonGroup>
                        <Button
                          className="btn"
                          onClick={onClose}
                          variant={'ghost'}
                        >
                          Cancel
                        </Button>
                        <PrimaryButton
                          label={'Create Account'}
                          onClick={signUp}
                          isLoading={false}
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
    const [loginRole, setLoginRole] = useState('admin');
    const [loginUsername, setLoginUsername] = useState(null);
    const [loginPassword, setLoginPassword] = useState(null);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const emailSignIn = useRef();

    function selectLoginRole(e) {
      const role = e.target.value;
      setLoginRole(role);
      console.log(role);
    }

    function adminSignIn() {
      console.log('admin login');
      const adminLoginAPI = new URL(`${DOMAIN_API}/api/v1/users/admin/login`);

      let data = {
        email: loginUsername,
        password: loginPassword,
      };

      fetch(adminLoginAPI, {
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

    function cashierSignIn() {
      console.log('cashier login');

      const adminLoginAPI = new URL(`${DOMAIN_API}/api/v1/users/cashier/login`);

      let data = {
        username: loginUsername,
        password: loginPassword,
      };

      fetch(adminLoginAPI, {
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

    return (
      <>
        <PrimaryButton label={'SIGN IN'} onClick={onOpen} />

        <Modal initialFocusRef={emailSignIn} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />

          <ModalContent
            content={
              <>
                <ModalHeader>
                  <HStack>
                    <Icon as={AccountCircleRoundedIcon} fontSize={'xx-large'} />
                    <Text>Let's Get into Bussiness</Text>
                  </HStack>
                </ModalHeader>

                <ModalBody pb={6}>
                  <form id="loginForm">
                    <FormControl mt={4} isRequired>
                      <FormLabel>Login As...</FormLabel>
                      <Select onChange={selectLoginRole}>
                        <option value={'admin'}>Admin</option>
                        <option value={'cashier'}>Cashier</option>
                      </Select>
                    </FormControl>
                    <FormControl mt={4} isRequired>
                      <FormLabel>E-mail / Username</FormLabel>
                      <Input
                        className="inputBox"
                        ref={emailSignIn}
                        placeholder="e.g marcoleo@email.com"
                        onChange={e => setLoginUsername(e.target.value)}
                      />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                      <FormLabel>Password</FormLabel>
                      <Input
                        type={'password'}
                        placeholder="Type your password"
                        onChange={e => setLoginPassword(e.target.value)}
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
                    >
                      Login with Google
                    </Button>
                  </form>
                </ModalBody>

                <ModalFooter
                  content={
                    <>
                      <ButtonGroup>
                        <Button
                          className="btn"
                          onClick={onClose}
                          variant={'ghost'}
                        >
                          Cancel
                        </Button>
                        <PrimaryButton
                          type={'submit'}
                          form={'loginForm'}
                          label={'Sign In'}
                          onClick={
                            loginRole === 'admin' ? adminSignIn : cashierSignIn
                          }
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
    <Box
      className="landingPage"
      p={screenWidth <= 1000 ? '16px 0' : '16px 100px'}
    >
      <HStack justifyContent={'space-between'} px={'24px'}>
        <Text fontSize={'lg'} fontWeight={'bold'}>
          VENDERE
        </Text>
        <ButtonGroup>
          <ColorModeIconButton />

          <SignUp />

          <SignIn />
        </ButtonGroup>
      </HStack>

      <VStack id="hero" position={'relative'} justifyContent={'center'} px={10}>
        <Text fontSize={'xxx-large'} fontWeight={'bold'} lineHeight={'3.75rem'}>
          Responsive, powerful system to grow your bussiness
        </Text>
      </VStack>
    </Box>
  );
}
