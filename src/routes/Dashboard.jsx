import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import {
  useToast,
  HStack,
  useColorMode,
  SimpleGrid,
  VStack,
  Text,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Icon,
} from '@chakra-ui/react';

// MUI Icons
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

import '../css/vendereApp.css';

import ResponsiveNav from '../components/ResponsiveNav';
import { ActionTopBar } from '../components/ActionTopBar';
import { Stat } from '../components/Data';

import { RDashboard, LDashboard } from '../components/DashboardComponents';

export default function Dashboard(props) {
  const baseURL = 'http://localhost:8080';
  const token = Cookies.get('_auth');
  const { colorMode } = useColorMode();
  const toast = useToast();
  const [refresh, setRefresh] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const PriorityDashboard = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    function getTodayData(data) {
      const todayData = {
        income: 0,
        transactions: 0,
        items: 'Soon!',
      };

      data.forEach((item, index) => {
        const date = new Date(item.CreatedAt);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        console.log();
        console.log();

        if (
          `${currentDay}${currentMonth}${currentYear}` ==
          `${day}${month}${year}`
        ) {
          todayData.income += item.total;
          todayData.transactions += 1;
        }
      });

      return todayData;
    }

    function getMonthReport() {
      const getMonthReportAPI = `${baseURL}/api/v1/transactions/admin`;
      setLoading(true);

      axios
        .get(getMonthReportAPI, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          // console.log(r.data.data);
          setData(getTodayData(r.data.data));
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }

    useEffect(() => {
      getMonthReport();
    }, [refresh]);

    useEffect(() => {
      const todayLive = setInterval(() => {
        getMonthReport();
      }, 30000);

      return () => clearInterval(todayLive);
    });

    return (
      <VStack
        mt={2}
        px={screenWidth <= 1000 ? 2 : 4}
        w={'100%'}
        alignItems={'flex-start'}
      >
        <Text className="dashboardLabel" fontWeight={'bold'} opacity={0.5}>
          Today
        </Text>
        <SimpleGrid columns={[1, null, 2]} gap={2} w={'100%'}>
          <Stat
            w={'100%'}
            style={{
              background:
                colorMode === 'light' ? 'var(--p-450)' : 'var(--p-50)',
              color: colorMode === 'light' ? 'white' : 'black',
              borderRadius: '20px',
            }}
            content={
              <>
                <StatLabel>
                  <HStack>
                    <Icon
                      as={PaymentsOutlinedIcon}
                      color={'var(--p-200)'}
                      fontSize={'lg'}
                    />
                    <Text color={'var(--p-200)'}>Total Gross Revenue</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>
                  <HStack alignItems={'flex-start'}>
                    <Text fontSize={'sm'}>Rp. </Text>
                    <Text fontSize={'xx-large'} fontWeight={'bold'}>
                      {data?.income?.toLocaleString('id-ID')}
                    </Text>
                  </HStack>
                </StatNumber>
                <StatHelpText mb={0}>
                  <StatArrow type="increase" />
                  23.36% (soon!)
                </StatHelpText>
              </>
            }
          />

          <HStack w={'100%'}>
            <Stat
              w={'50%'}
              style={{
                border:
                  colorMode === 'light'
                    ? '2px solid var(--p-75)'
                    : '2px solid var(--p-350)',
                borderRadius: '20px',
              }}
              content={
                <VStack
                  onClick={() => {
                    navigate('/vendere-app/transactions');
                  }}
                  alignItems={'flex-start'}
                >
                  <StatLabel>
                    <HStack>
                      <Icon
                        as={ReceiptLongOutlinedIcon}
                        color={'var(--p-200)'}
                        fontSize={'lg'}
                      />
                      <Text color={'var(--p-200)'}>Transactions</Text>
                    </HStack>
                  </StatLabel>
                  <StatNumber fontSize={'xx-large'} mt={'0 !important'}>
                    {data?.transactions}
                  </StatNumber>
                  <StatHelpText mb={0} mt={'0 !important'}>
                    <StatArrow type="increase" />
                    23.36% (soon!)
                  </StatHelpText>
                </VStack>
              }
            />

            <Stat
              w={'50%'}
              style={{
                border:
                  colorMode === 'light'
                    ? '2px solid var(--p-75)'
                    : '2px solid var(--p-350)',
                borderRadius: '20px',
              }}
              content={
                <>
                  <StatLabel>
                    <HStack>
                      <Icon
                        as={Inventory2OutlinedIcon}
                        color={'var(--p-200)'}
                        fontSize={'lg'}
                      />
                      <Text color={'var(--p-200)'}>Items</Text>
                    </HStack>
                  </StatLabel>
                  <StatNumber fontSize={'xx-large'}>{data?.items}</StatNumber>
                  <StatHelpText mb={0}>Need resupply</StatHelpText>
                </>
              }
            />
          </HStack>
        </SimpleGrid>
      </VStack>
    );
  };

  // Dashboard Main Section
  return (
    <HStack
      className="vendereApp"
      alignItems={'center'}
      justifyContent={'flex-end'}
    >
      <ResponsiveNav active={'Dashboard'} />
      <VStack
        id="appContentWrapper"
        w={screenWidth <= 1000 ? '100%' : 'calc(100% - 90px)'}
        bg={colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-400a)'}
        h={'100%'}
        ml={'0px !important'}
        p={2}
        alignItems={'flex-start'}
      >
        <>
          <ActionTopBar />

          <VStack
            id={'content'}
            className={colorMode === 'light' ? 'onLight' : 'onDark'}
            mt={'4px !important'}
            style={{
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              paddingBottom: screenWidth <= 1000 ? '64px' : '4px',
              borderRadius: '20px',
              background:
                colorMode === 'light' ? 'var(--p-50)' : 'var(--p-400a)',
            }}
          >
            <PriorityDashboard />

            <SimpleGrid
              w={'100%'}
              px={screenWidth <= 1000 ? 2 : 4}
              columns={[1, null, 2]}
              gap={2}
            >
              <LDashboard />

              <RDashboard />
            </SimpleGrid>
          </VStack>
        </>
      </VStack>
    </HStack>
  );
}
