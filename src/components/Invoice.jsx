import { useState, useEffect, useRef } from 'react';
import { useIsAuthenticated, useAuthUser } from 'react-auth-kit';

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
  Textarea,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Link,
  Kbd,
  Slide,
} from '@chakra-ui/react';

// MUI Icons
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

import '../css/vendereApp.css';
import { ColorModeIconButton } from './ColorModeSwitcher';
import { PrimaryButton, PrimaryButtonOutline } from './Buttons';
import { ModalContent, ModalBody, ModalFooter, ModalOverlay } from './Modals';

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
                      @ {item.price.toLocaleString()}
                    </Text>
                  </VStack>

                  <VStack alignItems={'flex-end'}>
                    <Text id={`totalItemPrice${item.code}`} fontWeight={'bold'}>
                      {item.totalPrice.toLocaleString()}
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
        borderBottom={'1px solid'}
        style={{
          borderColor: colorMode === 'light' ? '#e1e1e1' : 'var(--dark-dim)',
        }}
      >
        <Icon
          as={RemoveShoppingCartRoundedIcon}
          fontSize={'10rem'}
          color={colorMode === 'light' ? '#ccdff9' : '#2d3748'}
        />
        <Text
          cursor={'default'}
          textAlign={'center'}
          w={'100%'}
          fontWeight={'bold'}
          fontSize="xx-large"
          color={colorMode === 'light' ? '#ccdff9' : '#2d3748'}
        >
          Cart is Empty!
        </Text>
      </VStack>
    );
  }
};

const Checkout = ({ total, checkout, cartList, clearInvoice, screenWidth }) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [pay, setPay] = useState(0);
  const [note, setNote] = useState('');

  const isAuthenticated = useIsAuthenticated();
  const isAuthTokenExist = document.cookie
    .split(';')
    .some(cookie => cookie.trim().startsWith('_auth='));

  const [isCheckoutLLoading, setIsCheckoutLoading] = useState(false);

  // const [change, setChange] = useState(pay - total);
  // console.log(pay, total, change, pay - total);

  function inputPayHandler(e) {
    if (!e.target.value) {
      setPay(0);
      // setChange(0 - total);
    } else {
      setPay(parseInt(e.target.value));
      // setChange(parseInt(e.target.value) - total);
    }
  }

  function onCheckout() {
    if (isAuthTokenExist) {
      setIsCheckoutLoading(true);
      console.log('cheking out...');

      //!Loading simulation
      setTimeout(() => {
        checkout({
          total: total,
          pay: pay,
          cartList: cartList,
          note: note,
        });
        onClose();
        clearInvoice();
        setPay(0);
        setNote('');
        setIsCheckoutLoading(false);
      }, 2000);
    } else {
      toast({
        position: 'bottom-right',
        status: 'error',
        title: 'Access Denied!',
        description: 'please sign in again.',
        isClosable: true,
      });
    }
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
        borderRadius={'50px'}
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
                  <Text fontWeight={'bold'}>Checkout ?</Text>
                </HStack>
              </ModalHeader>

              {/* <ModalCloseButton borderRadius={50} /> */}

              <ModalBody
                content={
                  <>
                    {!isAuthTokenExist && (
                      <Alert
                        borderRadius={'8px'}
                        status="error"
                        variant={'left-accent'}
                        mb={4}
                      >
                        <AlertIcon alignSelf={'flex-start'} />
                        <Box>
                          <AlertTitle>Access Denied!</AlertTitle>
                          <AlertDescription>
                            you need to{' '}
                            <Link
                              color={colorMode === 'light' ? 'blue' : 'cyan'}
                              href="/"
                            >
                              sign in
                            </Link>{' '}
                            again or refresh the page{' '}
                            <Kbd
                              bg={
                                colorMode === 'light'
                                  ? 'blackAlpha.100'
                                  : 'whiteAlpha.200'
                              }
                              borderColor={
                                colorMode === 'light'
                                  ? 'blackAlpha.200'
                                  : 'whiteAlpha.300'
                              }
                            >
                              ctrl
                            </Kbd>{' '}
                            +{' '}
                            <Kbd
                              bg={
                                colorMode === 'light'
                                  ? 'blackAlpha.200'
                                  : 'whiteAlpha.200'
                              }
                              borderColor={
                                colorMode === 'light'
                                  ? 'blackAlpha.300'
                                  : 'whiteAlpha.300'
                              }
                            >
                              R
                            </Kbd>
                          </AlertDescription>
                        </Box>
                      </Alert>
                    )}

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
                        {total.toLocaleString()}
                      </Text>
                    </HStack>

                    {/* PAY & CHANGE */}
                    <HStack m={'0 !important'} w={'100%'} gap={2}>
                      <VStack w={'100%'} alignItems={'flex-start'}>
                        <Text>Pay</Text>
                        <Input
                          px={2}
                          mt={'4px !important'}
                          value={pay || ''}
                          type={'number'}
                          onChange={inputPayHandler}
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
                          <Text>{(pay - total).toLocaleString()}</Text>
                        </Box>
                      </VStack>
                    </HStack>

                    {/* Add Note */}
                    <VStack alignItems={'flex-start'} mt={2}>
                      <Text>Add Note</Text>
                      <Textarea
                        mt={'0px !important'}
                        value={note || ''}
                        borderRadius={6}
                        onChange={e => {
                          setNote(e.target.value);
                        }}
                        placeholder="Write some note here."
                        size="sm"
                        _focusVisible={{
                          border:
                            colorMode === 'light' ? '2px solid ' : '2px solid',
                        }}
                      />
                    </VStack>

                    <Text mt={4} fontSize={'sm'}>
                      This Invoice will be added to Transactions, are you sure
                      you wanna checkout this invoice?
                    </Text>
                  </>
                }
              />

              <ModalFooter
                content={
                  <ButtonGroup alignSelf={'flex-end'}>
                    <Button variant={'ghost'} className="btn" onClick={onClose}>
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
  items,
  cartList,
  setCartList,
  total,
  setTotal,
  search,
  setSearch,
  setInvoice,
  addItemToCartList,
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
  const isAuthenticated = useIsAuthenticated();
  const isAuthTokenExist = document.cookie
    .split(';')
    .some(cookie => cookie.trim().startsWith('_auth='));

  const toast = useToast();

  function checkout({ total, pay, cartList, note }) {
    if (isAuthTokenExist) {
      if (total > 0) {
        let status = 'lunas';
        let change = pay - total;
        if (change * -1 > 0) {
          status = 'hutang';
        }
        const invoice = {
          date: new Date(),
          cashierId: auth().userId,
          total: total,
          pay: pay,
          change: change,
          cartList: cartList,
          status: status,
          note: note,
        };

        toast({
          position: 'bottom-right',
          title: 'Transaction added.',
          description: `This invoice has been added to Transactions`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        console.log(invoice);
        console.log('checkout success');
      }
    } else {
      console.log('Auth needed');
    }
    return;
  }

  function clearInvoice() {
    setCartList([]);
    setTotal(0);
    setSearch('');
  }

  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const searchItem = useRef(null);

  // const [itemIndex, setItemIndex] = useState(1);
  // const [itemsLength, setItemLength] = useState(0);

  // function selectItem() {
  //   const targetItem = document.querySelector(
  //     `.items > :nth-child(${itemIndex})`
  //   );
  //   const items = document.querySelectorAll('.items > div');

  //   setItemLength(items.length);

  //   items.forEach(item => {
  //     item.classList.remove('itemSelected');
  //   });
  //   if (targetItem) {
  //     targetItem.classList.add('itemSelected');
  //   }
  //   console.log(itemIndex);
  // }

  // useEffect(() => {
  //   setItemIndex(1);
  //   selectItem();
  // }, [search]);

  // useEffect(() => {
  //   selectItem();
  // }, [itemIndex]);

  // const handleKeyUp = e => {
  //   if (e.key === 'Enter') {
  //     const btn = document.querySelector(
  //       `.items :nth-child(${itemIndex}) .actionBtnSection > button`
  //     );
  //     if (btn) {
  //       btn.click();
  //     }
  //   }
  // };

  // const handleKeyDown = e => {
  //   if (e.key === 'ArrowDown') {
  //     e.preventDefault();
  //     if (itemIndex < itemsLength) {
  //       setItemIndex(itemIndex + 1);
  //     }
  //   }

  //   if (e.key === 'ArrowUp') {
  //     e.preventDefault();
  //     if (itemIndex > 1) {
  //       setItemIndex(itemIndex - 1);
  //     }
  //   }
  // };

  return (
    <VStack
      w={screenWidth <= 1000 ? '100%' : '50%'}
      height={'100%'}
      borderRadius={12}
      alignItems={'flex-start'}
      py={2}
      style={{
        background: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-400)',
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
            Cashier's Name
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
          >
            <ModalOverlay />

            <ModalContent
              pt={4}
              h={'95%'}
              w={'95%'}
              m={'auto !important'}
              borderRadius={12}
              bg={colorMode === 'light' ? '#ffffff' : '#1A202C95'}
            >
              <ModalCloseButton borderRadius={'50px'} />

              <VStack
                id="addItemToCart"
                h={'100%'}
                w={'100%'}
                alignItems={'flex-start'}
                py={2}
                borderRadius={12}
                bg={colorMode === 'light' ? '#ffffff' : '#1A202C'}
              >
                <HStack py={0} px={4}>
                  <AddShoppingCartRoundedIcon />
                  <Text fontWeight={'bold'}>Add Item to Cart</Text>
                </HStack>

                {/* Search Items Section */}
                <HStack px={4} w={'100%'}>
                  <Input
                    id={'itemSearchBox'}
                    ref={searchItem}
                    className={'inputBox'}
                    tabIndex={0}
                    onFocus={e => e.target.select()}
                    onChange={e => {
                      setSearch(e.target.value);
                    }}
                    type={'text'}
                    value={search}
                    placeholder={'Search item by name or code'}
                    w={'100%'}
                    border={'1px solid'}
                    borderRadius={'10px 0 0 10px'}
                    style={{ borderColor: 'var(--p-500)' }}
                    _focusVisible={{ border: '2px solid var(--p-500)' }}
                  />
                  <PrimaryButton
                    label={'SCAN'}
                    borderRadius={'0 10px 10px 0 !important'}
                    ml={'0px !important'}
                  />
                </HStack>

                {/* Items Section */}
                <VStack h={'calc(100% - 80px)'} w={'100%'}>
                  {/* Items Header */}
                  <HStack fontSize={'sm'} w={'100%'} py={2} pl={4} pr={6}>
                    <Text fontWeight={'bold'} w={'30%'}>
                      CODE
                    </Text>
                    <Text fontWeight={'bold'} w={'50%'}>
                      ITEM
                    </Text>
                    <Text
                      fontWeight={'bold'}
                      w={'20%'}
                      textAlign={'center'}
                      ml={'0px !important'}
                    >
                      ACTION
                    </Text>
                  </HStack>

                  {/* Items */}
                  <VStack
                    className="items"
                    h={'100%'}
                    w={'100%'}
                    mt={'0px !important'}
                    fontSize={'sm'}
                    overflowY={'auto'}
                    borderBottom={'1px solid'}
                    borderTop={'1px solid'}
                    // pb={2}
                    style={{
                      borderColor:
                        colorMode === 'light' ? '#e1e1e1' : 'var(--dark-dim)',
                    }}
                  >
                    {items.map((item, index) => {
                      if (
                        item.name
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.code.includes(search)
                      ) {
                        return (
                          <HStack
                            id={index}
                            pl={4}
                            pr={6}
                            mt={'0px !important'}
                            w={'100%'}
                            alignItems={'flex-start'}
                            key={index}
                            py={2}
                            position={'relative'}
                            style={{
                              background:
                                index % 2 === 1
                                  ? colorMode === 'light'
                                    ? 'var(--light)'
                                    : '#2d374895'
                                  : '',
                            }}
                          >
                            {/* Item's Code */}
                            <Text w={'30%'} p={'4px 8px'}>
                              {item.code}
                            </Text>

                            {/* Item's Name */}
                            <VStack w={'50%'} alignItems={'flex-start'} pr={4}>
                              <Text fontWeight={'bold'}>{item.name}</Text>
                              <Text m={'0 !important'}>@ {item.price}</Text>
                            </VStack>

                            {/* Item Action */}
                            <VStack w={'20%'} className={'actionBtnSection'}>
                              {/* Counter Qty */}
                              <HStack>
                                <IconButton
                                  m={'0 !important'}
                                  size={'sm'}
                                  variant={'ghost'}
                                  icon={<RemoveRoundedIcon />}
                                  borderRadius={50}
                                  onClick={() => {
                                    const itemQty = document.querySelector(
                                      `#qty${item.code}`
                                    );
                                    if (parseInt(itemQty.value) > 1) {
                                      itemQty.value =
                                        parseInt(itemQty.value) - 1;
                                    }
                                  }}
                                />

                                <Input
                                  id={`qty${item.code}`}
                                  m={'0 !important'}
                                  w={'40px'}
                                  h={'28px'}
                                  type={'number'}
                                  defaultValue={1}
                                  onFocus={e => e.target.select()}
                                  onChange={e => {
                                    if (
                                      e.target.value === '' ||
                                      e.target.value === '0'
                                    ) {
                                      e.target.value = 1;
                                    }
                                  }}
                                  _focusVisible={{
                                    border: '1px solid #4f6aa9',
                                  }}
                                  p={'0'}
                                  border={'none'}
                                  textAlign={'center'}
                                />

                                <IconButton
                                  size={'sm'}
                                  m={'0 !important'}
                                  onClick={() => {
                                    const itemQty = document.querySelector(
                                      `#qty${item.code}`
                                    );
                                    itemQty.value = parseInt(itemQty.value) + 1;
                                  }}
                                  variant={'ghost'}
                                  icon={<AddRoundedIcon />}
                                  borderRadius={50}
                                />
                              </HStack>

                              {/* Add Button */}
                              <PrimaryButtonOutline
                                label={'ADD'}
                                w={'100%'}
                                onClick={() => {
                                  const itemQty = parseInt(
                                    document.querySelector(`#qty${item.code}`)
                                      .value
                                  );

                                  addItemToCartList({
                                    itemId: item.id,
                                    itemCode: item.code,
                                    itemName: item.name,
                                    itemPrice: item.price,
                                    itemQty: itemQty,
                                  });
                                  document.querySelector(
                                    `#qty${item.code}`
                                  ).value = 1;

                                  searchItem.current.select();
                                }}
                                size={'sm'}
                              />
                            </VStack>
                          </HStack>
                        );
                      }
                      return null;
                    })}
                  </VStack>
                </VStack>
              </VStack>
            </ModalContent>
          </Modal>

          <Checkout
            total={total}
            checkout={checkout}
            cartList={cartList}
            clearInvoice={clearInvoice}
            screenWidth={screenWidth}
          />

          <ColorModeIconButton size={'sm'} />
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
          {total.toLocaleString()}
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
