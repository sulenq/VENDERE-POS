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
  Avatar,
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
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';

import '../css/vendereApp.css';
import {
  PrimaryButton,
  PrimaryButtonNav,
  SecondaryButtonOutlineNav,
} from './Buttons';
import { ModalContent, ModalBody, ModalFooter, ModalOverlay } from './Modals';

const ResponsiveNav = ({ active, setTotal, setCartList, setSearch }) => {
  console.log(active);

  // Width Meter
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const auth = useAuthUser();
  const logout = useSignOut();

  const navs = [
    {
      name: 'Dashboard',
      link: '/vendere-app',
      icon: DashboardOutlinedIcon,
      restriction: 'admin',
    },
    {
      name: 'Cashier',
      link: '/vendere-app/cashier',
      icon: PointOfSaleRoundedIcon,
      restriction: 'cashier',
    },
    {
      name: 'Transactions',
      link: '/vendere-app/transactions',
      icon: ReceiptLongOutlinedIcon,
      restriction: '',
    },
    {
      name: 'Debts',
      link: '/vendere-app/debts',
      icon: MoneyOffIcon,
      restriction: '',
    },
    {
      name: 'Support',
      link: '/vendere-app/support',
      icon: HelpOutlineOutlinedIcon,
      restriction: '',
    },
    {
      name: 'Employees',
      link: '/vendere-app/employees',
      icon: PeopleOutlinedIcon,
      restriction: 'admin',
    },
    {
      name: 'Reports',
      link: '/vendere-app/reports',
      icon: SummarizeOutlinedIcon,
      restriction: 'admin',
    },
    {
      name: 'Supply',
      link: '/vendere-app/supply',
      icon: Inventory2OutlinedIcon,
      restriction: 'admin',
    },
  ];

  const NavMobile = () => {
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

  const Nav = () => {
    const navigate = useNavigate();

    const SignOut = () => {
      const { isOpen, onOpen, onClose } = useDisclosure();
      const [isSignOutLoading, setIsSignOutLoading] = useState(false);

      useEffect(() => {
        if (isSignOutLoading) {
          setTimeout(() => {
            if (auth().userRole === 'cashier') {
              setTotal(0);
              setCartList([]);
              setSearch('');
            }
            logout();
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
        <VStack id="nav" h={'100%'} pr={2}>
          {/* Logo */}
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

          {/* Nav Body */}
          <VStack
            pr={2}
            id={'navOptions'}
            justifyContent={'space-between !important'}
            h={'100%'}
            w={'100%'}
            position={'relative'}
            overflowY={'auto'}
          >
            {/* the Nav List */}
            <VStack
              id="navList"
              className="navListWrapper"
              style={{
                fontWeight: 'bold',
                color: 'white',
                alignItems: 'flex-start',
              }}
            >
              {navs.map((nav, index) => {
                if (
                  auth().userRole === nav.restriction ||
                  nav.restriction === ''
                ) {
                  return (
                    <HStack
                      key={index}
                      id={nav.name + 'Nav'}
                      className={
                        active === nav.name
                          ? 'navListActive navLink'
                          : 'navLink'
                      }
                      onClick={() => navigate(nav.link)}
                      onMouseEnter={() => {
                        selectNav(nav.name + 'Nav');
                      }}
                      onMouseLeave={() => {
                        diselectNav(nav.name + 'Nav');
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon as={nav.icon} fontSize={'xl'} />
                      <Text ml={2}>{nav.name}</Text>
                    </HStack>
                  );
                }
              })}
            </VStack>

            {/* Mini Profile */}
            <VStack
              mt={'64px !important'}
              style={{
                border: '2px solid var(--p-300)',
                borderRadius: '12px',
                width: '100%',
                padding: '12px',
                paddingTop: '50px',
                color: 'white',
                position: 'relative',
                bottom: '0',
              }}
            >
              <Avatar
                size={'xl'}
                name={auth().displayName}
                style={{ position: 'absolute', top: '-50px' }}
              />
              <Text style={{ fontWeight: 'bold' }}>{auth().displayName}</Text>
              <Badge
                mt={'0 !important'}
                style={{
                  background: 'var(--accent)',
                  color: 'black',
                  borderRadius: '12px',
                }}
              >
                {auth().userRole}
              </Badge>
              <br />
              <SecondaryButtonOutlineNav w={'100%'} label={'Manage'} />
              <SignOut />
            </VStack>
          </VStack>
        </VStack>
      </>
    );
  };

  return (
    <>
      {screenWidth <= 1000 ? (
        <NavMobile active={active} logout={logout} auth={auth} />
      ) : (
        <Nav
          active={active}
          logout={logout}
          setTotal={setTotal}
          setCartList={setCartList}
          setSearch={setSearch}
          auth={auth}
        />
      )}
    </>
  );
};

export default ResponsiveNav;
