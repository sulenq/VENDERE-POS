import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import {
  useToast,
  HStack,
  useColorMode,
  VStack,
  Text,
  useDisclosure,
  ButtonGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Icon,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

// MUI Icons
import PeopleAltOutlined from '@mui/icons-material/PeopleOutlined';

// My Component
import ResponsiveNav from '../components/ResponsiveNav';
import { SearchBox } from '../components/Inputs';
import { PrimaryButton, PrimaryButtonOutline } from '../components/Buttons';
import { ActionTopBar } from '../components/ActionTopBar';
import { Stat } from '../components/Data';
import { ModalContent, ModalFooter, ModalOverlay } from '../components/Modals';
import { Input, InputNumber } from '../components/Inputs';
import { Skeleton } from '../components/Skeleton';
import {
  EmployeesList,
  EmployeeDetails,
} from '../components/EmployeesComponents';

export default function Employees(props) {
  const baseURL = 'http://localhost:8080';
  const toast = useToast();
  const { colorMode } = useColorMode();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
  });

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [itemIndex, setItemIndex] = useState(1);
  const [itemsLength, setItemsLength] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [refresh, setRefresh] = useState(true);

  const dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  function selectItem({ item, index }) {
    let selectedItem;

    if (item) {
      selectedItem = item;
    } else {
      const selectedID = document.querySelector(
        `.items > :nth-child(${index}) p`
      )?.textContent;

      selectedItem = data.find(item => {
        return item.ID == selectedID;
      });
    }

    // console.log(selectedItem);

    if (selectedItem) {
      const itemIdElm = document.querySelectorAll('.items > div > p');
      itemIdElm.forEach((itemId, index) => {
        if (itemId.textContent == selectedItem.ID) {
          setItemIndex(index + 1);
        }
      });

      function selectedItemStruct(selectedItem) {
        const CreatedAt = new Date(selectedItem.CreatedAt);

        const UpdatedAt = new Date(selectedItem.UpdatedAt);

        const DeletedAt = new Date(selectedItem.DeletedAt);

        const formattedCreatedAt = CreatedAt.toLocaleDateString(
          undefined,
          dateOptions
        );

        const formattedUpdatedAt = UpdatedAt.toLocaleDateString(
          undefined,
          dateOptions
        );

        const formattedDeletedAt = DeletedAt.toLocaleDateString(
          undefined,
          dateOptions
        );

        const selectedItemToSet = {
          ...selectedItem,
          CreatedAt: formattedCreatedAt,
          UpdatedAt: formattedUpdatedAt,
          DeletedAt: formattedDeletedAt,
        };

        const keys = Object.keys(selectedItemToSet);
        const selectedItemToReturn = { ...selectedItemToSet, keys: keys };

        return selectedItemToReturn;
      }

      const selectedItemToSet = selectedItemStruct(selectedItem);

      setSelectedItem(selectedItemToSet);
    }
  }

  //* Keydown event (arrow up & down) focus to searchBox
  document.documentElement.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!screenWidth <= 1000) {
        const itemSearchBox = document.querySelector('#itemSearchBox');
        itemSearchBox?.focus();
      }
    }
  });

  //* Register Employee Section
  const RegisterEmployee = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

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
      const token = Cookies.get('_auth');
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
            setIsCreatingCashierAccount(false);
            setRefresh(!refresh);
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
          setIsCreatingCashierAccount(false);
        });
    }

    return (
      <HStack px={1} w={'100%'}>
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
                <ModalHeader px={4}>
                  <HStack>
                    <Icon as={PeopleAltOutlined} fontSize={'xx-large'} />
                    <Text>Signing Up Employee's Account</Text>
                  </HStack>
                </ModalHeader>

                <ModalBody pb={6}>
                  <Alert
                    borderRadius={'8px'}
                    status="info"
                    variant={'left-accent'}
                  >
                    <AlertIcon alignSelf={'flex-start'} mt={'2px !important'} />
                    This registered account will be your employees account of
                    this shop.
                  </Alert>

                  <form id="signUpForm">
                    <FormControl mt={4} isRequired>
                      <FormLabel>Username</FormLabel>
                      <Input
                        placeholder="e.g Jolitos Kurniawan"
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
                          colorScheme={
                            colorMode === 'light' ? 'blackAlpha' : 'gray'
                          }
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
      </HStack>
    );
  };

  return (
    <HStack
      className="vendereApp"
      p={screenWidth <= 1000 ? 0 : 4}
      alignItems={'center'}
    >
      <ResponsiveNav active={'Employees'} />

      <VStack
        id="appContentWrapper"
        ml={'0px !important'}
        h={'100%'}
        style={{
          background:
            colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-400a)',
          borderRadius: screenWidth <= 1000 ? 0 : '12px',
          width: screenWidth <= 1000 ? '100%' : 'calc(100% - 200px)',
          paddingTop: 6,
          padding: 8,
          height: '100%',
          alignItems: 'flex-start',
        }}
      >
        <ActionTopBar />

        <HStack h={'calc(100% - 40px)'} w={'100%'} mt={'4px !important'}>
          {/* Items Section */}
          <VStack
            style={{
              width: screenWidth <= 1000 ? '100%' : '50%',
              height: '100%',
              overflowY: 'auto',
              paddingBottom: screenWidth <= 1000 ? '66px' : '',
              borderRadius: '12px',
              background:
                colorMode === 'light' ? 'var(--p-50)' : 'var(--p-400a)',
            }}
            py={3}
          >
            {/* Title */}
            <HStack
              alignSelf={'flex-start'}
              px={3}
              w={'100%'}
              justifyContent={'space-between'}
              mb={1}
            >
              <HStack opacity={0.5}>
                <Icon as={PeopleAltOutlined} />
                <Text fontWeight={'bold'}>All Employees</Text>
              </HStack>
            </HStack>

            {/* Search Box */}
            <HStack px={3} w={'100%'}>
              <SearchBox
                data={data}
                placeholder={'Search employee by username or id'}
                search={search}
                itemsLength={itemsLength}
                setItemsLength={setItemsLength}
                itemIndex={itemIndex}
                setItemIndex={setItemIndex}
                selectItem={selectItem}
                onChange={e => {
                  setSearch(e.target.value);
                }}
              />
            </HStack>

            {/* Heading */}
            <HStack fontSize={'sm'} w={'100%'} py={2} pl={4} pr={6}>
              <Text fontWeight={'bold'} w={'30%'}>
                ID
              </Text>
              <Text fontWeight={'bold'} w={'50%'}>
                ACCOUNT
              </Text>
              <Text
                fontWeight={'bold'}
                w={'21%'}
                textAlign={'center'}
                ml={'0px !important'}
              >
                ACTION
              </Text>
            </HStack>

            {/* Items */}
            <EmployeesList
              data={data}
              setData={setData}
              setItemIndex={setItemIndex}
              selectItem={selectItem}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              search={search}
              refresh={refresh}
              setRefresh={setRefresh}
            />

            <HStack w={'100%'} px={3} mt={'0px !important'} pt={3}>
              <RegisterEmployee />
            </HStack>
          </VStack>

          {/* Item Details */}
          {screenWidth <= 1000 ? null : (
            <EmployeeDetails
              setSelectedItem={setSelectedItem}
              selectedItem={selectedItem}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}
        </HStack>
      </VStack>
    </HStack>
  );
}
