import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Chart from 'chart.js/auto';
import { Line as LineChart } from 'react-chartjs-2';

import {
  Badge,
  useToast,
  HStack,
  useColorMode,
  VStack,
  Text,
  Avatar,
  Icon,
} from '@chakra-ui/react';
import { ColorModeButton } from '../components/ColorModeSwitcher';

// MUI Icons
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';

import '../css/vendereApp.css';

import { PrimaryButton, PrimaryButtonOutline } from '../components/Buttons';
import { ModalContent, ModalFooter, ModalOverlay } from '../components/Modals';
import { Input } from '../components/Inputs';
import { Skeleton } from '../components/Skeleton';

const RDashboard = () => {
  const baseURL = 'http://localhost:8080';
  const token = Cookies.get('_auth');
  const { colorMode } = useColorMode();
  const toast = useToast();
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });
  const employeesSkeletonLength = ['', '', ''];

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState();

  //* Get Data
  useEffect(() => {
    const getEmployeesAPI = `${baseURL}/api/v1/cashiers`;

    setLoading(true);

    setTimeout(() => {
      axios
        .get(getEmployeesAPI, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          // console.log(r);
          let totalOnline = 0;
          r?.data?.data?.forEach(emp => {
            if (emp.online) {
              totalOnline += 1;
            }
          });
          // console.log(totalOnline);
          setData({
            total: r.data.data?.length || 0,
            totalOnline: totalOnline,
            list: r.data.data,
          });
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }, 1);
  }, [refresh]);

  return (
    <VStack mt={'16px !important'} w={'100%'} alignItems={'flex-start'}>
      {/* Heading */}
      <HStack
        className="dashboardLabel"
        style={{ width: '100%', justifyContent: 'space-between' }}
      >
        <Text fontWeight={'bold'} opacity={0.5}>
          Employees (online feature coming soon!)
        </Text>
      </HStack>

      {/* Body */}
      <VStack
        alignItems={'flex-start'}
        p={2}
        w={'100%'}
        style={{
          border:
            colorMode === 'light'
              ? '2px solid var(--p-75)'
              : '2px solid var(--p-350)',
          borderRadius: '12px',
        }}
      >
        <HStack w={'100%'} justifyContent={'space-between'}>
          {!loading ? (
            <HStack px={2}>
              <Text fontWeight={'bold'}>
                {data?.total?.toLocaleString('id-ID')}
              </Text>
              <Text mt={'0px !important'} color={'var(--p-200)'}>
                Total Employees
              </Text>
            </HStack>
          ) : (
            <HStack w={'150px'}>
              <Skeleton h={'10px'} />
            </HStack>
          )}

          {!loading ? (
            <HStack px={2}>
              <Badge
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50px',
                }}
                colorScheme={'green'}
                variant={'solid'}
              ></Badge>
              <Text>{data?.totalOnline}</Text>
              <Text opacity={'0.5'}>Online</Text>
            </HStack>
          ) : (
            <HStack w={'100px'}>
              <Skeleton h={'10px'} />
            </HStack>
          )}
        </HStack>

        <VStack w={'100%'} pb={2}>
          {!loading
            ? data?.list?.map((emp, index) => {
                return (
                  <HStack
                    key={index}
                    px={2}
                    py={2}
                    style={{
                      width: '100%',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Avatar
                      size={'lg'}
                      name={emp.username}
                      background={
                        colorMode == 'light' ? 'var(--p-75)' : 'var(--p-350)'
                      }
                      color={
                        colorMode == 'light' ? 'var(--p-200)' : 'var(--p-200)'
                      }
                    />
                    <VStack alignItems={'flex-start'} pl={1}>
                      {emp.online ? (
                        <Badge colorScheme={'green'}>Online</Badge>
                      ) : (
                        <Badge>Offline</Badge>
                      )}
                      <Text mt={'0px !important'}>{emp.username}</Text>
                      <Text style={{ color: 'var(--p-200)', marginTop: '0' }}>
                        {emp.role}
                      </Text>
                    </VStack>
                  </HStack>
                );
              }) || (
                <VStack h={'300px'} justifyContent={'center'} opacity={0.2}>
                  <Icon as={PersonOffOutlinedIcon} fontSize={'10rem'} />
                  <Text fontSize={'x-large'} fontWeight={'bold'}>
                    No Employees
                  </Text>
                </VStack>
              )
            : employeesSkeletonLength.map((val, index) => {
                return <Skeleton key={index} h={'70px'} />;
              })}
        </VStack>

        <PrimaryButton
          label="Manage Employees"
          w={'100%'}
          onClick={() => {
            navigate('/vendere-app/employees');
          }}
        />
      </VStack>
    </VStack>
  );
};

const LDashboard = () => {
  const baseURL = 'http://localhost:8080';
  const token = Cookies.get('_auth');
  const { colorMode } = useColorMode();
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const [data, setData] = useState({
    totalRevenue: 0,
    revenueData: [],
  });

  const [totalExpenses, setTotalExpenses] = useState();

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState();
  // console.log(data?.revenueData);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentMonthLong = currentDate.toLocaleString('en-EN', {
    month: 'long',
  });

  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  const daysArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(new Date(currentYear, currentMonth - 1, i).getDate());
  }
  const labels = daysArray;
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Dialy Revenue',
        data: data?.revenueData,
        fill: true,
        borderColor: '#fdd100',
        backgroundColor: '#fdd10030',
      },
      // {
      //   label: 'Dialy Expenses',
      //   data: [
      //     190000, 290000, 200000, 110000, 160000, 150000, 200000, 2300, 12000,
      //     8000,
      //   ],
      //   fill: true,
      //   borderColor: colorMode === 'light' ? 'black' : 'white',
      //   backgroundColor: colorMode === 'light' ? '#00000015' : '#ffffff15',
      // },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        align: 'start',
        display: true,
        title: {
          padding: 100,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date (day)',
        },
        grid: {
          color: '#88888830',
        },
      },
      y: {
        grid: {
          color: '#88888830',
        },
      },
    },
  };

  const plugins = [
    {
      id: 'increase-legend-spacing',
      beforeInit(chart) {
        // Get reference to the original fit function
        const originalFit = chart.legend.fit;
        // Override the fit function
        chart.legend.fit = function fit() {
          // Call original function and bind scope in order to use `this` correctly inside it
          originalFit.bind(chart.legend)();
          this.height += 20;
        };
      },
    },
  ];

  function getTotalRevenue(data) {
    let totalRevenue = 0;
    data?.forEach(item => {
      totalRevenue += item.total;
    });
    return totalRevenue;
  }

  function getRevenueData(data) {
    const rawRevenueData = {};
    for (let day of daysArray) {
      if (day <= currentDate.getDate()) {
        rawRevenueData[day] = 0;
      }
    }

    for (let item of data) {
      const date = new Date(item.CreatedAt);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();

      if (year === currentYear && month === currentMonth) {
        if (!rawRevenueData[day]) {
          rawRevenueData[day] = item.total;
        } else {
          rawRevenueData[day] += item.total;
        }
      }
    }
    // console.log(rawRevenueData);

    const revenueData = [];
    for (let key in rawRevenueData) {
      revenueData.push(rawRevenueData[key]);
    }
    return revenueData;
  }

  function getTotalExpenses(expensesData) {
    // console.log(expensesData);
    const period = `${currentMonthLong} ${currentYear}`;
    // console.log(period);
    const expenses = {
      cos: {
        pembelian: 0,
        bebanAngkut: 0,
      },
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

    expensesData.forEach((item, index) => {
      const date = new Date(item.CreatedAt);
      const month = date.toLocaleString('en-EN', { month: 'long' });
      const year = date.getFullYear();

      if (period == `${month} ${year}`) {
        switch (item.jenis) {
          case 'Pembelian':
            expenses.cos.pembelian -= item.total;
            break;
          case 'Beban Angkut':
            expenses.cos.bebanAngkut -= item.total;
            break;
          case 'Beban Listrik':
            expenses.bebanOperasional.bebanListrik -= item.total;
            break;
          case 'Beban Sewa':
            expenses.bebanOperasional.bebanSewa -= item.total;
            break;
          case 'Beban Telepon':
            expenses.bebanOperasional.bebanTelepon -= item.total;
            break;
          case 'Penyesuaian Persediaan':
            expenses.bebanLain.penyesuaianPersediaan -= item.total;
            break;
          case 'Lain-lain':
            expenses.bebanLain.lainLain -= item.total;
            break;
          case 'Prive':
            expenses.prive.totalPrive -= item.total;
        }
      }
    });

    for (let key in expenses) {
      if (key !== 'totalExpenses') {
        for (let key2 in expenses[key]) {
          expenses.totalExpenses += expenses[key][key2];
        }
      }
    }

    return expenses.totalExpenses;
  }

  function getMonthReport() {
    const getMonthReportAPI = `${baseURL}/api/v1/transactions/admin`;
    axios
      .get(getMonthReportAPI, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(r => {
        // console.log(r.data.data);
        setData({
          ...data,
          totalRevenue: getTotalRevenue(r.data.data),
          revenueData: getRevenueData(r.data.data),
        });
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }

  function getExpensesData() {
    const getExpensesAPI = `${baseURL}/api/v1/bebans/get`;

    axios
      .get(getExpensesAPI, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(r => {
        // console.log(r.data.data);
        if (r.data.data) {
          setTotalExpenses(getTotalExpenses(r.data.data));
        } else {
          setTotalExpenses(0);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //* Get Report Data Days
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      getMonthReport();
      getExpensesData();
    }, 1);
  }, [refresh]);

  useEffect(() => {
    const todayLive = setInterval(() => {
      //request func here
      getMonthReport();
      getExpensesData();
    }, 30000);

    return () => clearInterval(todayLive);
  });

  return (
    <VStack mt={'16px !important'} w={'100%'} alignItems={'flex-start'}>
      <Text className="dashboardLabel" fontWeight={'bold'} opacity={0.5}>
        {`Current Month (${currentMonthLong})`}
      </Text>

      <VStack
        alignItems={'flex-start'}
        p={2}
        w={'100%'}
        style={{
          border:
            colorMode === 'light'
              ? '2px solid var(--p-75)'
              : '2px solid var(--p-350)',
          borderRadius: '12px',
        }}
      >
        {!loading ? (
          <>
            <VStack alignItems={'flex-start'} px={2}>
              <HStack alignItems={'flex-start'}>
                <Text>Rp.</Text>
                <Text fontSize={'xx-large'} fontWeight={'bold'}>
                  {data?.totalRevenue?.toLocaleString('id-ID') || 'Null'}
                </Text>
              </HStack>
              <Text mt={'0px !important'} color={'var(--p-200)'}>
                Total Gross Revenue
              </Text>
            </VStack>

            <VStack alignItems={'flex-start'} px={2}>
              <HStack alignItems={'flex-start'}>
                <Text>Rp.</Text>
                <Text fontSize={'xx-large'} fontWeight={'bold'}>
                  {totalExpenses?.toLocaleString('id-ID') || 'Null'}
                </Text>
              </HStack>
              <Text mt={'0px !important'} color={'var(--p-200)'}>
                Total Cost of Sales & Expenses
              </Text>
            </VStack>

            <VStack
              w={'100%'}
              h={'400px'}
              mt={'16px !important'}
              p={1}
              pb={2}
              alignItems={'flex-start'}
              borderRadius={12}
            >
              {/* <HStack w={'100%'} justifyContent={'flex-end'} px={3}>
                <HStack>
                  <Badge
                    variant={'solid'}
                    bg={'#fdd100'}
                    w={'12px'}
                    h={'8px'}
                  ></Badge>
                  <Text fontSize={'sm'} opacity={0.5}>
                    Dialy Revenue
                  </Text>
                </HStack>
              </HStack> */}

              <LineChart data={chartData} options={options} plugins={plugins} />
            </VStack>

            <PrimaryButton
              label="See Full Reports"
              w={'100%'}
              onClick={() => {
                navigate('/vendere-app/reports');
              }}
            />
          </>
        ) : (
          <>
            <Skeleton h={'70px'} />
            <Skeleton h={'70px'} />
            <Skeleton h={'400px'} />
          </>
        )}
      </VStack>
    </VStack>
  );
};

export { RDashboard, LDashboard };
