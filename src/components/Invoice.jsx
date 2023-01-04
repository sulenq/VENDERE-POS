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

// !!! DEV PURPOSE
function generateRandomData() {
  // Generate random data

  const data = {
    code: Math.floor(Math.random() * 10000000).toString(),
    name: 'Product ' + Math.floor(Math.random() * 1000),
    price: Math.random() * (100000 - 100) + 100,
    qty: (Math.random() * (10 - 1) + 1).toFixed(1),
  };
  return data;
}
function generateDummy() {
  let dummyCartList = [];
  for (let i = 0; i < 10; i++) {
    dummyCartList.push(generateRandomData());
  }

  return dummyCartList;
}
// !!! DEV PURPOSE

const CartList = ({ cartList, setCartList, colorMode, total, setTotal }) => {
  function deleteItem(itemCode, itemTotalPrice) {
    const updatedCartList = cartList.filter(item => item.code !== itemCode);
    setCartList(updatedCartList);
    setTotal(total - itemTotalPrice);
  }

  if (cartList.length > 0) {
    return (
      <Box w={'100%'} overflow={'hidden'} pb={'64px'}>
        <VStack w={'100%'} pr={2} className="cartList" mt={2}>
          {cartList.map((item, index) => {
            return (
              <HStack
                key={index}
                w={'100%'}
                py={2}
                px={4}
                alignItems={'flex-start'}
                justifyContent={'space-between'}
                borderRadius={'8px'}
                background={colorMode === 'light' ? '#eee' : '#2d3748'}
              >
                <VStack alignItems={'flex-start'}>
                  <Text fontWeight={'bold'}>{item.name}</Text>
                  <Text m="0 !important">@{item.price.toLocaleString()}</Text>
                  {/* Counter Qty */}
                </VStack>
                <VStack alignItems={'flex-end'}>
                  <Text id={`totalItemPrice${item.code}`} fontWeight={'bold'}>
                    {(item.price * item.qty).toLocaleString()}
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
                          item.price * parseInt(itemQty.textContent)
                        );
                      }}
                    />
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
                        if (parseInt(itemQty.textContent) > 1) {
                          itemQty.textContent =
                            parseInt(itemQty.textContent) - 1;
                          setTotal(total - item.price);
                          const totalItemPrice = document.querySelector(
                            `#totalItemPrice${item.code}`
                          );
                          totalItemPrice.textContent = (
                            item.price * parseInt(itemQty.textContent)
                          ).toLocaleString();
                        }
                      }}
                    />

                    <Text
                      id={`qtyCart${item.code}`}
                      border={'1px solid #ccc'}
                      borderRight={'none'}
                      borderLeft={'none'}
                      m={'0 !important'}
                      p={'3px'}
                    >
                      {item.qty}
                    </Text>

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

                        itemQty.textContent = parseInt(itemQty.textContent) + 1;
                        setTotal(total + item.price);
                        const totalItemPrice = document.querySelector(
                          `#totalItemPrice${item.code}`
                        );
                        totalItemPrice.textContent = (
                          item.price * parseInt(itemQty.textContent)
                        ).toLocaleString();
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
  setItems,
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
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  function inputPayHandler(e) {
    if (!e.target.value) {
      setPay(0);
      setChange(0 - total);
    } else {
      setPay(parseInt(e.target.value));
      setChange(parseInt(e.target.value) - total);
    }
  }

  function addCartList(itemCode, itemName, itemPrice, itemQty) {
    const newCartList = {
      code: itemCode,
      name: itemName,
      price: itemPrice,
      qty: itemQty,
    };
    setCartList(prevCartList => [...prevCartList, newCartList]);
    setTotal(total + newCartList.price);
    toast({
      title: 'Item added.',
      description: `${itemQty} ${itemName} added `,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
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
              h={'95vh'}
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

              <ModalBody p={0}>
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
                    m={'0 !important'}
                  >
                    Search
                  </Button>
                </HStack>

                <Box className="items">
                  <TableContainer h={'80vh'} overflowY={'auto'}>
                    <Table size={'sm'} variant="striped" colorScheme="gray">
                      <Thead>
                        <Tr>
                          <Th>Code</Th>
                          <Th>Name</Th>
                          <Th textAlign={'center'}>Action</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {items.map((item, index) => {
                          if (
                            item.name
                              .toLowerCase()
                              .includes(search.toLowerCase()) ||
                            item.code.includes(search)
                          ) {
                            return (
                              <Tr key={index}>
                                <Td className="itemTd">{item.code}</Td>
                                <Td className="itemTd">
                                  <Text fontWeight={'bold'}>{item.name}</Text>
                                  <Text>@ {item.price.toLocaleString()}</Text>
                                </Td>
                                <Td>
                                  <VStack>
                                    {/* Counter Qty */}
                                    <HStack>
                                      <IconButton
                                        variant={'ghost'}
                                        colorScheme={'yellow'}
                                        icon={<RemoveRoundedIcon />}
                                        borderRadius={50}
                                        onClick={() => {
                                          const itemQty =
                                            document.querySelector(
                                              `#qty${item.code}`
                                            );
                                          if (
                                            parseInt(itemQty.textContent) > 1
                                          ) {
                                            itemQty.textContent =
                                              parseInt(itemQty.textContent) - 1;
                                          }
                                        }}
                                      />
                                      <Text id={`qty${item.code}`}>1</Text>
                                      <IconButton
                                        onClick={() => {
                                          const itemQty =
                                            document.querySelector(
                                              `#qty${item.code}`
                                            );
                                          itemQty.textContent =
                                            parseInt(itemQty.textContent) + 1;
                                        }}
                                        variant={'ghost'}
                                        colorScheme={'yellow'}
                                        icon={<AddRoundedIcon />}
                                        borderRadius={50}
                                      />
                                    </HStack>

                                    <Button
                                      onClick={() => {
                                        const itemQty = parseInt(
                                          document.querySelector(
                                            `#qty${item.code}`
                                          ).textContent
                                        );
                                        addCartList(
                                          item.code,
                                          item.name,
                                          item.price,
                                          itemQty
                                        );
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
                                </Td>
                              </Tr>
                            );
                          }
                        })}
                      </Tbody>
                    </Table>
                  </TableContainer>
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

      <HStack m={'0 !important'} w={'100%'} gap={2}>
        <VStack w={'100%'} alignItems={'flex-start'}>
          <Text>Pay</Text>
          <Input
            px={2}
            mt={'4px !important'}
            type={'number'}
            onChange={inputPayHandler}
            isDisabled={cartList.length > 0 ? false : true}
          />
        </VStack>

        <VStack w={'100%'} alignItems={'flex-start'}>
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
      />
    </VStack>
  );
};

const Invoice = () => {
  // Width Meter
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const [items, setItems] = useState(generateDummy);
  const [total, setTotal] = useState(0);
  const [pay, setPay] = useState(0);
  const [change, setChange] = useState(0);
  const [cartList, setCartList] = useState([]);

  const [search, setSearch] = useState('');

  return (
    <>
      {screenWidth <= 820 ? (
        <InvoiceMobile
          items={items}
          setItems={setItems}
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
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Invoice;
