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
  ModalCloseButton,
  Alert,
  AlertIcon,
  ButtonGroup,
  Badge,
  Avatar,
  useToast,
  FormControl,
  FormLabel,
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
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

import '../css/vendereApp.css';
import {
  PrimaryButton,
  PrimaryButtonNav,
  SecondaryButtonOutlineNav,
} from './Buttons';
import { ModalContent, ModalBody, ModalFooter, ModalOverlay } from './Modals';
import { Input } from '../components/Inputs';

const ResponsiveNav = props => {
  // Width Meter
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });
  const { colorMode } = useColorMode();
  const toast = useToast();

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
      name: 'ManageItems',
      link: '/vendere-app/manageproducts',
      icon: Inventory2OutlinedIcon,
      restriction: 'admin',
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
      restriction: 'admin',
    },
  ];

  const navs2 = [
    {
      name: 'Expenses',
      link: '/vendere-app/expenses',
      icon: MonetizationOnOutlinedIcon,
      restriction: 'admin',
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
    // console.log(props.active);
    let nav;
    let activeNav;

    useEffect(() => {
      console.log(props.active);
      nav = document.querySelector('#navMobile');
      let active = props.active;
      if (
        props.active === 'Employees' ||
        props.active === 'Reports' ||
        props.active === 'Expenses' ||
        props.active === 'Support'
      ) {
        active = 'Profile';
      }
      activeNav = document.querySelector(`#${active}`);
      activeNav?.classList.add('navMobileContentBtnSelect');
    });

    const selectNavList = targetId => {
      // console.log(targetId);
      activeNav.classList.remove('navMobileContentBtnSelect');
      const target = document.querySelector(`#${targetId}`);
      target.classList.add('navMobileContentBtnSelect');

      const navLabels = document.querySelectorAll('.navLabel');
      navLabels.forEach(navLabel => {
        navLabel.style.display = 'block';
      });
      nav.style.height = '80px';
    };

    const diselectNavList = targetId => {
      activeNav.classList.remove('navMobileContentBtnSelect');
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

    return (
      <HStack
        id={'navMobile'}
        style={{
          width: '100%',
          height: '56px',
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
        {navs.map((nav, index) => {
          if (auth().userRole === nav.restriction || nav.restriction === '') {
            return (
              <VStack
                key={index}
                id={nav.name}
                className={'navMobileContentBtn'}
                m={'0px !important'}
                style={{
                  color: 'var(--p-50)',
                  padding: '12px 8px',
                  width: '100%',
                }}
                onClick={() => {
                  navigate(nav.link);
                }}
                onMouseEnter={() => {
                  selectNavList(nav.name);
                }}
                onMouseLeave={() => diselectNavList(nav.name)}
              >
                <Icon
                  as={nav.icon}
                  style={{ margin: 'auto auto', fontSize: 'xx-large' }}
                />
                <Text
                  className="navLabel"
                  display={'none'}
                  style={{ color: 'var(--p-200)' }}
                  fontSize={'xs'}
                  pt={1}
                >
                  {nav.name}
                </Text>
              </VStack>
            );
          }
        })}

        <VStack
          id={'Profile'}
          className={'navMobileContentBtn'}
          m={'0px !important'}
          style={{
            color: 'var(--p-50)',
            padding: '12px 8px',
            width: '100%',
          }}
          onClick={() => {
            navigate('/vendere-app/profile');
          }}
          onMouseEnter={() => {
            selectNavList('Profile');
          }}
          onMouseLeave={() => diselectNavList('Profile')}
        >
          <Icon
            as={AccountCircleRoundedIcon}
            style={{ margin: 'auto auto', fontSize: 'xx-large' }}
          />
          <Text
            className="navLabel"
            display={'none'}
            style={{ color: 'var(--p-200)' }}
            fontSize={'xs'}
            pt={1}
          >
            Profile
          </Text>
        </VStack>
      </HStack>
    );
  };

  const Nav = () => {
    // console.log(props.active);

    const navigate = useNavigate();

    const SignOut = () => {
      const { isOpen, onOpen, onClose } = useDisclosure();
      const [isSignOutLoading, setIsSignOutLoading] = useState(false);

      function logOut() {
        setIsSignOutLoading(true);
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
          <PrimaryButtonNav label={'Sign Out'} w={'100%'} onClick={onOpen} />

          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent
              content={
                <>
                  <ModalHeader px={4}>
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
    const selectNav = targetId => {
      const navActive = document.querySelector(`#${props.active}Nav`);
      const target = document.querySelector(`#${targetId}`);
      if (target != navActive) {
        target.classList.add('navListSelected');
      }
    };
    const diselectNav = targetId => {
      const navActive = document.querySelector(`#${props.active}Nav`);
      const target = document.querySelector(`#${targetId}`);
      target.classList.remove('navListSelected');
      navActive.classList.add('navListActive');
      // console.log(navActive);
    };

    return (
      <>
        <VStack
          id="nav"
          w={'200px'}
          h={'100%'}
          py={2}
          pr={1}
          borderRadius={'12px 0 0 12px'}
        >
          {/* Logo */}
          <Heading
            as={'h1'}
            size="lg"
            color={'white'}
            pb={8}
            alignSelf="flex-start"
          >
            <HStack alignItems={'center'}>
              <LoyaltyOutlinedIcon style={{ color: 'var(--accent)' }} />
              <Text>Vendere</Text>
            </HStack>
          </Heading>

          {/* Nav Body */}
          <VStack
            pr={3}
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
                width: '100%',
              }}
            >
              {navs.map((nav, index) => {
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
                        margin: '6px 0',
                      }}
                    >
                      <Icon as={nav.icon} fontSize={'xl'} />
                      <Text ml={2}>
                        {nav.name === 'ManageItems' ? 'Products' : nav.name}
                      </Text>
                    </HStack>
                  );
                }
              })}

              {auth()?.userRole === 'admin' ? (
                <Divider borderColor={'var(--p-200)'} />
              ) : (
                ''
              )}

              {navs2.map((nav, index) => {
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
                        margin: '6px 0',
                        marginTop: index === 0 ? '12px' : '',
                      }}
                    >
                      <Icon as={nav.icon} fontSize={'xl'} />
                      <Text ml={2}>
                        {nav.name === 'ManageItems' ? 'Products' : nav.name}
                      </Text>
                    </HStack>
                  );
                }
              })}
            </VStack>

            {/* Mini Profile */}
            <VStack
              mt={'64px !important'}
              style={{
                border: '3px solid var(--p-350a)',
                borderRadius: '12px',
                width: '100%',
                padding: '12px',
                paddingTop: '50px',
                color: 'white',
                position: 'relative',
                bottom: '0',
                background:
                  'linear-gradient(to bottom, var(--p-400a), var(--p-350a))',
              }}
            >
              <Avatar
                size={'xl'}
                name={auth()?.displayName}
                style={{
                  position: 'absolute',
                  top: '-50px',
                  background: 'var(--p-300)',
                  color: 'var(--p-200)',
                }}
              />

              <Text
                style={{
                  fontWeight: 'bold',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
                {auth()?.displayName}
              </Text>

              <Badge
                style={{
                  background: 'var(--accent)',
                  color: '#00000080',
                  borderRadius: '12px',
                }}
              >
                {auth()?.userRole}
              </Badge>
              <br />
              {auth()?.userRole === 'admin' && (
                <SecondaryButtonOutlineNav
                  w={'100%'}
                  label={'Profile'}
                  onClick={() => {
                    navigate('/vendere-app/profile');
                  }}
                />
              )}
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
