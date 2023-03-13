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

const ReportsList = props => {
  const baseURL = 'http://localhost:8080';
  const { colorMode } = useColorMode();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const auth = useAuthUser();
  const [rawData, setRawData] = useState();
  const [loading, setLoading] = useState(false);
  const skeletonLength = ['', '', '', '', '', '', '', '', '', '', '', ''];
  const [itemFound, setItemFound] = useState(true);

  //* GET DATA
  useEffect(() => {
    const token = Cookies.get('_auth');

    let getTransactionsAPI;
    if (auth().userRole === 'admin') {
      getTransactionsAPI = `${baseURL}/api/v1/transactions/admin`;
    } else if (auth().userRole === 'cashier') {
      getTransactionsAPI = `${baseURL}/api/v1/transactions/cashier`;
    }
    setLoading(true);

    setTimeout(() => {
      axios
        .get(getTransactionsAPI, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          // console.log(r.data.data);
          if (r.data.data) {
            setRawData(r.data.data);
          } else {
            setRawData([]);
          }
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }, 1);
  }, [props.refresh]);

  //* OLAH DATA
  useEffect(() => {
    let data = [];
    const dataFormat = {
      period: '',
    };

    if (rawData) {
      props.setData(rawData);
    }
  }, [rawData]);

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
          Transaction Not Found
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
              colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
          }}
        >
          
          <HStack
            // key={index}
            // id={'item' + index}
            pl={4}
            pr={6}
            mt={'0px !important'}
            w={'100%'}
            alignItems={'flex-start'}
            py={2}
            position={'relative'}
            // style={{
            //   background:
            //     index % 2 === 1
            //       ? colorMode === 'light'
            //         ? 'var(--light)'
            //         : 'var(--dark)'
            //       : null,
            // }}
          >
            {/* Item's ID */}
            <Text w={'30%'} p={'4px 8px'}>
              Maret 2023
            </Text>

            {/* Item's Status */}
            <VStack w={'50%'} alignItems={'flex-start'} pr={4}>
              <Text mt={'4px !important'}>{(13880091).toLocaleString()}</Text>
              <Badge
                fontWeight={'bold'}
                colorScheme={'green'}
                // colorScheme={item.status === 'lunas' ? 'green' : 'red'}
              >
                PROFIT
              </Badge>
            </VStack>

            {/* Item Action */}
            <VStack
              w={'20%'}
              className={'actionBtnSection'}
              alignSelf={'center'}
            >
              {screenWidth <= 1000 ? (
                <ReportDetailsModal
                  reportType={props.reportType}
                  selectItem={props.selectItem}
                  // item={item}
                  selectedItem={props.selectedItem}
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
                    // props.selectItem({ item: item });
                  }}
                >
                  details
                </Text>
              )}
            </VStack>
          </HStack>
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

const ReportDetails = props => {
  // console.log(props.selectedItem);
  const auth = useAuthUser();
  const { colorMode } = useColorMode();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

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
        h={screenWidth <= 1000 ? 'calc(100% - 64px)' : '100%'}
        pb={3}
      >
        <HStack alignSelf={'flex-start'} px={3} mb={2} opacity={0.5}>
          <Icon as={InfoOutlinedIcon} />
          <Text fontWeight={'bold'}>Report Details</Text>
        </HStack>

        <VStack
          id={'itemDetails'}
          w={'100%'}
          mt={'0px !important'}
          fontSize={'sm'}
          overflowY={'auto'}
          pb={3}
          px={2}
        >
          <VStack
            py={3}
            px={3}
            w={'100%'}
            alignItems={'flex-start'}
            fontWeight={'bold'}
          >
            <HStack
              mt={'0 !important'}
              justifyContent={'space-between'}
              w={'100%'}
            >
              <Text>{auth().displayName}</Text>
              <Badge colorScheme={'green'} mt={'0 !important'}>
                PROFIT
              </Badge>
            </HStack>

            <HStack
              mt={'0 !important'}
              justifyContent={'space-between'}
              w={'100%'}
            >
              <Text mt={'0 !important'}>{props?.reportType + ' Report'}</Text>
              <Text mt={'0 !important'}>Maret 2023</Text>
            </HStack>
          </VStack>

          {/* Revenue */}
          <VStack className="reportDetailContainer">
            <HStack
              className="title"
              bg={colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300)'}
            >
              <Text>REVENUE</Text>
            </HStack>

            <HStack
              className="reportDetail"
              style={{
                borderColor: 'transparent',
              }}
            >
              <Text className="label">Penjualan</Text>
              <Text>{(12213123).toLocaleString()}</Text>
            </HStack>

            <HStack
              className="reportDetail"
              borderTop={'1px solid'}
              fontWeight={'bold'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--p-100)' : 'var(--p-200)',
              }}
            >
              <Text className="label">Gross Revenue</Text>
              <Text>{(12213123).toLocaleString()}</Text>
            </HStack>
          </VStack>

          {/* Debt */}
          <VStack pt={4} className="reportDetailContainer">
            <HStack
              className="title"
              bg={colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300)'}
            >
              <Text>DEBT</Text>
            </HStack>

            <HStack
              className="reportDetail"
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
              }}
            >
              <Text className="label">Piutang</Text>
              <Text>{(-613123).toLocaleString()}</Text>
            </HStack>

            <HStack
              className="reportDetail"
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light)' : 'var(--p-350)',
              }}
            >
              <Text className="label">Beban Utang</Text>
              <Text>{(0).toLocaleString()}</Text>
            </HStack>

            <HStack
              className="reportDetail"
              fontWeight={'bold'}
              borderTop={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--p-100)' : 'var(--p-200)',
              }}
            >
              <Text className="label">Total Revenue</Text>
              <Text>{(11600000).toLocaleString()}</Text>
            </HStack>

            {/* <HStack
              className="reportDetail"
              fontWeight={'bold'}
              borderTop={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--p-100)' : 'var(--p-200)',
              }}
            >
              <Text className="label">Total Debt</Text>
              <Text>{(613123).toLocaleString()}</Text>
            </HStack> */}
          </VStack>

          {/* Cost of Sales */}
          <VStack pt={4} className="reportDetailContainer">
            <HStack
              className="title"
              bg={colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300)'}
            >
              <Text>COST OF SALES</Text>
            </HStack>

            <HStack
              className="reportDetail"
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
              }}
            >
              <Text className="label">Pembelian</Text>
              <Text>{(-6213123).toLocaleString()}</Text>
            </HStack>

            <HStack
              className="reportDetail"
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light)' : 'var(--p-350)',
              }}
            >
              <Text className="label">Beban Angkut</Text>
              <Text>{(0).toLocaleString()}</Text>
            </HStack>

            <HStack
              className="reportDetail"
              fontWeight={'bold'}
              borderTop={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--p-100)' : 'var(--p-200)',
              }}
            >
              <Text className="label">Total Cost of Sales</Text>
              <Text>{(-6213123).toLocaleString()}</Text>
            </HStack>

            <HStack
              className="reportDetail"
              fontWeight={'bold'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--p-100)' : 'var(--p-200)',
              }}
            >
              <Text className="label">Gross Profit</Text>
              <Text>{(6000000).toLocaleString()}</Text>
            </HStack>
          </VStack>

          {/* Expenses */}
          <VStack pt={4} className="reportDetailContainer">
            <Text
              className="title"
              bg={colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300)'}
            >
              EXPENSES
            </Text>

            <VStack w={'100%'} alignItems={'flex-start'}>
              <Text opacity={0.6} px={5}>
                Beban Operasional
              </Text>

              <HStack
                className="reportDetail"
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
                }}
              >
                <Text className="label" pl={4}>
                  Beban Listrik
                </Text>
                <Text>{(-613123).toLocaleString()}</Text>
              </HStack>

              <HStack
                className="reportDetail"
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
                }}
              >
                <Text className="label" pl={4}>
                  Beban Sewa
                </Text>
                <Text>{(0).toLocaleString()}</Text>
              </HStack>

              <HStack
                className="reportDetail"
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
                }}
              >
                <Text className="label" pl={4}>
                  Beban Telepon
                </Text>
                <Text>{(-12412).toLocaleString()}</Text>
              </HStack>
            </VStack>

            <VStack w={'100%'} alignItems={'flex-start'}>
              <Text opacity={0.6} px={5}>
                Beban Lain
              </Text>

              <HStack
                className="reportDetail"
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
                }}
              >
                <Text className="label" pl={4}>
                  Penyesuaian Persediaan
                </Text>
                <Text>{(-121412).toLocaleString()}</Text>
              </HStack>

              <HStack
                className="reportDetail"
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
                }}
              >
                <Text className="label" pl={4}>
                  Lain-lain
                </Text>
                <Text>{(-32112).toLocaleString()}</Text>
              </HStack>
            </VStack>

            <VStack w={'100%'} alignItems={'flex-start'}>
              <Text opacity={0.6} px={5}>
                Prive
              </Text>

              <HStack
                className="reportDetail"
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
                }}
              >
                <Text className="label" pl={4}>
                  Total Prive
                </Text>
                <Text>{(-231412).toLocaleString()}</Text>
              </HStack>
            </VStack>

            <HStack
              className="reportDetail"
              fontWeight={'bold'}
              borderTop={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--p-100)' : 'var(--p-200)',
              }}
            >
              <Text className="label">Total Expenses</Text>
              <Text>{(-1010471).toLocaleString()}</Text>
            </HStack>
          </VStack>

          <HStack
            w={'100%'}
            justifyContent={'space-between'}
            mt={'12px !important'}
            px={3}
            py={1}
            bg={'var(--accenta)'}
            fontWeight={'bold'}
            borderRadius={4}
          >
            <Text className="label">Total Profit / Loss(-)</Text>
            <Text>{(4376406).toLocaleString()}</Text>
          </HStack>
        </VStack>
      </VStack>

      {screenWidth <= 1000 && (
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
        >
          <PrimaryButton label={'Got It'} w={'100%'} onClick={props.onClose} />
        </HStack>
      )}
    </VStack>
  );
};

const ReportDetailsModal = props => {
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
          // props.selectItem({ item: props.item });
          onOpen();
        }}
      >
        details
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent
          h={screenWidth <= 1000 ? '95%' : ''}
          content={
            <>
              <ModalBody
                overflowY={'auto'}
                content={
                  <>
                    <ModalCloseButton borderRadius={50} />

                    <ReportDetails
                      reportType={props.reportType}
                      selectedItem={props.selectedItem}
                      refresh={props.refresh}
                      setRefresh={props.setRefresh}
                      onClose={onClose}
                      pb={'0px !important'}
                    />
                  </>
                }
                px={0}
                py={0}
                pb={'0px !important'}
                h={'100%'}
              />
            </>
          }
        />
      </Modal>
    </>
  );
};

export { ReportsList, ReportDetails, ReportDetailsModal };
