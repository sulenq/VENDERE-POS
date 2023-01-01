import { useState } from 'react';
import {
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
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';

import '../css/vendereApp.css';

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

// !!! DEV PURPOSE
function generateRandomData() {
  // Generate random data

  const data = {
    id: Math.random(),
    name: 'Product ' + Math.floor(Math.random() * 1000),
    price: Math.random() * (100000 - 100) + 100,
    qty: (Math.random() * (10 - 1) + 1).toFixed(1),
  };
  return data;
}
function generateDummyChartList() {
  let dummyChartList = [];
  for (let i = 0; i < 10; i++) {
    dummyChartList.push(generateRandomData());
  }

  return dummyChartList;
}
// !!! DEV PURPOSE

const Invoice = () => {
  const { colorMode } = useColorMode();
  const [total, setTotal] = useState(1234567890);
  const [pay, setPay] = useState(0);
  const [change, setChange] = useState(1234567890);
  const [chartList, setChartList] = useState(generateDummyChartList);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const inputPayHandler = e => {
    if (!e.target.value) {
      setPay(0);
    } else {
      setPay(parseInt(e.target.value));
    }
    setChange(pay - total);
    console.log(parseInt(e.target.value));
    console.log(pay);
    console.log(change);
  };

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
            <ModalContent py={4} px={6} borderRadius={12}>
              <ModalHeader p={0} mb={4}>
                Add Item
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody p={0}>
                <Input type={'text'} borderRadius={'50px'} />
              </ModalBody>
              {/* <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter> */}
            </ModalContent>
          </Modal>

          <Button borderRadius={'50px'} colorScheme={'yellow'}>
            CHECKOUT
          </Button>
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

export default Invoice;
