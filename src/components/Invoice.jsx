import { useState, useEffect, useRef } from 'react';
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
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

import '../css/vendereApp.css';
import { ColorModeIconButton } from './ColorModeSwitcher';
import Items from './Items';

const CartList = ({
  cartList,
  setCartList,
  colorMode,
  total,
  setTotal,
  pay,
  setChange,
}) => {
  function deleteItem(itemCode, itemTotalPrice) {
    const updatedCartList = cartList.filter(item => item.code !== itemCode);
    setCartList(updatedCartList);
    setTotal(total - itemTotalPrice);
    setChange(pay - (total - itemTotalPrice));
  }

  if (cartList.length > 0) {
    return (
      <Box w={'100%'} overflow={'hidden'} pb={'64px'}>
        <VStack w={'100%'} className="cartList">
          {cartList.map((item, index) => {
            console.log(cartList);
            return (
              <HStack
                key={index}
                w={'100%'}
                py={2}
                px={4}
                alignItems={'flex-start'}
                justifyContent={'space-between'}
                borderRadius={'8px'}
                background={colorMode === 'light' ? '#f1f1f1' : '#2d3748'}
              >
                <VStack alignItems={'flex-start'}>
                  <Text fontWeight={'bold'}>{item.name}</Text>
                  <Text m="0 !important">@ {item.price.toLocaleString()}</Text>
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
                          setChange(pay - (total - item.price));
                          cartList.forEach(searchItem => {
                            if (searchItem.code === item.code) {
                              searchItem.qty = searchItem.qty - 1;
                              searchItem.totalPrice =
                                searchItem.price * searchItem.qty;
                              return;
                            }
                          });
                          console.log(cartList);
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
                            searchItem.totalPrice = searchItem.price * itemQty;
                            updateTotal += searchItem.price * itemQty;
                          } else {
                            updateTotal += searchItem.price * searchItem.qty;
                          }
                        });
                        setTotal(updateTotal);
                        setChange(pay - updateTotal);
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
                        setChange(pay - (total + item.price));
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
      <VStack w={'100%'} h={'100%'} justifyContent={'center'} pb={24}>
        <Icon
          as={RemoveShoppingCartRoundedIcon}
          fontSize={'10rem'}
          color={colorMode === 'light' ? '#ccdff9' : '#2d3748'}
        />
        <Text
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

const InvoiceMobile = ({
  items,
  cartList,
  setCartList,
  total,
  setTotal,
  pay,
  setPay,
  change,
  setChange,
  search,
  setSearch,
  addCartList,
}) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function inputPayHandler(e) {
    if (!e.target.value) {
      setPay(0);
      setChange(0 - total);
    } else {
      setPay(parseInt(e.target.value));
      setChange(parseInt(e.target.value) - total);
    }
  }

  return (
    <VStack
      height={'100%'}
      borderRadius={'20px'}
      alignItems={'flex-start'}
      py={2}
      px={4}
      background={colorMode === 'light' ? '#fff' : '#1A202C'}
    >
      {/* ADD & CHECKOUT */}
      <HStack w={'100%'} justifyContent={'space-between'}>
        <VStack alignItems={'flex-start'}>
          <Text>31/12/2022</Text>
          <Text fontWeight={'bold'} m="0 !important">
            Cashier's Name
          </Text>
        </VStack>

        <ButtonGroup>
          <Button
            leftIcon={<AddShoppingCartRoundedIcon />}
            onClick={onOpen}
            variant={'outline'}
            borderRadius={'50px'}
            colorScheme={'yellow'}
          >
            Add
          </Button>

          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay
              bg="#00000070"
              backdropFilter="auto"
              backdropBlur="5px"
            />
            <ModalContent
              py={4}
              px={4}
              h={'95%'}
              w={'95%'}
              m={'auto !important'}
              borderRadius={12}
              background={colorMode === 'light' ? '#ffffff' : '#1A202C'}
            >
              <ModalHeader p={0} mb={4}>
                <HStack>
                  <AddShoppingCartRoundedIcon />
                  <Text fontWeight={'bold'}>Add Item</Text>
                </HStack>
              </ModalHeader>

              <ModalCloseButton borderRadius={50} />

              <ModalBody
                p={0}
                h={'95%'}
                display={'flex'}
                flexDirection={'column'}
              >
                {/* Search Item */}
                <HStack>
                  <Input
                    onFocus={e => e.target.select()}
                    onChange={e => setSearch(e.target.value)}
                    type={'text'}
                    value={search}
                    placeholder={'Search item by name or code'}
                    w={'100%'}
                    borderRadius={'50px 0 0 50px'}
                    _focusVisible={{ border: '2px solid #ecc948' }}
                  />
                  <Button
                    colorScheme={'yellow'}
                    borderRadius={'0 50px 50px 0'}
                    fontWeight={'bold'}
                    m={'0 !important'}
                  >
                    SCAN
                  </Button>
                </HStack>

                {/* Items */}
                <Box className="items" fontSize={'sm'} overflowY={'auto'}>
                  <HStack w={'100%'} p={'4px 8px'}>
                    <Text fontWeight={'bold'} w={'30%'}>
                      CODE
                    </Text>
                    <Text fontWeight={'bold'} w={'40%'}>
                      ITEM
                    </Text>
                    <Text fontWeight={'bold'} w={'30%'} textAlign={'center'}>
                      ACTION
                    </Text>
                  </HStack>

                  {items.map((item, index) => {
                    if (
                      item.name.toLowerCase().includes(search.toLowerCase()) ||
                      item.code.includes(search)
                    ) {
                      return (
                        <HStack
                          alignItems={'flex-start'}
                          key={index}
                          py={2}
                          background={
                            index % 2 === 1
                              ? colorMode === 'light'
                                ? '#f1f1f1'
                                : '#2d3748'
                              : ''
                          }
                        >
                          <Text w={'30%'} p={'4px 8px'}>
                            item code
                          </Text>

                          <VStack w={'40%'} alignItems={'flex-start'}>
                            <Text>{item.name}</Text>
                            <Text w={'40%'} m={'0 !important'}>
                              @ {item.price}
                            </Text>
                          </VStack>

                          <VStack pr={2}>
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
                                    itemQty.value = parseInt(itemQty.value) - 1;
                                  }
                                }}
                              />

                              <Input
                                m={'0 !important'}
                                w={'40px'}
                                h={'28px'}
                                id={`qty${item.code}`}
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
                                _focusVisible={{ border: '1px solid #4f6aa9' }}
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
                            <Button
                              onClick={() => {
                                const itemQty = parseInt(
                                  document.querySelector(`#qty${item.code}`)
                                    .value
                                );
                                if (itemQty !== 0) {
                                  addCartList(
                                    item.code,
                                    item.name,
                                    item.price,
                                    itemQty
                                  );
                                }
                              }}
                              size={'sm'}
                              colorScheme={'yellow'}
                              w={'100%'}
                              borderRadius={50}
                              variant={'outline'}
                            >
                              Add
                            </Button>
                          </VStack>
                        </HStack>
                      );
                    }
                  })}
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>

          <Button borderRadius={'50px'} colorScheme={'yellow'}>
            CHECKOUT
          </Button>

          <ColorModeIconButton />
        </ButtonGroup>
      </HStack>

      <Divider my={2} />

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
            onFocus={e => e.target.select()}
            _focusVisible={{ border: '1px solid var(--primary-500)' }}
            isDisabled={cartList.length > 0 ? false : true}
          />
        </VStack>

        <VStack w={'100%'} alignItems={'flex-start'} ml={'0 !important'}>
          <Text>Change</Text>
          <Box
            w={'100%'}
            p={'7px'}
            mt={'4px !important'}
            border={
              colorMode === 'light' ? '1px solid #ddd' : '1px solid #2d3748'
            }
            borderRadius={'6px'}
          >
            <Text>{change.toLocaleString()}</Text>
          </Box>
        </VStack>
      </HStack>

      <CartList
        cartList={cartList}
        setCartList={setCartList}
        colorMode={colorMode}
        total={total}
        setTotal={setTotal}
        pay={pay}
        setChange={setChange}
      />
    </VStack>
  );
};

const InvoiceDesktop = ({
  cartList,
  setCartList,
  total,
  setTotal,
  pay,
  setPay,
  change,
  setChange,
}) => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  function inputPayHandler(e) {
    if (!e.target.value) {
      setPay(0);
      setChange(0 - total);
    } else {
      setPay(parseInt(e.target.value));
      setChange(parseInt(e.target.value) - total);
    }
  }

  return (
    <VStack
      height={'100%'}
      borderRadius={'20px'}
      alignItems={'flex-start'}
      py={2}
      px={4}
      background={colorMode === 'light' ? '#fff' : '#1A202C'}
    >
      {/* ADD & CHECKOUT */}
      <HStack w={'100%'} justifyContent={'space-between'}>
        <VStack alignItems={'flex-start'}>
          <Text>31/12/2022</Text>
          <Text fontWeight={'bold'} m="0 !important">
            Cashier's Name
          </Text>
        </VStack>

        <ButtonGroup>
          <Button borderRadius={'50px'} colorScheme={'yellow'}>
            CHECKOUT
          </Button>

          <ColorModeIconButton />
        </ButtonGroup>
      </HStack>

      <Divider my={2} />

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
            isDisabled={cartList.length > 0 ? false : true}
          />
        </VStack>

        <VStack w={'100%'} alignItems={'flex-start'} ml={'0 !important'}>
          <Text>Change</Text>
          <Box
            w={'100%'}
            p={'7px'}
            mt={'4px !important'}
            border={
              colorMode === 'light' ? '1px solid #ddd' : '1px solid #2d3748'
            }
            borderRadius={'6px'}
          >
            <Text>{change.toLocaleString()}</Text>
          </Box>
        </VStack>
      </HStack>

      <CartList
        cartList={cartList}
        setCartList={setCartList}
        colorMode={colorMode}
        total={total}
        setTotal={setTotal}
        pay={pay}
        setChange={setChange}
      />
    </VStack>
  );
};

const Invoice = ({
  items,
  cartList,
  setCartList,
  total,
  setTotal,
  pay,
  setPay,
  change,
  setChange,
  search,
  setSearch,
}) => {
  // Width Meter
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const toast = useToast();

  function addCartList(itemCode, itemName, itemPrice, itemQty) {
    let itemInCartList = false;
    const newCartList = {
      code: itemCode,
      name: itemName,
      price: itemPrice,
      qty: itemQty,
      totalPrice: itemPrice * itemQty,
    };

    cartList.forEach(item => {
      if (item.code === itemCode) {
        itemInCartList = true;
        item.qty += itemQty;
        item.totalPrice += itemPrice * itemQty;
      }
    });

    if (!itemInCartList) {
      setCartList(prevCartList => [...prevCartList, newCartList]);
    }

    let updateTotal = itemPrice * itemQty;

    setTotal(total + updateTotal);
    setChange(pay - (total + updateTotal));

    // console.log(cartList);

    toast({
      title: 'Item added.',
      description: `${itemQty} ${itemName} added`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <>
      {screenWidth <= 820 ? (
        <InvoiceMobile
          items={items}
          total={total}
          setTotal={setTotal}
          pay={pay}
          setPay={setPay}
          change={change}
          setChange={setChange}
          cartList={cartList}
          setCartList={setCartList}
          search={search}
          setSearch={setSearch}
          addCartList={addCartList}
        />
      ) : (
        <InvoiceDesktop
          items={items}
          total={total}
          setTotal={setTotal}
          pay={pay}
          setPay={setPay}
          change={change}
          setChange={setChange}
          cartList={cartList}
          setCartList={setCartList}
          search={search}
          setSearch={setSearch}
          addCartList={addCartList}
        />
      )}
    </>
  );
};

export default Invoice;
