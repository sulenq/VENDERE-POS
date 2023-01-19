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

  const [loginEmail, setLoginEmail] = useState();
  const [loginPassword, setLoginPassword] = useState();

  const SignUp = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const registerFirstFocus = useRef();

    const [registerUserType, setRegisterUserType] = useState('cashier');
    const [registerShopName, setRegisterShopName] = useState();
    const [registerShopCode, setRegisterShopCode] = useState();
    const [registerDisplayName, setRegisterDisplayName] = useState();
    const [registerEmail, setRegisterEmail] = useState();
    const [registerPassword, setRegisterPassword] = useState();

    function signUp() {
      const URL = 'http://localhost:8080/api/v1/users/login';
      let data;

      switch (registerUserType) {
        case 'admin':
          data = {
            userType: registerUserType,
            shopName: registerShopName,
            displayName: registerDisplayName,
            email: registerEmail,
            password: registerPassword,
          };
          break;
        case 'cashier':
          data = {
            userType: registerUserType,
            shopCode: registerShopCode,
            displayName: registerDisplayName,
            email: registerEmail,
            password: registerPassword,
          };
          break;
      }

      fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(responseData => {
          console.log(responseData);
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

                <ModalBody py={6}>
                  <form id="signUpForm">
                    <FormControl isRequired>
                      <FormLabel>Sign Up as</FormLabel>
                      <Select
                        ref={registerFirstFocus}
                        _focusVisible={{ border: '2px solid #fdd100' }}
                        onChange={e => {
                          setRegisterUserType(e.target.value);
                        }}
                        value={registerUserType}
                      >
                        <option value="admin">Admin</option>
                        <option value="cashier">Cashier</option>
                      </Select>
                    </FormControl>

                    {registerUserType === 'admin' ? '' : ''}

                    <FormControl mt={4} isRequired>
                      <FormLabel>Name</FormLabel>
                      <Input
                        placeholder="e.g Marco Leo"
                        _focusVisible={{ border: '2px solid #fdd100' }}
                        onChange={e => {
                          setRegisterDisplayName(e.target.value);
                        }}
                      />
                    </FormControl>
                    <FormControl mt={4} isRequired>
                      <FormLabel>E-mail</FormLabel>
                      <Input
                        placeholder="e.g marcoleo@email.com"
                        _focusVisible={{ border: '2px solid #fdd100' }}
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
                        _focusVisible={{ border: '2px solid #fdd100' }}
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
                          type="submit"
                          form="signUpForm"
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

  const SignIn = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const emailSignIn = useRef();

    function signIn() {
      const URL = 'http://localhost:8080/api/v1/users/login';
      let data = {
        email: loginEmail,
        password: loginPassword,
      };

      fetch(URL, {
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
                  <FormControl mt={4} isRequired>
                    <FormLabel>E-mail</FormLabel>
                    <Input
                      ref={emailSignIn}
                      placeholder="e.g marcoleo@email.com"
                      _focusVisible={{ border: '2px solid #fdd100' }}
                      onChange={e => setLoginEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl mt={4} isRequired>
                    <FormLabel>Password</FormLabel>
                    <Input
                      type={'password'}
                      placeholder="Type strong password"
                      _focusVisible={{ border: '2px solid #fdd100' }}
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
                          label={'Sign In'}
                          onClick={toVendereApp}
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
    <Box
      className="landingPage"
      p={screenWidth <= 820 ? '16px 0' : '16px 100px'}
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
