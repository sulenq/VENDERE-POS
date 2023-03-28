import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

// Chakra UI
import {
  useColorMode,
  Text,
  VStack,
  HStack,
  Icon,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  Textarea,
  FormLabel,
  FormControl,
  Button,
  Badge,
} from '@chakra-ui/react';

// MUI Icons

import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import '../css/vendereApp.css';
import { PrimaryButton } from './Buttons';
import { MoneyOff } from '@mui/icons-material';
import { Input } from './Inputs';
import { Skeleton } from './Skeleton';
import { ModalContent, ModalOverlay, ModalBody, ModalFooter } from './Modals';

const DebtsList = props => {
  const baseURL = 'http://localhost:8080';
  const { colorMode } = useColorMode();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const [loading, setLoading] = useState(false);
  const skeletonLength = ['', '', '', '', '', '', '', '', '', '', '', ''];
  const [itemFound, setItemFound] = useState(true);

  //* GET DATA
  useEffect(() => {
    const token = Cookies.get('_auth');

    const getTransactionsAdmin = `${baseURL}/api/v1/transactions/admin/debt`;

    setLoading(true);

    setTimeout(() => {
      axios
        .get(getTransactionsAdmin, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          // console.log(r.data.data);
          if (r.data.data) {
            props.setData(r.data.data);
          } else {
            props.setData([]);
          }
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }, 1);
  }, [props.refresh]);

  useEffect(() => {
    if (props.data?.length > 0) {
      props.selectItem({ index: 1 });
    }
  }, [props.data]);

  useEffect(() => {
    let isItemFound = true;
    if (props.data?.length !== 0) {
      isItemFound = props.data?.some(item => {
        const date = new Date(item.CreatedAt);
        const formattedDate = date.toLocaleDateString(undefined, dateOptions);
        return (
          item.ID.toString()?.includes(props.search) ||
          item.notes
            .toString()
            ?.toLowerCase()
            .includes(props.search?.toLowerCase()) ||
          item.change
            .toString()
            ?.toLowerCase()
            .includes(props.search?.toLowerCase()) ||
          formattedDate?.toLowerCase()?.includes(props.search?.toLowerCase())
        );
      });
    }

    if (isItemFound) {
      setItemFound(true);
    } else {
      setItemFound(false);
      props.setSelectedItem({});
    }
  }, [props.search, props.data, props.refresh]);

  useEffect(() => {
    if (itemFound) {
      props.setItemIndex(1);
      props.selectItem({ index: 1 });
    }
  }, [props.search, itemFound]);

  const ItemNotFound = () => {
    return (
      <VStack h={'100%'} justifyContent={'center'} opacity={0.2}>
        <Icon as={SearchOffOutlinedIcon} fontSize={'10rem'} />
        <Text fontSize={'x-large'} fontWeight={'bold'}>
          Debt Not Found
        </Text>
      </VStack>
    );
  };

  const dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  if (!loading) {
    if (itemFound) {
      return (
        <VStack
          className={colorMode === 'light' ? 'items onLight' : 'items onDark'}
          h={'100%'}
          w={'100%'}
          mt={'0px !important'}
          fontSize={'sm'}
          overflowY={'auto'}
          borderTop={'1px solid'}
          style={{
            borderColor:
              colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
          }}
        >
          {props.data?.map((item, index) => {
            const date = new Date(item.CreatedAt);
            const formattedDate = date.toLocaleDateString(
              undefined,
              dateOptions
            );
            if (
              item.ID.toString().includes(props.search) ||
              item.notes
                .toString()
                ?.toLowerCase()
                .includes(props.search?.toLowerCase()) ||
              item.change
                .toString()
                ?.toLowerCase()
                .includes(props.search?.toLowerCase()) ||
              formattedDate
                ?.toLowerCase()
                ?.includes(props.search?.toLowerCase())
            ) {
              return (
                <HStack
                  key={index}
                  id={'item' + index}
                  pl={4}
                  pr={6}
                  mt={'0px !important'}
                  w={'100%'}
                  alignItems={'flex-start'}
                  py={2}
                  position={'relative'}
                  style={{
                    background:
                      index % 2 === 1
                        ? colorMode === 'light'
                          ? 'var(--light)'
                          : 'var(--dark)'
                        : '',
                  }}
                >
                  {/* Item's ID */}
                  <Text w={'30%'} p={'4px 8px'}>
                    {item?.ID}
                  </Text>

                  {/* Item's Status */}
                  <VStack w={'50%'} alignItems={'flex-start'} pr={4}>
                    <Text fontWeight={'bold'} mt={'4px !important'}>
                      {item?.change?.toLocaleString('id-ID')}
                    </Text>
                    <Text mt={'4px !important'} opacity={item.notes ? 1 : 0.5}>
                      {item.notes || 'no notes'}
                    </Text>
                  </VStack>

                  {/* Item Action */}
                  <VStack
                    w={'20%'}
                    className={'actionBtnSection'}
                    alignSelf={'center'}
                  >
                    {screenWidth <= 1000 ? (
                      <DebtDetailsModal
                        selectItem={props.selectItem}
                        item={item}
                        selectedItem={props.selectedItem}
                        setSelectedItem={props.setSelectedItem}
                        refresh={props.refresh}
                        setRefresh={props.setRefresh}
                      />
                    ) : (
                      <Text
                        opacity={0.5}
                        size={'sm'}
                        cursor={'pointer'}
                        _hover={{ textDecoration: 'underline' }}
                        onClick={() => {
                          props.selectItem({ item: item });
                        }}
                      >
                        details
                      </Text>
                    )}
                  </VStack>
                </HStack>
              );
            }
          })}
        </VStack>
      );
    } else {
      return <ItemNotFound />;
    }
  } else {
    return (
      <VStack className="skeleton">
        {skeletonLength.map((val, index) => {
          return <Skeleton key={index} h={'100px'} />;
        })}
      </VStack>
    );
  }
};

const DebtDetails = props => {
  const { colorMode } = useColorMode();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const PayDebt = () => {
    const baseURL = 'http://localhost:8080';

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState({
      pay: 0,
      change: props.selectedItem.change,
      status: 'hutang',
      notes: props.selectedItem.notes,
    });
    const [loading, setLoading] = useState(false);

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

    function onPayDebt() {
      const payDebtAPI = `${baseURL}/api/v1/transactions/update?transaction_id=${props.selectedItem.ID}`;
      const token = Cookies.get('_auth');

      const debtDataToUpdate = {
        pay: props.selectedItem.pay + data.pay,
        change: data.change,
        status: data.status,
        notes: data.notes,
      };
      console.log(debtDataToUpdate);

      setLoading(true);
      function payDebt() {
        axios
          .put(payDebtAPI, debtDataToUpdate, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(r => {
            console.log(r);
            props.setSelectedItem({});
            props.setRefresh(!props.refresh);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      }

      payDebt();
      onClose();
    }

    return (
      <>
        <PrimaryButton label="Update Debt" w={'100%'} onClick={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent
            content={
              <>
                <ModalHeader px={4}>
                  <HStack>
                    <Icon as={MoneyOff} fontSize={'xx-large'} />
                    <Text>Updating Debt</Text>
                  </HStack>
                </ModalHeader>

                <ModalBody
                  content={
                    <>
                      <Text>Change</Text>
                      <HStack
                        fontWeight={'bold'}
                        alignItems={'flex-start'}
                        justifyContent={'space-between'}
                      >
                        <Text fontSize={'x-large'}>Rp.</Text>
                        <Text
                          textAlign={'right'}
                          fontSize={'xxx-large'}
                          w={'calc(100% - 37px)'}
                        >
                          {data.change?.toLocaleString('id-ID')}
                        </Text>
                      </HStack>

                      <HStack w={'100%'} justifyContent={'flex-end'}>
                        {data.status === 'lunas' ? (
                          <Badge fontSize={'16px'} colorScheme={'green'}>
                            lunas
                          </Badge>
                        ) : (
                          <Badge fontSize={'16px'} colorScheme={'red'}>
                            hutang
                          </Badge>
                        )}
                      </HStack>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Pay</FormLabel>
                        <HStack w={'100%'}>
                          <Input
                            value={formatNum(data.pay)}
                            // type={'number'}
                            onKeyUp={e => {
                              if (e.key === 'Enter') {
                                document.querySelector('#payDebtBtn').click();
                              }
                            }}
                            onChange={e => {
                              let status = 'hutang';
                              if (
                                parseInt(reverseFormatNumber(e.target.value)) >=
                                props.selectedItem.change * -1
                              ) {
                                status = 'lunas';
                              } else {
                                status = 'hutang';
                              }
                              setData({
                                ...data,
                                pay: parseInt(
                                  reverseFormatNumber(e.target.value)
                                ),
                                change:
                                  parseInt(
                                    reverseFormatNumber(e.target.value)
                                  ) + props.selectedItem.change,
                                status: status,
                              });
                            }}
                          />
                        </HStack>
                      </FormControl>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Notes</FormLabel>
                        <Textarea
                          mt={'0px !important'}
                          value={data?.notes}
                          borderRadius={6}
                          _placeholder={{ opacity: 0.5 }}
                          onChange={e => {
                            setData({
                              ...data,
                              notes: e.target.value,
                            });
                          }}
                          placeholder="Write some note here."
                          size="sm"
                          _focusVisible={{
                            border:
                              colorMode === 'light'
                                ? '2px solid '
                                : '2px solid',
                          }}
                        />
                      </FormControl>
                    </>
                  }
                />
                <ModalFooter
                  content={
                    <>
                      <ButtonGroup alignSelf={'flex-end'}>
                        <Button
                          className="btn"
                          onClick={onClose}
                          variant={'ghost'}
                        >
                          Close
                        </Button>
                        <PrimaryButton
                          id={'payDebtBtn'}
                          label={'Update Debt'}
                          isLoading={loading}
                          onClick={onPayDebt}
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
    <VStack
      style={{
        width: screenWidth <= 1000 ? '100%' : '50%',
        height: '100%',
        overflowY: 'auto',
        borderRadius: '12px',
        background: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-400a)',
      }}
      pt={3}
      justifyContent={'space-between'}
    >
      <VStack
        w={'100%'}
        h={props.selectedItem.ID ? 'calc(100% - 64px)' : '100%'}
      >
        <HStack alignSelf={'flex-start'} px={3} mb={2} opacity={0.5}>
          <Icon as={InfoOutlinedIcon} />
          <Text fontWeight={'bold'}>Debt Details</Text>
        </HStack>

        <VStack
          id={'itemDetails'}
          className={colorMode === 'light' ? 'onLight' : 'onDark'}
          w={'100%'}
          mt={'0px !important'}
          fontSize={'sm'}
          overflowY={'auto'}
          pb={3}
        >
          <VStack w={'100%'}>
            <HStack
              key={0}
              pt={3}
              px={5}
              pb={2}
              w={'100%'}
              alignItems={'flex-start'}
              borderBottom={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
              }}
            >
              <Text className="detailsLabels" w={'25%'}>
                ID
              </Text>
              <Text w={'75%'}>{props?.selectedItem?.ID}</Text>
            </HStack>

            <HStack
              key={1}
              px={5}
              pb={2}
              w={'100%'}
              alignItems={'flex-start'}
              borderBottom={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
              }}
            >
              <Text className="detailsLabels" w={'25%'}>
                Cashier ID
              </Text>
              <Text w={'75%'}>{props?.selectedItem?.cashierId}</Text>
            </HStack>

            <HStack
              key={3}
              px={5}
              pb={2}
              w={'100%'}
              alignItems={'flex-start'}
              borderBottom={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
              }}
            >
              <Text className="detailsLabels" w={'25%'}>
                Status
              </Text>
              <Text w={'75%'}>
                <Badge
                  colorScheme={
                    props?.selectedItem?.status === 'lunas' ? 'green' : 'red'
                  }
                >
                  {props?.selectedItem?.status}
                </Badge>
              </Text>
            </HStack>

            <HStack
              key={4}
              px={5}
              pb={2}
              w={'100%'}
              alignItems={'flex-start'}
              borderBottom={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
              }}
            >
              <Text className="detailsLabels" w={'25%'}>
                Total
              </Text>
              <Text w={'75%'}>
                {props?.selectedItem?.total?.toLocaleString('id-ID')}
              </Text>
            </HStack>

            <HStack
              key={5}
              px={5}
              pb={2}
              w={'100%'}
              alignItems={'flex-start'}
              borderBottom={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
              }}
            >
              <Text className="detailsLabels" w={'25%'}>
                Pay
              </Text>
              <Text w={'75%'}>
                {props?.selectedItem?.pay?.toLocaleString('id-ID')}
              </Text>
            </HStack>

            <HStack
              key={6}
              px={5}
              pb={2}
              w={'100%'}
              alignItems={'flex-start'}
              borderBottom={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
              }}
            >
              <Text className="detailsLabels" w={'25%'}>
                Change
              </Text>
              <Text w={'75%'} fontWeight={'bold'}>
                {props?.selectedItem?.change?.toLocaleString('id-ID')}
              </Text>
            </HStack>

            <HStack
              key={7}
              px={5}
              pb={2}
              w={'100%'}
              alignItems={'flex-start'}
              borderBottom={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
              }}
            >
              <Text className="detailsLabels" w={'25%'}>
                Cart List
              </Text>
              <VStack w={'75%'} pr={2}>
                {props.selectedItem.cartList?.map((item, index) => {
                  // console.log(item);
                  return (
                    <HStack
                      py={index !== 0 ? 1 : null}
                      pb={index === 0 ? 1 : null}
                      mt={'0px !important'}
                      w={'100%'}
                      justifyContent={'space-between'}
                      alignItems={'flex-start'}
                      borderBottom={
                        index !== props.selectedItem.cartList.length - 1
                          ? '1px solid var(--p-200a)'
                          : ''
                      }
                    >
                      <VStack w={'70%'} alignItems={'flex-start'}>
                        <Text>{item.name}</Text>
                        <Text mt={'0px !important'}>
                          {'@ ' + item.price?.toLocaleString('id-ID')}
                        </Text>
                      </VStack>
                      <Text w={'10%'}>{'×' + item.qty}</Text>
                      <Text w={'20%'} textAlign={'end'}>
                        {item.totalPrice?.toLocaleString('id-ID')}
                      </Text>
                    </HStack>
                  );
                })}
              </VStack>
            </HStack>

            <HStack
              key={8}
              px={5}
              pb={2}
              w={'100%'}
              alignItems={'flex-start'}
              borderBottom={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
              }}
            >
              <Text className="detailsLabels" w={'25%'}>
                Notes
              </Text>
              <Text w={'75%'} opacity={props?.selectedItem?.notes ? 1 : 0.5}>
                {props?.selectedItem?.notes || 'no notes'}
              </Text>
            </HStack>

            {/* <HStack
              key={9}
              px={5}
              pb={2}
              w={'100%'}
              alignItems={'flex-start'}
              borderBottom={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
              }}
            >
              <Text className="detailsLabels" w={'25%'}>
                Profit
              </Text>
              <Text w={'75%'}>
                {props?.selectedItem?.totalProfit?.toLocaleString('id-ID')}
              </Text>
            </HStack> */}

            <HStack
              key={9}
              px={5}
              pb={2}
              w={'100%'}
              alignItems={'flex-start'}
              borderBottom={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
              }}
            >
              <Text className="detailsLabels" w={'25%'}>
                Created At
              </Text>
              <Text w={'75%'}>{props?.selectedItem?.CreatedAt}</Text>
            </HStack>

            <HStack
              key={10}
              px={5}
              pb={2}
              w={'100%'}
              alignItems={'flex-start'}
              borderBottom={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
              }}
            >
              <Text className="detailsLabels" w={'25%'}>
                Updated At
              </Text>
              <Text w={'75%'}>{props?.selectedItem?.UpdatedAt}</Text>
            </HStack>
          </VStack>
        </VStack>
      </VStack>

      <HStack
        w={'100%'}
        mt={'0px !important'}
        p={3}
        overflowY={'auto'}
        borderRadius={'0 0 12px 12px'}
        justifyContent={'center'}
        style={{
          borderColor:
            colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
        }}
        // bg={'var(--p-500)'}
        // py={3}
        // borderTop={'1px solid'}
        // borderBottom={'1px solid'}
      >
        {props.selectedItem.ID && (
          <PayDebt setSelectedItem={props.setSelectedItem} />
        )}
      </HStack>
    </VStack>
  );
};

const DebtDetailsModal = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  return (
    <>
      <Text
        opacity={0.5}
        size={'sm'}
        cursor={'pointer'}
        _hover={{ textDecoration: 'underline' }}
        onClick={() => {
          props.selectItem({ item: props.item });
          onOpen();
        }}
      >
        details
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent
          h={screenWidth <= 1000 ? '90%' : ''}
          content={
            <>
              <ModalCloseButton borderRadius={50} />

              <ModalBody
                content={
                  <>
                    <DebtDetails
                      selectedItem={props.selectedItem}
                      setSelectedItem={props.setSelectedItem}
                      refresh={props.refresh}
                      setRefresh={props.setRefresh}
                      onClose={onClose}
                    />
                  </>
                }
                px={0}
                py={0}
                pb={'0px'}
                h={'100%'}
              />
            </>
          }
        />
      </Modal>
    </>
  );
};

export { DebtsList, DebtDetails, DebtDetailsModal };
