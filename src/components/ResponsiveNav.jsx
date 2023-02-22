import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignOut, useAuthUser } from 'react-auth-kit';
import {
  Text,
  Icon,
  Box,
  useColorMode,
  Heading,
  HStack,
  Divider,
  VStack,
  useDisclosure,
  Button,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ButtonGroup,
  Badge,
} from '@chakra-ui/react';

// MUI
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import '../css/vendereApp.css';
import {
  PrimaryButton,
  PrimaryButtonNav,
  SecondaryButtonOutlineNav,
} from './Buttons';
import { ModalContent, ModalBody, ModalFooter, ModalOverlay } from './Modals';

const NavMobile = ({ active }) => {
  console.log(active);
  let nav;
  let activeNav;

  useEffect(() => {
    nav = document.querySelector('.navMobile');
    activeNav = document.querySelector(`#${active}`);
    activeNav.classList.add('navMobileContentBtnSelect');
  });

  const selectNavList = targetId => {
    activeNav.classList.remove('navMobileContentBtnSelect');
    const target = document.querySelector(`#${targetId}`);
    // console.log(targetId);
    target.classList.add('navMobileContentBtnSelect');

    const navLabels = document.querySelectorAll('.navLabel');
    navLabels.forEach(navLabel => {
      navLabel.style.display = 'block';
    });
    nav.style.height = '80px';
  };
  const diselectNavList = targetId => {
    const target = document.querySelector(`#${targetId}`);
    const targetLabel = document.querySelector(`#${targetId} > p`);
    target.classList.remove('navMobileContentBtnSelect');
    targetLabel.style.display = 'none';
    nav.style.height = '56px';

    const navLabels = document.querySelectorAll('.navLabel');
    navLabels.forEach(navLabel => {
      navLabel.style.display = 'none';
    });
    activeNav.classList.add('navMobileContentBtnSelect');
  };

  const navigate = useNavigate();

  const { colorMode } = useColorMode();
  return (
    <Box
      className="navMobile"
      style={{ background: 'var(--p-500)' }}
      zIndex={99}
    >
      <ul>
        {/* Reports */}
        <li>
          <div
            id="reports"
            className="navMobileContentBtn"
            onClick={() => navigate('../reports')}
            onMouseEnter={() => {
              selectNavList('reports');
            }}
            onMouseLeave={() => diselectNavList('reports')}
          >
            <Icon
              as={SummarizeOutlinedIcon}
              fontSize={'xx-large'}
              mx={'auto'}
            />
            <Text
              className="navLabel"
              display={'none'}
              style={{ color: 'var(--p-200)' }}
              fontSize={'xs'}
              pt={1}
            >
              Reports
            </Text>
          </div>
        </li>

        {/* Debts */}
        <li>
          <div
            id="debts"
            className="navMobileContentBtn"
            onClick={() => navigate('../debts')}
            onMouseEnter={() => {
              selectNavList('debts');
            }}
            onMouseLeave={() => diselectNavList('debts')}
          >
            <Icon as={MoneyOffIcon} fontSize={'xx-large'} />
            <Text
              className="navLabel"
              display={'none'}
              style={{ color: 'var(--p-200)' }}
              fontSize={'xs'}
              pt={1}
            >
              Debts
            </Text>
          </div>
        </li>

        {/* Cashier */}
        <li>
          <div
            id="home"
            className="navMobileContentBtn"
            onClick={() => navigate('../')}
            onMouseEnter={() => {
              selectNavList('home');
            }}
            onMouseLeave={() => diselectNavList('home')}
          >
            <Icon as={DashboardOutlinedIcon} fontSize={'xx-large'} />
            <Text
              className="navLabel"
              display={'none'}
              style={{ color: 'var(--p-200)' }}
              fontSize={'xs'}
              pt={1}
            >
              Dashboard
            </Text>
          </div>
        </li>

        {/* Cashier */}
        <li>
          <div
            id="cashier"
            className="navMobileContentBtn"
            onClick={() => navigate('../cashier')}
            onMouseEnter={() => {
              selectNavList('cashier');
            }}
            onMouseLeave={() => diselectNavList('cashier')}
          >
            <Icon as={PointOfSaleRoundedIcon} fontSize={'xx-large'} />
            <Text
              className="navLabel"
              display={'none'}
              style={{ color: 'var(--p-200)' }}
              fontSize={'xs'}
              pt={1}
            >
              Cashier
            </Text>
          </div>
        </li>

        {/* Transactions */}
        <li>
          <div
            id="transactions"
            className="navMobileContentBtn"
            onClick={() => navigate('../transactions')}
            onMouseEnter={() => {
              selectNavList('transactions');
            }}
            onMouseLeave={() => diselectNavList('transactions')}
          >
            <Icon as={ReceiptLongOutlinedIcon} fontSize={'xx-large'} />
            <Text
              className="navLabel"
              display={'none'}
              style={{ color: 'var(--p-200)' }}
              fontSize={'xs'}
              pt={1}
            >
              Transactions
            </Text>
          </div>
        </li>

        {/* Profile */}
        <li>
          <div
            id="profile"
            className="navMobileContentBtn"
            onClick={() => navigate('../profile')}
            onMouseEnter={() => {
              selectNavList('profile');
            }}
            onMouseLeave={() => diselectNavList('profile')}
          >
            <Icon as={AccountCircleRoundedIcon} fontSize={'xx-large'} />
            <Text
              className="navLabel"
              display={'none'}
              style={{ color: 'var(--p-200)' }}
              fontSize={'xs'}
              pt={1}
            >
              Profile
            </Text>
          </div>
        </li>
      </ul>
    </Box>
  );
};

const Nav = ({ active, logout, setTotal, setCartList, setSearch }) => {
  const navigate = useNavigate();
  const auth = useAuthUser();

  const SignOut = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isSignOutLoading, setIsSignOutLoading] = useState(false);

    useEffect(() => {
      if (isSignOutLoading) {
        setTimeout(() => {
          logout();
          localStorage.clear();
          setTotal(0);
          setCartList([]);
          setSearch('');
          setIsSignOutLoading(false);
          navigate('/');
        }, 1000);
      }
    }, [isSignOutLoading]);

    return (
      <>
        <PrimaryButtonNav label={'Sign Out'} w={'100%'} onClick={onOpen} />

        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent
            content={
              <>
                <ModalHeader>
                  <HStack>
                    <Icon as={LogoutOutlinedIcon} />
                    <Text>Signing Out?</Text>
                  </HStack>
                </ModalHeader>

                <ModalBody
                  content={
                    <>
                      <Text>Are you sure you want to sign out?</Text>
                    </>
                  }
                />

                <ModalFooter
                  content={
                    <ButtonGroup alignSelf={'flex-end'}>
                      <Button
                        className="btn"
                        onClick={onClose}
                        variant={'ghost'}
                      >
                        Close
                      </Button>
                      <PrimaryButton
                        label={'Sign Out'}
                        isLoading={isSignOutLoading}
                        onClick={() => {
                          setIsSignOutLoading(true);
                        }}
                      />
                    </ButtonGroup>
                  }
                />
              </>
            }
          />
        </Modal>
      </>
    );
  };

  // Selecting Nav List
  const selectNav = targetId => {
    const target = document.querySelector(`#${targetId}`);
    target.classList.add('navListActive');
  };
  const diselectNav = targetId => {
    const navActive = document.querySelector(`#${active}Nav`);
    const target = document.querySelector(`#${targetId}`);
    target.classList.remove('navListActive');
    navActive.classList.add('navListActive');
    // console.log(navActive);
  };

  return (
    <>
      <nav>
        <VStack h={'100%'} w={'100%'}>
          <Heading
            as={'h1'}
            size="lg"
            color={'white'}
            mb={8}
            alignSelf="flex-start"
          >
            <HStack alignItems={'center'}>
              <LoyaltyOutlinedIcon style={{ color: 'var(--accent)' }} />
              <Text>Vendere</Text>
            </HStack>
          </Heading>

          <VStack
            justifyContent={'space-between !important'}
            h={'100%'}
            w={'100%'}
            overflowY={'auto'}
          >
            {/* the Nav List */}
            <Box
              id="navList"
              color="white"
              fontWeight={'bold'}
              className="navListWrapper"
              w={'100%'}
              pr={4}
            >
              <ul>
                <li
                  id="homeNav"
                  className={active === 'home' ? 'navListActive' : null}
                  onClick={() => navigate('../')}
                  onMouseEnter={() => {
                    selectNav('homeNav');
                  }}
                  onMouseLeave={() => {
                    diselectNav('homeNav');
                  }}
                >
                  <Icon as={DashboardOutlinedIcon} fontSize={'xl'} />
                  <Text ml={2}>Dashboard</Text>
                </li>

                <li
                  id="cashierNav"
                  className={active === 'cashier' ? 'navListActive' : null}
                  onClick={() => navigate('../vendere-app/cashier')}
                  onMouseEnter={() => {
                    selectNav('cashierNav');
                  }}
                  onMouseLeave={() => {
                    diselectNav('cashierNav');
                  }}
                >
                  <Icon as={PointOfSaleRoundedIcon} fontSize={'xl'} />
                  <Text ml={2}>Cashiering</Text>
                </li>

                <li
                  id="transactionsNav"
                  className={active === 'transactions' ? 'navListActive' : null}
                  onClick={() => navigate('../transactions')}
                  onMouseEnter={() => {
                    selectNav('transactionsNav');
                  }}
                  onMouseLeave={() => {
                    diselectNav('transactionsNav');
                  }}
                >
                  <Icon as={ReceiptLongOutlinedIcon} fontSize={'xl'} />
                  <Text ml={2}>Transactions</Text>
                </li>

                <li
                  id="debtsNav"
                  className={active === 'debts' ? 'navListActive' : null}
                  onClick={() => navigate('../debts')}
                  onMouseEnter={() => {
                    selectNav('debtsNav');
                  }}
                  onMouseLeave={() => {
                    diselectNav('debtsNav');
                  }}
                >
                  <Icon as={MoneyOffIcon} fontSize={'xl'} />
                  <Text ml={2}>Debts</Text>
                </li>

                <li
                  id="supportNav"
                  className={active === 'support' ? 'navListActive' : null}
                  onClick={() => navigate('../support')}
                  onMouseEnter={() => {
                    selectNav('supportNav');
                  }}
                  onMouseLeave={() => {
                    diselectNav('supportNav');
                  }}
                >
                  <Icon as={HelpOutlineOutlinedIcon} fontSize={'xl'} />
                  <Text ml={2}>Support</Text>
                </li>

                <Divider mr={4} style={{ background: 'var(--p-50)' }} />

                <li
                  id="reportsNav"
                  className={active === 'reports' ? 'navListActive' : null}
                  onClick={() => navigate('../reports')}
                  onMouseEnter={() => {
                    selectNav('reportsNav');
                  }}
                  onMouseLeave={() => {
                    diselectNav('reportsNav');
                  }}
                >
                  <Icon as={SummarizeOutlinedIcon} fontSize={'xl'} />
                  <Text ml={2}>Reports</Text>
                </li>

                <li
                  id="supplyNav"
                  className={active === 'supply' ? 'navListActive' : null}
                  onClick={() => navigate('../supply')}
                  onMouseEnter={() => {
                    selectNav('supplyNav');
                  }}
                  onMouseLeave={() => {
                    diselectNav('supplyNav');
                  }}
                >
                  <Icon as={Inventory2OutlinedIcon} fontSize={'xl'} />
                  <Text ml={2}>Supply</Text>
                </li>
              </ul>
            </Box>

            {/* Mini Profile */}
            <VStack className="miniProfile" w={'100%'} pr={4}>
              <Box className="miniProfileImage">
                <Icon
                  as={AccountCircleRoundedIcon}
                  fontSize={'90px'}
                  style={{ color: 'var(--p-50)' }}
                />
              </Box>
              <VStack
                borderRadius={'12px'}
                style={{
                  border: '2px solid var(--p-300)',
                }}
                py={2}
                px={4}
                w={'100%'}
              >
                <VStack color={'white'} pt={10} mb={4}>
                  <Text fontWeight={'bold'}>{auth().displayName}</Text>
                  <Badge
                    fontSize={'sm'}
                    style={{ background: 'var(--p-450)', color: 'white' }}
                    m={'0px !important'}
                  >
                    {auth().userRole}
                  </Badge>
                </VStack>
                <SecondaryButtonOutlineNav label={'Manage'} w={'100%'} />
                <SignOut />
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </nav>
    </>
  );
};

const ResponsiveNav = ({ active, setTotal, setCartList, setSearch }) => {
  // Width Meter
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const logout = useSignOut();
  return (
    <>
      {screenWidth <= 1000 ? (
        <NavMobile active={active} logout={logout} />
      ) : (
        <Nav
          active={active}
          logout={logout}
          setTotal={setTotal}
          setCartList={setCartList}
          setSearch={setSearch}
        />
      )}
    </>
  );
};

export default ResponsiveNav;
