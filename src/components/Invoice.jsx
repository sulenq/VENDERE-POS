import { useState, useEffect } from 'react';
import {
  IconButton,
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
} from '@chakra-ui/react';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

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
  let dummyChartList = [];
  for (let i = 0; i < 10; i++) {
    dummyChartList.push(generateRandomData());
  }

  return dummyChartList;
}
// !!! DEV PURPOSE

const ChartList = ({ chartList, colorMode }) => {
  if (chartList.length > 0) {
    return (
      <Box w={'100%'} overflow={'hidden'} pb={'64px'}>
        <VStack w={'100%'} pr={2} className="chartList" mt={2}>
          {chartList.map(item => {
            return (
              <HStack
                w={'100%'}
                py={2}
                px={4}
                key={item.id}
                alignItems={'flex-start'}
                justifyContent={'space-between'}
                borderRadius={'8px'}
                background={colorMode === 'light' ? '#eee' : '#2d3748'}
              >
                <VStack alignItems={'flex-start'}>
                  <Text fontWeight={'bold'}>{item.name}</Text>
                  <Text m="0 !important">@{item.price.toLocaleString()}</Text>
                  <Text m="0 !important"> {`X ${item.qty}`}</Text>
                </VStack>
                <Text fontWeight={'bold'}>
                  {(item.price * item.qty).toLocaleString()}
                </Text>
              </HStack>
            );
          })}
        </VStack>
      </Box>
    );
  } else {
    return <p>Chart is empty!</p>;
  }
};

const InvoiceMobile = () => {
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [items, setItems] = useState(generateDummy);
  const [total, setTotal] = useState(1234567890);
  const [pay, setPay] = useState(0);
  const [change, setChange] = useState(1234567890);
  const [chartList, setChartList] = useState(generateDummy);

  const [search, setSearch] = useState('');

  function inputPayHandler(e) {
    if (!e.target.value) {
      setPay(0);
    } else {
      setPay(parseInt(e.target.value));
    }
    setChange(pay - total);
    console.log(parseInt(e.target.value));
    console.log(pay);
    console.log(change);
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
                    onChange={e => setSearch(e.target.value)}
                    type={'text'}
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
                        {search
                          ? items.map((item, index) => {
                              if (
                                item.name
                                  .toLowerCase()
                                  .includes(search.toLowerCase()) ||
                                item.code.includes(search)
                              ) {
                                console.log(item.id);
                                return (
                                  <Tr key={index}>
                                    <Td className="itemTd">{item.code}</Td>
                                    <Td className="itemTd">
                                      <Text fontWeight={'bold'}>
                                        {item.name}
                                      </Text>
                                      <Text>
                                        @ {item.price.toLocaleString()}
                                      </Text>
                                    </Td>
                                    <Td>
                                      <VStack>
                                        <HStack>
                                          <IconButton
                                            variant={'ghost'}
                                            colorScheme={'blackAlpha'}
                                            icon={<RemoveRoundedIcon />}
                                            borderRadius={50}
                                          />
                                          <Text>1</Text>
                                          <IconButton
                                            variant={'ghost'}
                                            colorScheme={'blackAlpha'}
                                            icon={<AddRoundedIcon />}
                                            borderRadius={50}
                                          />
                                        </HStack>
                                        <Button
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
                            })
                          : items.map((item, index) => {
                              return (
                                <Tr key={index}>
                                  <Td className="itemTd">{item.code}</Td>
                                  <Td className="itemTd">
                                    <Text fontWeight={'bold'}>{item.name}</Text>
                                    <Text>@ {item.price.toLocaleString()}</Text>
                                  </Td>
                                  <Td>
                                    <VStack>
                                      <HStack>
                                        <IconButton
                                          variant={'ghost'}
                                          colorScheme={'blackAlpha'}
                                          icon={<RemoveRoundedIcon />}
                                          borderRadius={50}
                                        />
                                        <Text>1</Text>
                                        <IconButton
                                          variant={'ghost'}
                                          colorScheme={'blackAlpha'}
                                          icon={<AddRoundedIcon />}
                                          borderRadius={50}
                                        />
                                      </HStack>
                                      <Button
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

      <ChartList chartList={chartList} colorMode={colorMode} />
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

  const { colorMode } = useColorMode();
  const [items, setItems] = useState(generateDummy);
  const [total, setTotal] = useState(1234567890);
  const [pay, setPay] = useState(0);
  const [change, setChange] = useState(1234567890);
  const [chartList, setChartList] = useState(generateDummy);

  return (
    <>
      {screenWidth <= 820 ? (
        <InvoiceMobile
          setItems={setItems}
          setTotal={setTotal}
          setPay={setPay}
          setChange={setChange}
          setChartList={setChartList}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default Invoice;
