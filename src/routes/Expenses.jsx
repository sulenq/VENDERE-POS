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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';

// MUI Icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

// My Component
import ResponsiveNav from '../components/ResponsiveNav';
import { SearchBox, Textarea } from '../components/Inputs';
import { PrimaryButton } from '../components/Buttons';
import { ActionTopBar } from '../components/ActionTopBar';
import { ModalContent, ModalFooter, ModalOverlay } from '../components/Modals';
import { Input } from '../components/Inputs';
import { ExpensesList, ExpenseDetails } from '../components/ExpensesComponents';

export default function Expenses(props) {
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
      const selectedKey = document.querySelector(
        `.items > :nth-child(${index}) .expensesID`
      )?.textContent;

      const dateOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      };

      selectedItem = data.find(item => {
        return item.ID == selectedKey;
      });
    }

    // console.log(selectedItem);

    if (selectedItem) {
      const keyElm = document.querySelectorAll('.items > div > .expensesID');
      keyElm.forEach((key, index) => {
        // console.log(selectedItem.ID, key);
        if (key.textContent == selectedItem.ID) {
          setItemIndex(index + 1);
        }
      });

      function selectedItemStruct(selectedItem) {
        const CreatedAt = new Date(selectedItem.CreatedAt);

        const UpdatedAt = new Date(selectedItem.UpdatedAt);

        const DeletedAt = new Date(selectedItem.DeletedAt);

        const formattedCreatedAt = CreatedAt.toLocaleDateString(
          'id-ID',
          dateOptions
        );

        const formattedUpdatedAt = UpdatedAt.toLocaleDateString(
          'id-ID',
          dateOptions
        );

        const formattedDeletedAt = DeletedAt.toLocaleDateString(
          'id-ID',
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

  function reverseFormatNumber(num) {
    let cleanedString;
    const validNums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const isNumValid = validNums.some(validNum => num.includes(validNum));
    if (isNumValid) {
      const numCapped = num.substring(0, 19);
      cleanedString = numCapped.replace(/\./g, '');
    } else {
      cleanedString = '0';
    }
    return cleanedString;
  }

  function formatNum(num) {
    let formattedNum;
    if (num != 0) {
      formattedNum = num.toLocaleString('id-ID');
    } else {
      formattedNum = '';
    }

    return formattedNum;
  }

  //* Add Expenses Section
  const AddExpenses = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [registerData, setRegisterData] = useState({
      jenis: 'Lain-lain',
      total: 0,
      notes: '',
    });
    const [isCreatingAcount, setIsCreatingCashierAccount] = useState(false);

    const expenseTypeList = [
      'Pembelian',
      'Beban Angkut',
      'Beban Listrik',
      'Beban Sewa',
      'Beban Telepon',
      'Penyesuaian Persediaan',
      'Lain-lain',
      'Prive',
    ];

    function addExpense(e) {
      e.preventDefault();

      console.log('Adding Expenses...');
      // console.log(registerData);
      // console.log(authTokenValue);
      setIsCreatingCashierAccount(true);
      const token = Cookies.get('_auth');
      const createExpenseAPI = new URL(`${baseURL}/api/v1/bebans/create`);

      axios
        .post(createExpenseAPI, registerData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          console.log(r);
          if (r.status === 201) {
            setRegisterData({
              jenis: '',
              total: 0,
              notes: '',
            });
            toast({
              position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
              title: 'Expense added',
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
              title: 'Sorry, fail add expense.',
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
      <HStack w={'100%'}>
        <PrimaryButton
          w={'100%'}
          label={'Expense'}
          onClick={onOpen}
          // size={'sm'}
          // mr={'-8px !important'}
        />

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />

          <ModalContent
            content={
              <>
                <ModalHeader px={4}>
                  <HStack>
                    <Icon
                      as={MonetizationOnOutlinedIcon}
                      fontSize={'xx-large'}
                    />
                    <Text>Adding New Expense</Text>
                  </HStack>
                </ModalHeader>

                <ModalBody pb={6}>
                  <Alert
                    borderRadius={'8px'}
                    status="warning"
                    variant={'left-accent'}
                  >
                    <AlertIcon alignSelf={'flex-start'} mt={'2px !important'} />
                    Make sure to double check your input before submit, you
                    cannot undo this action.
                  </Alert>

                  <FormControl mt={4} isRequired>
                    <FormLabel>Expense Type</FormLabel>
                    <Menu>
                      <MenuButton
                        as={Button}
                        pr={1}
                        w={'100%'}
                        textAlign="left"
                        variant={'outline'}
                        rightIcon={<ArrowDropDownIcon />}
                        _hover={{
                          background:
                            colorMode === 'light'
                              ? 'var(--light-dim)'
                              : 'var(--p-300)',
                        }}
                        _active={{
                          background:
                            colorMode === 'light'
                              ? 'var(--p-75)'
                              : 'var(--p-350)',
                        }}
                      >
                        {registerData.jenis}
                      </MenuButton>

                      <MenuList
                        minWidth={'100%'}
                        zIndex={99}
                        bg={
                          colorMode === 'light' ? 'var(--p-50)' : 'var(--p-400)'
                        }
                      >
                        {expenseTypeList.map((expenseType, index) => {
                          return (
                            <MenuItem
                              key={expenseType + index}
                              bg={'transparent'}
                              _hover={{
                                background:
                                  colorMode === 'light'
                                    ? 'var(--light-dim)'
                                    : 'var(--p-300)',
                              }}
                              onClick={() => {
                                setRegisterData({
                                  ...registerData,
                                  jenis: expenseType,
                                });
                              }}
                            >
                              {expenseType}
                            </MenuItem>
                          );
                        })}
                      </MenuList>
                    </Menu>
                  </FormControl>

                  <FormControl mt={4} isRequired>
                    <FormLabel>Total</FormLabel>
                    <Input
                      placeholder="e.g. 20.000"
                      // type={'number'}
                      value={formatNum(registerData.total)}
                      onChange={e => {
                        setRegisterData({
                          ...registerData,
                          total: parseInt(reverseFormatNumber(e.target.value)),
                        });
                      }}
                      onKeyUp={e => {
                        if (e.key === 'Enter') {
                          document.querySelector('#addExpenseBtn').click();
                        }
                      }}
                    />
                  </FormControl>

                  <FormControl mt={4} isRequired>
                    <FormLabel>Notes</FormLabel>
                    <Textarea
                      placeholder={'Write some note here'}
                      onChange={e => {
                        setRegisterData({
                          ...registerData,
                          notes: e.target.value,
                        });
                      }}
                    />
                  </FormControl>
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
                          id={'addExpenseBtn'}
                          label={'Add Expense'}
                          onClick={addExpense}
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
      alignItems={'center'}
      justifyContent={'flex-end'}
    >
      <ResponsiveNav active={'Expenses'} />

      <VStack
        id="appContentWrapper"
        w={screenWidth <= 1000 ? '100%' : 'calc(100% - 90px)'}
        bg={colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-400a)'}
        h={'100%'}
        ml={'0px !important'}
        p={2}
        alignItems={'flex-start'}
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
              borderRadius: '20px',
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
                <Icon as={MonetizationOnOutlinedIcon} />
                <Text fontWeight={'bold'}>All Expenses</Text>
              </HStack>
            </HStack>

            {/* Search Box */}
            <HStack px={3} w={'100%'}>
              <SearchBox
                data={data}
                placeholder={'Search expense by date, total or type'}
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
                DATE
              </Text>
              <Text fontWeight={'bold'} w={'50%'}>
                SUMMARY
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
            <ExpensesList
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
              <AddExpenses />
            </HStack>
          </VStack>

          {/* Item Details */}
          {screenWidth <= 1000 ? null : (
            <ExpenseDetails
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
