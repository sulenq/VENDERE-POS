import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignOut, useAuthUser } from 'react-auth-kit';
import Cookies from 'js-cookie';

import {
  Text,
  Icon,
  useColorMode,
  Heading,
  HStack,
  Divider,
  VStack,
  useDisclosure,
  Button,
  Modal,
  ModalHeader,
  ButtonGroup,
  IconButton,
  Avatar,
  useToast,
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
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';

import '../css/vendereApp.css';
import {
  PrimaryButton,
  PrimaryButtonNav,
  SecondaryButtonOutlineNav,
} from './Buttons';
import { ModalContent, ModalBody, ModalFooter, ModalOverlay } from './Modals';
import axios from 'axios';

const ResponsiveNav = props => {
  const baseUrl = 'http://localhost:8080';

  // Width Meter
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
  });
  const toast = useToast();

  const auth = useAuthUser();
  const logout = useSignOut();

  const adminNav = [
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
      name: 'ManageItems',
      link: '/vendere-app/manageproducts',
      icon: Inventory2OutlinedIcon,
      restriction: 'admin',
    },
    {
      name: 'Expenses',
      link: '/vendere-app/expenses',
      icon: MonetizationOnOutlinedIcon,
      restriction: 'admin',
    },
    {
      name: 'Debts',
      link: '/vendere-app/debts',
      icon: MoneyOffIcon,
      restriction: 'admin',
    },
  ];

  const cashierNavs = [
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
      name: 'Support',
      link: '/vendere-app/support',
      icon: HelpOutlineOutlinedIcon,
      restriction: '',
    },
  ];

  let navs1;
  if (auth()?.userRole === 'admin') {
    navs1 = adminNav;
  } else if (auth()?.userRole === 'cashier') {
    navs1 = cashierNavs;
  }

  const navs2 = [
    {
      name: 'Transactions',
      link: '/vendere-app/transactions',
      icon: ReceiptLongOutlinedIcon,
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
      name: 'Support',
      link: '/vendere-app/support',
      icon: HelpOutlineOutlinedIcon,
      restriction: '',
    },
  ];

  const NavMobile = () => {
    let active;
    if (
      props.active === 'Reports' ||
      props.active === 'Transactions' ||
      props.active === 'Employees' ||
      props.active === 'Support'
    ) {
      if (auth().userRole === 'cashier' && props.active === 'Transactions') {
        active = 'Transactions';
      } else if (auth().userRole === 'cashier' && props.active === 'Support') {
        active = 'Support';
      } else {
        active = 'Profile';
      }
    } else {
      active = props.active;
    }
    const navigate = useNavigate();

    return (
      <HStack
        id={'navMobile'}
        style={{
          width: '100%',
          // height: '65px',
          background: 'var(--p-500a)',
          position: 'fixed',
          bottom: '0',
          zIndex: 99,
          cursor: 'pointer',
          // transition: '0.3s',
        }}
        backdropFilter="auto"
        backdropBlur="5px"
      >
        {navs1?.map((nav, index) => {
          if (auth()?.userRole === nav.restriction || nav.restriction === '') {
            let navName;
            if (nav.name === 'ManageItems') {
              navName = 'Products';
            } else {
              navName = nav.name;
            }
            return (
              <VStack
                key={index}
                id={nav.name}
                className={'navMobileContentBtn'}
                m={'0px !important'}
                style={{
                  color: nav.name === active ? 'var(--accent)' : 'var(--p-50)',
                  padding: '8px',
                  width: '100%',
                }}
                onClick={() => {
                  navigate(nav.link);
                }}
                // onMouseEnter={() => {
                //   selectNavList(nav.name);
                // }}
                // onMouseLeave={() => diselectNavList(nav.name)}
              >
                <Icon
                  as={nav.icon}
                  style={{ margin: 'auto auto', fontSize: '30px' }}
                />
                <Text className="mobileNavLabel">{navName}</Text>
              </VStack>
            );
          }
        })}

        <VStack
          id={'Profile'}
          className={'navMobileContentBtn'}
          m={'0px !important'}
          style={{
            color: active === 'Profile' ? 'var(--accent)' : 'var(--p-50)',
            padding: '8px',
            width: '100%',
          }}
          onClick={() => {
            navigate('/vendere-app/profile');
          }}
          // onMouseEnter={() => {
          //   selectNavList('Profile');
          // }}
          // onMouseLeave={() => diselectNavList('Profile')}
        >
          <Icon
            as={AccountCircleRoundedIcon}
            style={{ margin: 'auto auto', fontSize: '30px' }}
          />
          <Text className="mobileNavLabel">Profile</Text>
        </VStack>
      </HStack>
    );
  };

  const Nav = () => {
    // console.log(props.active);

    const navigate = useNavigate();
    const [expandedNav, setExpandedNav] = useState(false);
    useEffect(() => {
      const navLabel = document.querySelectorAll('.navLabel');
      const nav = document.querySelector('#nav');
      // console.dir(avatarNav);
      if (!expandedNav) {
        navLabel.forEach(label => {
          label.style.display = 'none';
          nav.style.width = '75px';
        });
      } else {
        navLabel.forEach(label => {
          label.style.display = 'block';
          nav.style.width = '280px';
        });
      }
    }, [expandedNav]);

    const SignOut = () => {
      const { isOpen, onOpen, onClose } = useDisclosure();
      const [isSignOutLoading, setIsSignOutLoading] = useState(false);

      function logOut() {
        setIsSignOutLoading(true);
        const token = Cookies.get('_auth');
        axios
          .put(`${baseUrl}/api/v1/users/kasir/badalakingkong`, null, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(response => {
            console.log(response);
          })
          .catch(error => {
            console.error(error);
          });
        setTimeout(() => {
          logout();
          Cookies.set('isSignedOut', 'yes');
          setIsSignOutLoading(false);
          toast({
            position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
            title: `Signed Out 🫡`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          navigate('/');
        }, 1);
      }

      return (
        <>
          {expandedNav ? (
            <PrimaryButtonNav
              // leftIcon={LogoutOutlinedIcon}
              display={'block !important'}
              label={'Sign Out'}
              w={'100%'}
              onClick={onOpen}
            />
          ) : (
            <PrimaryButtonNav
              leftIcon={LogoutOutlinedIcon}
              display={'block !important'}
              // label={'Sign Out'}
              w={'100%'}
              onClick={onOpen}
            />
          )}

          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent
              content={
                <>
                  <ModalHeader px={4}>
                    <HStack>
                      <Icon as={LogoutOutlinedIcon} />
                      <Text>Signing Out</Text>
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
                          colorScheme={
                            colorMode === 'light' ? 'blackAlpha' : 'gray'
                          }
                        >
                          Close
                        </Button>
                        <PrimaryButton
                          label={'Sign Out'}
                          isLoading={isSignOutLoading}
                          onClick={logOut}
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

    const { colorMode } = useColorMode();

    return (
      <>
        <VStack
          id="nav"
          onMouseLeave={() => {
            setExpandedNav(false);
          }}
          w={'75px'}
          h={'100%'}
          pr={1}
          pt={5}
          pb={2}
          borderRadius={'12px 0 0 12px'}
          position={'relative'}
          overflowX={'hidden'}
          overflowY={'auto'}
          transition={'all .2s'}
          justifyContent={'space-between'}
        >
          {/* Logo */}
          <Heading
            as={VStack}
            color={'white'}
            pb={8}
            alignSelf="flex-start"
            pr={3}
            px={4}
          >
            <HStack
              alignItems={'center'}
              color={'var(--accent)'}
              fontSize={'20px'}
            >
              <LoyaltyOutlinedIcon />
              <Text className="navLabel" letterSpacing={6}>
                VENDERE
              </Text>
            </HStack>

            <Text
              className="navLabel"
              fontSize={'sm'}
              fontWeight="normal"
              opacity={0.5}
              pl={'24px'}
              mt={'0 !important'}
              // textAlign={'right'}
            >
              #pakaiVENDEREoke
            </Text>
          </Heading>

          {/* Nav Link Section */}
          <VStack
            pr={screenHeight <= 757 ? 2 : 3}
            id={'navOptions'}
            className={colorMode === 'light' ? 'onLight' : 'onDark'}
            justifyContent={'space-between !important'}
            // h={'100%'}
            w={'100%'}
            position={'relative'}
            overflowX={'hidden'}
          >
            {/* the Nav List */}
            <VStack
              id="navList"
              className="navListWrapper"
              style={{
                fontWeight: '500',
                color: 'var(--p-50)',
                alignItems: 'flex-start',
                width: '100%',
              }}
            >
              <HStack px={4} py={3} w={'100%'}>
                <IconButton
                  as={
                    expandedNav
                      ? KeyboardArrowLeftOutlinedIcon
                      : KeyboardArrowRightOutlinedIcon
                  }
                  // alignSelf={'flex-end'}
                  size={'xs'}
                  cursor={'pointer'}
                  bg={'var(--p-250)'}
                  opacity={0.3}
                  borderRadius={50}
                  _hover={{ bg: 'var(--p-200)' }}
                  onClick={() => {
                    setExpandedNav(!expandedNav);
                  }}
                />
              </HStack>

              {navs1?.map((nav, index) => {
                if (
                  auth()?.userRole === nav.restriction ||
                  nav.restriction === ''
                ) {
                  return (
                    <HStack
                      key={index}
                      id={nav.name + 'Nav'}
                      className={
                        props.active === nav.name
                          ? 'navListActive navLink'
                          : 'navLink'
                      }
                      onClick={() => {
                        setExpandedNav(false);
                        if (expandedNav) {
                          setTimeout(() => {
                            navigate(nav.link);
                          }, 170);
                        } else {
                          navigate(nav.link);
                        }
                      }}
                      style={{
                        width: '100%',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        margin: '6px 0',
                      }}
                    >
                      <Icon
                        as={nav.icon}
                        fontSize={'xl'}
                        mt={'2px !important'}
                        color={'var(--p-100)'}
                      />
                      <Text className="navLabel" ml={2}>
                        {nav.name === 'ManageItems' ? 'Products' : nav.name}
                      </Text>
                    </HStack>
                  );
                }
              })}

              {auth()?.userRole === 'admin' ? (
                <Divider borderColor={'var(--p-100a)'} />
              ) : (
                ''
              )}

              {auth()?.userRole === 'admin' &&
                navs2?.map((nav, index) => {
                  if (
                    auth()?.userRole === nav.restriction ||
                    nav.restriction === ''
                  ) {
                    return (
                      <HStack
                        key={index}
                        id={nav.name + 'Nav'}
                        className={
                          props.active === nav.name
                            ? 'navListActive navLink'
                            : 'navLink'
                        }
                        onClick={() => {
                          setExpandedNav(false);
                          if (expandedNav) {
                            setTimeout(() => {
                              navigate(nav.link);
                            }, 170);
                          } else {
                            navigate(nav.link);
                          }
                        }}
                        style={{
                          width: '100%',
                          padding: '8px 16px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          margin: '6px 0',
                          marginTop: index === 0 ? '12px' : '',
                        }}
                      >
                        <Icon
                          as={nav.icon}
                          fontSize={'xl'}
                          mt={'2px !important'}
                          color={'var(--p-100)'}
                        />
                        <Text className="navLabel" ml={2}>
                          {nav.name === 'ManageItems' ? 'Products' : nav.name}
                        </Text>
                      </HStack>
                    );
                  }
                })}
            </VStack>
          </VStack>

          {/* Mini Profile */}
          <VStack
            mr={'16px !important'}
            mt={'24px !important'}
            style={{
              // border: '3px solid var(--p-350a)',
              borderRadius: '12px',
              width: '100%',
              padding: '12px',
              paddingTop: '',
              color: 'white',
              position: 'relative',
              bottom: '0',
              // background:
              //   'linear-gradient(to bottom, var(--p-400a), var(--p-350a))',
            }}
          >
            {/* <Avatar
              size={expandedNav ? 'xl' : 'sm'}
              name={auth()?.displayName}
              display={expandedNav ? 'block' : 'none'}
              w={!expandedNav ? '40px' : null}
              h={!expandedNav ? '40px' : null}
              style={{
                position: 'absolute',
                top: expandedNav ? '-50px' : '40px',
                background: 'var(--p-300)',
                color: 'var(--p-200)',
              }}
            /> */}

            <VStack w={'100%'}>
              {/* <Text
                className={'navLabel'}
                w={'180px !important'}
                style={{
                  fontWeight: 'bold',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                {auth()?.displayName}
              </Text>

              <Text
                className={'navLabel'}
                fontSize={'12px'}
                fontWeight={'bold'}
                px={2}
                style={{
                  background: 'var(--accent)',
                  color: '#00000080',
                  borderRadius: '12px',
                }}
              >
                {auth()?.userRole?.toUpperCase()}
              </Text>

              <br /> */}

              <SecondaryButtonOutlineNav
                leftIcon={!expandedNav ? PermIdentityOutlinedIcon : null}
                w={'100%'}
                display={'block !important'}
                label={expandedNav ? 'Profile' : null}
                onClick={() => {
                  navigate('/vendere-app/profile');
                }}
              />
              <SignOut />
            </VStack>
          </VStack>
        </VStack>
      </>
    );
  };

  return <>{screenWidth <= 1000 ? <NavMobile /> : <Nav />}</>;
};

export default ResponsiveNav;
