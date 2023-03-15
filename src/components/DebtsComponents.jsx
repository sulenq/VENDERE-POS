import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useAuthUser, useSignOut } from 'react-auth-kit';

// Chakra UI
import {
  IconButton,
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
  useToast,
  Alert,
  AlertIcon,
  FormLabel,
  FormControl,
  Button,
  Badge,
} from '@chakra-ui/react';

// MUI Icons
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import LayersClearOutlinedIcon from '@mui/icons-material/LayersClearOutlined';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

import '../css/vendereApp.css';
import { PrimaryButton, PrimaryButtonOutline } from './Buttons';
import { MoneyOff, PeopleAltOutlined, Search } from '@mui/icons-material';
import { SearchBox, Input } from './Inputs';
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
        return (
          item.ID.toString()?.includes(props.search) ||
          item.notes.toString()?.toLowerCase().includes(props.search) ||
          item.total.toString()?.toLowerCase().includes(props.search)
        );
      });
    }

    if (isItemFound) {
      setItemFound(true);
    } else {
      setItemFound(false);
      props.setSelectedItem({});
    }
  }, [props.search]);

  useEffect(() => {
    props.setItemIndex(1);
    props.selectItem({ index: 1 });
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
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  if (!loading) {
    if (itemFound) {
      return (
        <VStack
          className="items"
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
            if (
              item.ID.toString().includes(props.search) ||
              item.notes.toString()?.toLowerCase().includes(props.search) ||
              item.total.toString()?.toLowerCase().includes(props.search)
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
                      {item?.change?.toLocaleString()}
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
    });
    const [loading, setLoading] = useState(false);

    function onPayDebt() {
      const payDebtAPI = `${baseURL}/api/v1/transactions/updatedebt?transaction_id=${props.selectedItem.ID}`;
      const token = Cookies.get('_auth');

      const debtDataToUpdate = {
        pay: props.selectedItem.pay + data.pay,
        change: data.change,
        status: data.status,
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
        <PrimaryButton label="Pay Debt" w={'100%'} onClick={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent
            content={
              <>
                <ModalHeader px={4}>
                  <HStack>
                    <Icon as={MoneyOff} fontSize={'xx-large'} />
                    <Text>Pay Debt</Text>
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
                          {data.change?.toLocaleString()}
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
                            value={data.pay || ''}
                            type={'number'}
                            onKeyUp={e => {
                              if (e.key === 'Enter') {
                                document.querySelector('#payDebtBtn').click();
                              }
                            }}
                            onChange={e => {
                              let status = 'hutang';
                              if (
                                e.target.value >=
                                props.selectedItem.change * -1
                              ) {
                                status = 'lunas';
                              } else {
                                status = 'hutang';
                              }
                              setData({
                                pay: parseInt(e.target.value),
                                change:
                                  parseInt(e.target.value || '0') +
                                  props.selectedItem.change,
                                status: status,
                              });
                            }}
                          />
                        </HStack>
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
                          label={'Pay Debt'}
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
        background: colorMode === 'light' ? 'white' : 'var(--p-400a)',
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
                {props?.selectedItem?.total?.toLocaleString()}
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
                {props?.selectedItem?.pay?.toLocaleString()}
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
              <Text w={'75%'}>
                {props?.selectedItem?.change?.toLocaleString()}
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
                          {'@ ' + item.price?.toLocaleString()}
                        </Text>
                      </VStack>
                      <Text w={'10%'}>{'×' + item.qty}</Text>
                      <Text w={'20%'} textAlign={'end'}>
                        {item.totalPrice?.toLocaleString()}
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
                Profit
              </Text>
              <Text w={'75%'}>
                {props?.selectedItem?.totalProfit?.toLocaleString()}
              </Text>
            </HStack>

            <HStack
              key={2}
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
