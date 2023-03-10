import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

import {
  RequireAuth,
  useSignIn,
  useAuthHeader,
  useAuthUser,
  useSignOut,
} from 'react-auth-kit';

import {
  Badge,
  useToast,
  HStack,
  useColorMode,
  Grid,
  SimpleGrid,
  VStack,
  Text,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  Spinner,
  Avatar,
  useDisclosure,
  ButtonGroup,
  Box,
  Modal,
  ModalHeader,
  ModalBody,
  Icon,
  FormControl,
  FormLabel,
  Divider,
  Select,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { ColorModeButton } from '../components/ColorModeSwitcher';

// MUI Icons
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import GoogleIcon from '@mui/icons-material/Google';

import '../css/vendereApp.css';

import ResponsiveNav from '../components/ResponsiveNav';
import { ActionTopBar } from '../components/ActionTopBar';
import { Stat } from '../components/Data';
import { PrimaryButton } from '../components/Buttons';
import { ModalContent, ModalFooter, ModalOverlay } from '../components/Modals';
import { Input } from '../components/Inputs';
import { Skeleton } from '../components/Skeleton';
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

  const [dashboardData, setDashboardData] = useState({
    today: {
      income: 4024000,
      transactions: 23,
      items: 3,
    },
    currentMonth: {
      totalRevenue: 12030400,
      totalExpenses: 8040300,
    },
    employees: {
      total: 2,
      totalOnline: 1,
      list: [
        { name: 'Jolitos Kurniawan', role: 'Cashier', online: true },
        { name: 'Sulenq Ndas Nogo', role: 'Cashier', online: false },
      ],
    },
  });

  const PriorityDashboard = () => {
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
              borderRadius: '12px',
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
                    <Text color={'var(--p-200)'}>Income</Text>
                  </HStack>
                </StatLabel>
                <StatNumber>
                  <HStack alignItems={'flex-start'}>
                    <Text fontSize={'sm'}>Rp. </Text>
                    <Text fontSize={'xx-large'} fontWeight={'bold'}>
                      {dashboardData.today.income.toLocaleString()}
                    </Text>
                  </HStack>
                </StatNumber>
                <StatHelpText mb={0}>
                  <StatArrow type="increase" />
                  23.36%
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
                borderRadius: '12px',
              }}
              content={
                <>
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
                  <StatNumber fontSize={'xx-large'}>
                    {dashboardData.today.transactions}
                  </StatNumber>
                  <StatHelpText mb={0}>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </>
              }
            />

            <Stat
              w={'50%'}
              style={{
                border:
                  colorMode === 'light'
                    ? '2px solid var(--p-75)'
                    : '2px solid var(--p-350)',
                borderRadius: '12px',
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
                  <StatNumber fontSize={'xx-large'}>
                    {dashboardData.today.items}
                  </StatNumber>
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
      className="vendereApp finisher-header"
      p={screenWidth <= 1000 ? 0 : 4}
      alignItems={'center'}
      finisher-header
    >
      <ResponsiveNav active={'Dashboard'} setItems={props.setItems} />
      <VStack
        id="appContentWrapper"
        h={'100%'}
        w={screenWidth <= 1000 ? '100%' : 'calc(100% - 200px)'}
        p={2}
        ml={'0px !important'}
        style={{
          background:
            colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-400a)',
          borderRadius: screenWidth <= 1000 ? 0 : '12px',
        }}
      >
        <>
          <ActionTopBar />
          <VStack
            id={'content'}
            mt={'4px !important'}
            style={{
              width: '100%',
              height: '100%',
              overflowY: 'auto',
              paddingBottom: screenWidth <= 1000 ? '64px' : '16px',
              borderRadius: '12px',
              background: colorMode === 'light' ? 'white' : 'var(--p-400a)',
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
