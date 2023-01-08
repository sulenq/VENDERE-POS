import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ButtonGroup,
  Button,
  HStack,
  Text,
  Box,
  Stack,
  Image,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Icon,
  FormControl,
  Input,
  FormLabel,
  useColorMode,
  Divider,
  VStack,
} from '@chakra-ui/react';
import '../css/landingPage.css';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircle';
import GoogleIcon from '@mui/icons-material/Google';

import { ColorModeIconButton } from '../components/ColorModeSwitcher';

export default function Home() {
  const navigate = useNavigate();
  const vendereApp = () => {
    navigate('/vendere-app/cashier');
  };

  const { colorMode } = useColorMode();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const SignUp = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const usernameSignup = useRef(null);

    return (
      <>
        <Button onClick={onOpen} className="btn" colorScheme={'yellow'}>
          SIGN UP
        </Button>
        <Modal
          initialFocusRef={usernameSignup}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay
            bg="#00000070"
            backdropFilter="auto"
            backdropBlur="5px"
          />

          <ModalContent borderRadius={12}>
            <ModalHeader>
              <HStack>
                <Icon as={AccountCircleRoundedIcon} fontSize={'xx-large'} />
                <Text>Create Your Account</Text>
              </HStack>
            </ModalHeader>

            <ModalBody pb={6}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  ref={usernameSignup}
                  placeholder="e.g Marco Leo"
                  _focusVisible={{ border: '2px solid #fdd100' }}
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>E-mail</FormLabel>
                <Input
                  placeholder="e.g marcoleo@email.com"
                  _focusVisible={{ border: '2px solid #fdd100' }}
                />
              </FormControl>
              <FormControl mt={4} isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type={'password'}
                  placeholder="Type strong password"
                  _focusVisible={{ border: '2px solid #fdd100' }}
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
              bg={colorMode === 'light' ? '#f1f1f1' : '#1a202c'}
              borderRadius={'0 0 10px 10px'}
            >
              <ButtonGroup>
                <Button
                  className="btn"
                  onClick={onClose}
                  variant={'ghost'}
                  colorScheme={'blackAlpha'}
                >
                  Cancel
                </Button>

                <Button className="btn" colorScheme="yellow">
                  Create Account
                </Button>
              </ButtonGroup>
            </ModalFooter>
          </ModalContent>
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
        <Text fontSize={'lg'} fontWeight={'bold'} color={'white'}>
          VENDERE
        </Text>
        <ButtonGroup>
          <ColorModeIconButton />

          <SignUp />

          <Button className="btn" colorScheme={'yellow'} onClick={vendereApp}>
            SIGN IN
          </Button>
        </ButtonGroup>
      </HStack>

      <Box id="hero" position={'relative'}>
        <Image
          opacity={'.5'}
          src="./assets/vendere.png"
          position={'absolute'}
          w={'100%'}
          top={'2rem'}
        />
        <Stack
          position={'absolute'}
          direction={screenWidth <= 820 ? 'column' : 'row-reverse'}
          justifyContent={'center'}
          alignItems={'center'}
          w={'100%'}
          h={'100%'}
        >
          <Box w={'100%'} ml={'100px!important'}>
            <Image w={'100%'} src="./assets/toko.png" alt="hero" />
          </Box>

          <Text
            fontSize={'4rem'}
            fontWeight={'bold'}
            lineHeight={'4.5rem'}
            color={'white'}
            px={'16px'}
          >
            Responsive, powerful system to grow your bussiness
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}
