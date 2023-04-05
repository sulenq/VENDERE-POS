import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useAuthUser } from 'react-auth-kit';
import Cookies from 'js-cookie';

// Chakra UI
import {
  IconButton,
  Icon,
  useColorMode,
  Text,
  VStack,
  HStack,
  Button,
  ButtonGroup,
  Box,
  Divider,
  Input,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';

// MUI Icons
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import RemoveShoppingCartOutlinedIcon from '@mui/icons-material/RemoveShoppingCartOutlined';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import '../css/vendereApp.css';
import { PrimaryButton, PrimaryButtonOutline } from './Buttons';
import { ModalContent, ModalBody, ModalFooter, ModalOverlay } from './Modals';
import { SearchBox, Textarea } from '../components/Inputs';
import { ItemsList } from '../components/Items';

const CartList = ({
  cartList,
  setCartList,
  colorMode,
  total,
  setTotal,
  screenWidth,
}) => {
  function deleteItem(itemCode, itemTotalPrice) {
    const updatedCartList = cartList.filter(item => item.code !== itemCode);
    setCartList(updatedCartList);
    setTotal(total - itemTotalPrice);
    // setChange(pay - (total - itemTotalPrice));
  }

  if (cartList.length > 0) {
    return (
      <Box
        w={'100%'}
        h={'100%'}
        overflow={'hidden'}
        pb={screenWidth <= 1000 ? '64px' : '0px'}
        style={{
          borderBottom:
            colorMode === 'light'
              ? '1px solid var(--light-dim)'
              : '1px solid var(--p-300)',
        }}
      >
        <VStack w={'100%'} className="cartList" px={2} pb={2}>
          {cartList
            .slice(0)
            .reverse()
            .map((item, index) => {
              return (
                <HStack
                  key={index}
                  w={'100%'}
                  py={2}
                  px={4}
                  alignItems={'flex-start'}
                  justifyContent={'space-between'}
                  borderRadius={'8px'}
                  style={{
                    background:
                      colorMode === 'light' ? 'var(--light)' : 'var(--dark)',
                  }}
                >
                  <VStack alignItems={'flex-start'}>
                    <Text fontWeight={'bold'}>{item.name}</Text>
                    <Text m="0 !important">
                      @ {item.price.toLocaleString('id-ID')}
                    </Text>
                  </VStack>

                  <VStack alignItems={'flex-end'}>
                    <Text id={`totalItemPrice${item.code}`} fontWeight={'bold'}>
                      {item.totalPrice.toLocaleString('id-ID')}
                    </Text>

                    <HStack>
                      <IconButton
                        opacity={'.5'}
                        variant={'ghost'}
                        borderRadius={50}
                        icon={<DeleteForeverRoundedIcon />}
                        onClick={() => {
                          const itemQty = document.querySelector(
                            `#qtyCart${item.code}`
                          );
                          deleteItem(
                            item.code,
                            item.price * parseInt(itemQty.value)
                          );
                        }}
                      />

                      {/* Counter Qty */}
                      <IconButton
                        size={'sm'}
                        variant={'ghost'}
                        icon={<RemoveRoundedIcon />}
                        // borderRadius={50}
                        border={'1px solid #ccc'}
                        borderRight={'none'}
                        borderRadius={'10px 0 0 10px'}
                        onClick={() => {
                          const itemQty = document.querySelector(
                            `#qtyCart${item.code}`
                          );
                          if (parseInt(itemQty.value) > 1) {
                            itemQty.value = parseInt(itemQty.value) - 1;
                            setTotal(total - item.price);
                            // setChange(pay - (total - item.price));
                            cartList.forEach(searchItem => {
                              if (searchItem.code === item.code) {
                                searchItem.qty = searchItem.qty - 1;
                                searchItem.totalPrice =
                                  searchItem.price * searchItem.qty;
                                return;
                              }
                            });
                          }
                        }}
                      />

                      <Input
                        id={`qtyCart${item.code}`}
                        border={'1px solid #ccc !important'}
                        borderRadius={'0'}
                        borderRight={'none'}
                        borderLeft={'none'}
                        onFocus={e => e.target.select()}
                        m={'0 !important'}
                        p={'0'}
                        h={'32px'}
                        w={'40px'}
                        textAlign={'center'}
                        type={'number'}
                        value={item.qty}
                        min={1}
                        onChange={e => {
                          let itemQty = parseInt(e.target.value);
                          if (itemQty === 0 || e.target.value === '') {
                            itemQty = 1;
                            e.target.value = 1;
                          }
                          let updateTotal = 0;
                          cartList.forEach(searchItem => {
                            if (searchItem.code === item.code) {
                              searchItem.qty = itemQty;
                              searchItem.totalPrice =
                                searchItem.price * itemQty;
                              updateTotal += searchItem.price * itemQty;
                            } else {
                              updateTotal += searchItem.price * searchItem.qty;
                            }
                          });
                          setTotal(updateTotal);
                          // setChange(pay - updateTotal);
                        }}
                      />

                      <IconButton
                        size={'sm'}
                        variant={'ghost'}
                        icon={<AddRoundedIcon />}
                        border={'1px solid #ccc'}
                        borderLeft={'none'}
                        borderRadius={'0 10px 10px 0'}
                        // borderRadius={50}
                        m={'0 !important'}
                        onClick={() => {
                          const itemQty = document.querySelector(
                            `#qtyCart${item.code}`
                          );
                          itemQty.value = parseInt(itemQty.value) + 1;
                          setTotal(total + item.price);
                          // setChange(pay - (total + item.price));
                          cartList.forEach(searchItem => {
                            if (searchItem.code === item.code) {
                              searchItem.qty = searchItem.qty + 1;
                              searchItem.totalPrice =
                                searchItem.price * searchItem.qty;
                              return;
                            }
                          });
                        }}
                      />
                    </HStack>
                  </VStack>
                </HStack>
              );
            })}
        </VStack>
      </Box>
    );
  } else {
    return (
      <VStack
        w={'100%'}
        h={'100%'}
        justifyContent={'center'}
        pb={24}
        opacity={0.2}
        style={{
          borderBottom:
            colorMode === 'light'
              ? '1px solid var(--light-dim)'
              : '1px solid var(--p-300)',
        }}
      >
        <Icon as={RemoveShoppingCartOutlinedIcon} fontSize={'10rem'} />
        <Text
          cursor={'default'}
          textAlign={'center'}
          w={'100%'}
          fontWeight={'bold'}
          fontSize="x-large"
        >
          Cart is Empty!
        </Text>
      </VStack>
    );
  }
};

const Checkout = ({ total, auth, cartList, clearInvoice, screenWidth }) => {
  const baseUrl = 'http://localhost:8080';
  const { colorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [pay, setPay] = useState(0);
  const [note, setNote] = useState('');
  const [isCheckoutLLoading, setIsCheckoutLoading] = useState(false);

  function onCheckout() {
    setIsCheckoutLoading(true);
    console.log('cheking out...');

    //!Loading simulation
    if (total > 0) {
      let status = 'lunas';
      let change = pay - total;
      if (change * -1 > 0) {
        status = 'hutang';
      }
      let totalProfit = 0;
      cartList.forEach(item => {
        totalProfit += (item.price - item.modal) * item.qty;
      });
      const invoice = {
        cashierId: auth().userId,
        total: total,
        pay: pay,
        change: change,
        cartList: cartList,
        status: status,
        notes: note,
        totalProfit: totalProfit,
      };

      function checkout() {
        const createTransactionAPI = `${baseUrl}/api/v1/transactions/create`;
        const token = Cookies.get('_auth');

        axios
          .post(createTransactionAPI, invoice, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(r => {
            console.log(r);
            toast({
              position: screenWidth <= 1000 ? 'bottom' : 'bottom-right',
              title: 'Transaction added.',
              description: `This invoice has been added to Transactions Page`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            onClose();
            clearInvoice();
            setPay(0);
            setNote('');
            setIsCheckoutLoading(false);
          })
          .catch(err => {
            console.log(err);
            toast({
              position: screenWidth <= 1000 ? 'bottom' : 'bottom-right',
              title: 'Fail to create transaction.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
            setIsCheckoutLoading(false);
          });
      }

      checkout();
      console.log(invoice);
    }
  }

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
  return (
    <>
      <PrimaryButton
        id={'checkoutConfirmationBtn'}
        label={'CHECKOUT'}
        onClick={() => {
          if (cartList.length > 0) {
            onOpen();
          }
        }}
        colorScheme={'yellow'}
        size={'sm'}
        pb={screenWidth <= 1000 ? '1px' : null}
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />

        <ModalContent
          content={
            <>
              <ModalHeader px={4}>
                <HStack>
                  <ShoppingCartCheckoutIcon />
                  <Text fontWeight={'bold'}>Checking Out</Text>
                </HStack>
              </ModalHeader>

              {/* <ModalCloseButton borderRadius={50} /> */}

              <ModalBody
                content={
                  <>
                    <Text>Total</Text>
                    <HStack
                      m={'0 !important'}
                      w={'100%'}
                      alignItems={'flex-start'}
                      justifyContent={'space-between'}
                    >
                      <Text fontSize={'x-large'} fontWeight={'bold'}>
                        Rp
                      </Text>

                      <Text fontSize={'xxx-large'} fontWeight={'bold'}>
                        {total.toLocaleString('id-ID')}
                      </Text>
                    </HStack>

                    {/* PAY & CHANGE */}
                    <HStack m={'0 !important'} w={'100%'} gap={2}>
                      <VStack w={'100%'} alignItems={'flex-start'}>
                        <Text>Pay</Text>

                        <Input
                          px={2}
                          mt={'4px !important'}
                          value={formatNum(pay)}
                          // type={'number'}
                          onChange={e => {
                            setPay(
                              parseInt(reverseFormatNumber(e.target.value))
                            );
                          }}
                          onKeyUp={e => {
                            if (e.key === 'Enter') {
                              document.querySelector('#checkoutBtn').click();
                            }
                          }}
                          onFocus={e => e.target.select()}
                          _focusVisible={{
                            border:
                              colorMode === 'light'
                                ? '2px solid '
                                : '2px solid',
                          }}
                          isDisabled={cartList.length > 0 ? false : true}
                        />
                      </VStack>

                      <VStack
                        w={'100%'}
                        alignItems={'flex-start'}
                        ml={'0 !important'}
                      >
                        <Text>Change</Text>

                        <Box
                          w={'100%'}
                          p={'7px'}
                          mt={'4px !important'}
                          border={
                            colorMode === 'light'
                              ? '1px solid #ddd'
                              : '1px solid #2d3748'
                          }
                          borderRadius={'6px'}
                        >
                          <Text>{(pay - total).toLocaleString('id-ID')}</Text>
                        </Box>
                      </VStack>
                    </HStack>

                    {/* Add Note */}
                    <VStack alignItems={'flex-start'} mt={2}>
                      <Text>Add Note</Text>
                      <Textarea
                        placeholder={'Write some note here'}
                        onChange={e => {
                          setNote(e.target.value);
                        }}
                      />
                    </VStack>

                    {/* <Text mt={4} fontSize={'sm'}>
                      This Invoice will be added to Transactions, are you sure
                      you wanna checkout this invoice?
                    </Text> */}
                  </>
                }
              />

              <ModalFooter
                content={
                  <ButtonGroup alignSelf={'flex-end'}>
                    <Button
                      variant={'ghost'}
                      className="btn"
                      onClick={onClose}
                      colorScheme={
                        colorMode === 'light' ? 'blackAlpha' : 'gray'
                      }
                    >
                      Cancel
                    </Button>

                    <PrimaryButton
                      id={'checkoutBtn'}
                      label={'CHECKOUT'}
                      onClick={() => {
                        onCheckout();
                      }}
                      isLoading={isCheckoutLLoading}
                    />
                  </ButtonGroup>
                }
              />
            </>
          }
        />
      </Modal>
    </>
  );
};

const Invoice = ({
  data,
  setData,
  itemsLength,
  setItemsLength,
  itemIndex,
  setItemIndex,
  selectItem,
  selectedItem,
  setSelectedItem,
  refresh,
  cartList,
  setCartList,
  total,
  setTotal,
  search,
  setSearch,
  addItemToCartList,
  ScanItem,
}) => {
  // Width Meter
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const auth = useAuthUser();

  function clearInvoice() {
    setCartList([]);
    setTotal(0);
    setSearch('');
  }

  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchItem = useRef(null);

  return (
    <VStack
      w={screenWidth <= 1000 ? '100%' : '50%'}
      height={'100%'}
      borderRadius={12}
      alignItems={'flex-start'}
      py={2}
      style={{
        background: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-400a)',
      }}
    >
      {/* HEADER, ADD & CHECKOUT */}
      <HStack
        w={'100%'}
        justifyContent={'space-between'}
        alignItems={'center'}
        px={4}
      >
        <VStack alignItems={'flex-start'}>
          <Text>31/12/2022</Text>
          <Text fontWeight={'bold'} m="0 !important">
            {auth()?.displayName}
          </Text>
        </VStack>

        <ButtonGroup>
          <PrimaryButtonOutline
            label={'C'}
            size={'sm'}
            onClick={clearInvoice}
            pb={screenWidth <= 1000 ? '1px' : null}
          />

          {/* ADD Button */}
          {screenWidth <= 1000 ? (
            <PrimaryButtonOutline
              id={'addItemBtn'}
              label={'ADD'}
              leftIcon={AddShoppingCartRoundedIcon}
              size={'sm'}
              pb={'1px'}
              onClick={onOpen}
            />
          ) : null}

          <Modal
            onClose={onClose}
            isOpen={isOpen}
            isCentered
            initialFocusRef={searchItem}
            size={'xl'}
          >
            <ModalOverlay />

            <ModalContent
              h={'95%'}
              content={
                <>
                  <ModalCloseButton borderRadius={'50px'} />

                  <VStack
                    style={{
                      width: '100%',
                      height: '100%',
                      overflowY: 'auto',
                      borderRadius: '12px',
                      background:
                        colorMode === 'light' ? 'var(--p-50)' : 'var(--p-400)',
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
                        <Icon as={ShoppingCartCheckoutIcon} />
                        <Text fontWeight={'bold'}>Add Item to Cart</Text>
                      </HStack>
                    </HStack>

                    {/* Search Box */}
                    <HStack px={3} w={'100%'}>
                      <SearchBox
                        data={data}
                        placeholder={'Search product by name or code'}
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
                        CODE
                      </Text>
                      <Text fontWeight={'bold'} w={'50%'}>
                        ITEM
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
                    <ItemsList
                      data={data}
                      setData={setData}
                      selectedItem={selectedItem}
                      setItemIndex={setItemIndex}
                      selectItem={selectItem}
                      setSelectedItem={setSelectedItem}
                      search={search}
                      addItemToCartList={addItemToCartList}
                      refresh={refresh}
                    />

                    <HStack w={'100%'} px={3} mt={'0px !important'} pt={3}>
                      {ScanItem}
                    </HStack>
                  </VStack>
                </>
              }
            />
          </Modal>

          <Checkout
            auth={auth}
            total={total}
            cartList={cartList}
            clearInvoice={clearInvoice}
            screenWidth={screenWidth}
          />
        </ButtonGroup>
      </HStack>

      <Divider my={2} />

      <Text px={4}>Total</Text>
      <HStack
        px={4}
        m={'0 !important'}
        w={'100%'}
        alignItems={'flex-start'}
        justifyContent={'space-between'}
      >
        <Text fontSize={'x-large'} fontWeight={'bold'}>
          Rp
        </Text>

        <Text fontSize={'xxx-large'} fontWeight={'bold'}>
          {total.toLocaleString('id-ID')}
        </Text>
      </HStack>

      <Divider my={2} />

      <CartList
        cartList={cartList}
        setCartList={setCartList}
        colorMode={colorMode}
        total={total}
        setTotal={setTotal}
        screenWidth={screenWidth}
      />
    </VStack>
  );
};

export default Invoice;
