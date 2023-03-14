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
  const [rawData, setRawData] = useState(false);
  const [transData, setTransData] = useState();
  const [debtsData, setDebtsData] = useState();
  const [expensesData, setExpensesData] = useState();
  const [loading, setLoading] = useState(false);
  const skeletonLength = ['', '', '', '', '', '', '', '', '', '', '', ''];
  const [itemFound, setItemFound] = useState(true);

  //* GET DATA
  useEffect(() => {
    const token = Cookies.get('_auth');

    let getTransactionsAPI = `${baseURL}/api/v1/transactions/admin`;

    setLoading(true);

    setTimeout(() => {
      axios
        .get(getTransactionsAPI, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          // console.log(r.data.data);
          if (r.data.data) {
            setTransData(r.data.data);
          } else {
            setTransData([]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, 1);

    let getExpensesAPI = `${baseURL}/api/v1/transactions/admin`;

    setTimeout(() => {
      axios
        .get(getExpensesAPI, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          // console.log(r.data.data);
          if (r.data.data) {
            setExpensesData(r.data.data);
          } else {
            setExpensesData([]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, 1);

    let getDebtsAPI = `${baseURL}/api/v1/transactions/admin/debt`;

    setTimeout(() => {
      axios
        .get(getDebtsAPI, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          // console.log(r.data.data);
          if (r.data.data) {
            setDebtsData(r.data.data);
          } else {
            setDebtsData([]);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }, 1);
  }, [props.refresh]);

  useEffect(() => {
    if (transData && expensesData && debtsData) {
      setRawData(true);
      setLoading(false);
    }
  }, [transData, expensesData, debtsData]);

  //* OLAH DATA
  useEffect(() => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    let data = [
      {
        period: 'March 2023',
        status: 'profit',
        revenue: { penjualan: 12213123, grossRevenue: 12213123 },
        debt: {
          piutang: -613123,
          bebanUtang: 0,
          totalRevenue: 11600000,
        },
        cos: {
          pembelian: -6213123,
          bebanAngkut: 0,
          totalCos: -6213123,
          grossProfit: 6000000,
        },
        expenses: {
          bebanOperasional: {
            bebanListrik: -613123,
            bebanSewa: 0,
            bebanTelepon: -12412,
          },
          bebanLain: {
            penyesuaianPersediaan: -121412,
            lainLain: -32112,
          },
          prive: {
            totalPrive: -231412,
          },
          totalExpenses: -1010471,
        },
        totalProfit: 4376406,
      },
      {
        period: 'April 2023',
        status: 'loss',
        revenue: { penjualan: 15213123, grossRevenue: 15213123 },
        debt: {
          piutang: -10013123,
          bebanUtang: 0,
          totalRevenue: 15600000,
        },
        cos: {
          pembelian: -8213123,
          bebanAngkut: 0,
          totalCos: -8213123,
          grossProfit: 3502500,
        },
        expenses: {
          bebanOperasional: {
            bebanListrik: -813123,
            bebanSewa: 0,
            bebanTelepon: -72412,
          },
          bebanLain: {
            penyesuaianPersediaan: -221412,
            lainLain: -32112,
          },
          prive: {
            totalPrive: -2431412,
          },
          totalExpenses: -2010570,
        },
        totalProfit: -1376406,
      },
    ];

    let dataSet = [];

    function getRevenue(data, period) {
      let revenue = { penjualan: 0, grossRevenue: 0 };
      data?.forEach(item => {
        const date = new Date(item.CreatedAt);
        const month = date.toLocaleString(undefined, { month: 'long' });
        const year = date.getFullYear();
        if (period == `${month} ${year}`) {
          revenue.penjualan += item.total;
        }
      });
      revenue.grossRevenue = revenue.penjualan;
      return revenue;
    }

    function getDebt(data, period) {
      const debt = { piutang: 0, bebanUtang: 0 };

      data.forEach((item, index) => {
        const date = new Date(item.CreatedAt);
        const month = date.toLocaleString(undefined, { month: 'long' });
        const year = date.getFullYear();
        // console.log(`${period} == ${month} ${year}`);
        if (period == `${month} ${year}`) {
          // console.log('titit')
          debt.piutang += item.change;
        }
      });

      return debt;
    }

    function getCos(data, period) {}

    function getExpenses(data, period) {}

    let dataFormat = {
      period: 'Maret 2023',
      status: '',
      revenue: { penjualan: 0, grossRevenue: 0 },
      debt: {
        piutang: 0,
        bebanUtang: 0,
      },
      totalRevenue: 0,
      cos: {
        pembelian: 0,
        bebanAngkut: 0,
        totalCos: 0,
        grossProfit: 0,
      },
      expenses: {
        bebanOperasional: {
          bebanListrik: 0,
          bebanSewa: 0,
          bebanTelepon: 0,
        },
        bebanLain: {
          penyesuaianPersediaan: 0,
          lainLain: 0,
        },
        prive: {
          totalPrive: 0,
        },
        totalExpenses: 0,
      },
      totalProfit: 0,
    };

    if (transData) {
      const periods = [];
      transData.forEach((rData, index) => {
        const date = new Date(rData.CreatedAt);
        const month = date.toLocaleString(undefined, { month: 'long' });
        const year = date.getFullYear();
        if (!periods.includes(`${month} ${year}`)) {
          periods.push(`${month} ${year}`);
        }
      });

      // console.log(periods);
      periods.forEach((period, index) => {
        const revenue = getRevenue(transData, period);
        const debt = getDebt(debtsData, period);
        const totalRevenue =
          revenue?.grossRevenue + debt?.piutang + debt?.bebanUtang;
        const cos = {
          pembelian: 0,
          bebanAngkut: 0,
          totalCos: 0,
        };
        const grossProfit = totalRevenue + cos.totalCos;
        const expenses = {
          bebanOperasional: {
            bebanListrik: 0,
            bebanSewa: 0,
            bebanTelepon: 0,
          },
          bebanLain: {
            penyesuaianPersediaan: 0,
            lainLain: 0,
          },
          prive: {
            totalPrive: 0,
          },
          totalExpenses: 0,
        };
        const totalProfit = grossProfit + expenses.totalExpenses;

        let dataFormat = {
          period: period,
          status: 'profit',
          revenue: revenue,
          debt: debt,
          totalRevenue: totalRevenue,
          cos: {
            pembelian: 0,
            bebanAngkut: 0,
            totalCos: 0,
            grossProfit: grossProfit,
          },
          expenses: {
            bebanOperasional: {
              bebanListrik: 0,
              bebanSewa: 0,
              bebanTelepon: 0,
            },
            bebanLain: {
              penyesuaianPersediaan: 0,
              lainLain: 0,
            },
            prive: {
              totalPrive: 0,
            },
            totalExpenses: 0,
          },
          totalProfit: totalProfit,
        };

        dataSet.push(dataFormat);
      });
      props.setData(dataSet);
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
        return item.period
          ?.toLowerCase()
          ?.includes(props.search)
          ?.toLowerCase();
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
          Report Not Found
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
          {props.data?.map((item, index) => {
            if (
              item?.period?.toLowerCase()?.includes(props.search?.toLowerCase())
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
                        : null,
                  }}
                >
                  {/* Item's Period */}
                  <Text w={'30%'} p={'4px 8px'}>
                    {item?.period}
                  </Text>

                  {/* Item's Status */}
                  <VStack w={'50%'} alignItems={'flex-start'} pr={4}>
                    <Text mt={'4px !important'}>
                      {item?.totalRevenue?.toLocaleString()}
                    </Text>
                    <Badge
                      fontWeight={'bold'}
                      mt={'4px !important'}
                      colorScheme={item.status === 'profit' ? 'green' : 'red'}
                    >
                      {item?.totalProfit?.toLocaleString()}
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

  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString(undefined, { month: 'long' });
  const currentYear = currentDate.getFullYear();
  const currentPeriod = `${currentMonth} ${currentYear}`;

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
        pb={screenWidth <= 1000 ? 0 : 3}
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
              <Badge
                colorScheme={
                  props?.selectedItem?.status === 'profit' ? 'green' : 'red'
                }
                mt={'0 !important'}
              >
                {props?.selectedItem?.status}
              </Badge>
            </HStack>

            <HStack
              mt={'0 !important'}
              justifyContent={'space-between'}
              w={'100%'}
            >
              {props?.selectedItem?.period == currentPeriod ? (
                <>
                  <HStack>
                    <Text mt={'0 !important'}>
                      {props?.reportType + ' Report'}
                    </Text>
                    <Badge
                      variant={'solid'}
                      colorScheme={'red'}
                      borderRadius={50}
                      w={'10px'}
                      h={'10px'}
                    ></Badge>
                    <Text>Ongoing</Text>
                  </HStack>
                </>
              ) : (
                <Text mt={'0 !important'}>{props?.reportType + ' Report'}</Text>
              )}

              <Text mt={'0 !important'}>{props?.selectedItem?.period}</Text>
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
              <Text>
                {props?.selectedItem?.revenue?.penjualan?.toLocaleString()}
              </Text>
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
              <Text>
                {props?.selectedItem?.revenue?.grossRevenue?.toLocaleString()}
              </Text>
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
              <Text>
                {props?.selectedItem?.debt?.piutang?.toLocaleString()}
              </Text>
            </HStack>

            <HStack
              className="reportDetail"
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light)' : 'var(--p-350)',
              }}
            >
              <Text className="label">Beban Utang</Text>
              <Text>
                {props?.selectedItem?.debt?.bebanUtang?.toLocaleString()}
              </Text>
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
              <Text>{props?.selectedItem?.totalRevenue?.toLocaleString()}</Text>
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
              <Text>
                {props?.selectedItem?.cos?.pembelian?.toLocaleString()}
              </Text>
            </HStack>

            <HStack
              className="reportDetail"
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light)' : 'var(--p-350)',
              }}
            >
              <Text className="label">Beban Angkut</Text>
              <Text>
                {props?.selectedItem?.cos?.bebanAngkut?.toLocaleString()}
              </Text>
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
              <Text>
                {props?.selectedItem?.cos?.totalCos?.toLocaleString()}
              </Text>
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
              <Text>
                {props?.selectedItem?.cos?.grossProfit?.toLocaleString()}
              </Text>
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
                <Text>
                  {props?.selectedItem?.expenses?.bebanOperasional?.bebanListrik?.toLocaleString()}
                </Text>
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
                <Text>
                  {props?.selectedItem?.expenses?.bebanOperasional?.bebanSewa?.toLocaleString()}
                </Text>
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
                <Text>
                  {props?.selectedItem?.expenses?.bebanOperasional?.bebanTelepon?.toLocaleString()}
                </Text>
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
                <Text>
                  {props?.selectedItem?.expenses?.bebanLain?.penyesuaianPersediaan?.toLocaleString()}
                </Text>
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
                <Text>
                  {props?.selectedItem?.expenses?.bebanLain?.lainLain.toLocaleString()}
                </Text>
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
                <Text>
                  {props?.selectedItem?.expenses?.prive?.totalPrive?.toLocaleString()}
                </Text>
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
              <Text>
                {props?.selectedItem?.expenses?.totalExpenses?.toLocaleString()}
              </Text>
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
            <Text>{props?.selectedItem?.totalProfit?.toLocaleString()}</Text>
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
          props.selectItem({ item: props.selectedItem });
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
