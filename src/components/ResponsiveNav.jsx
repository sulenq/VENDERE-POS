import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Text,
  Icon,
  Box,
  useColorMode,
  Heading,
  HStack,
  Divider,
  VStack,
} from '@chakra-ui/react';
import SummarizeIcon from '@mui/icons-material/Summarize';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import '../css/vendereApp.css';
import {
  PrimaryButton,
  PrimaryButtonOutline,
  SecondaryButtonOutline,
} from './Buttons';

const NavMobile = ({ active }) => {
  let nav;
  let activeNav;
  console.log(active);
  useEffect(() => {
    nav = document.querySelector('.navMobile');
    activeNav = document.querySelector(`#${active}`);
    activeNav.classList.add('navMobileContentBtnSelect');
  });

  const selectNavList = targetId => {
    activeNav.classList.remove('navMobileContentBtnSelect');
    const target = document.querySelector(`#${targetId}`);
    console.log(targetId);
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
    <Box className="navMobile" style={{ background: 'var(--p-500)' }}>
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
            <Icon as={SummarizeIcon} fontSize={'xx-large'} mx={'auto'} />
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
            <Icon as={ReceiptRoundedIcon} fontSize={'xx-large'} />
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

const Nav = ({ active }) => {
  const navigate = useNavigate();

  // hover
  const selectNav = targetId => {
    const target = document.querySelector(`#${targetId}`);
    target.classList.add('navListActive');
  };
  const diselectNav = targetId => {
    const navActive = document.querySelector(`#${active}Nav`);
    const target = document.querySelector(`#${targetId}`);
    target.classList.remove('navListActive');
    navActive.classList.add('navListActive');
    console.log(navActive);
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
              <PointOfSaleRoundedIcon style={{ color: 'var(--accent)' }} />
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
                  id="cashierNav"
                  className={active === 'cashier' ? 'navListActive' : null}
                  onClick={() => navigate('../cashier')}
                  onMouseEnter={() => {
                    selectNav('cashierNav');
                  }}
                  onMouseLeave={() => {
                    diselectNav('cashierNav');
                  }}
                >
                  <Icon as={PointOfSaleRoundedIcon} fontSize={'xl'} />
                  <Text ml={2}>Cashier</Text>
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
                  <Icon as={ReceiptRoundedIcon} fontSize={'xl'} />
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
                  <Icon as={SummarizeIcon} fontSize={'xl'} />
                  <Text ml={2}>Reports</Text>
                </li>

                <Divider mr={4} style={{ background: 'var(--p-50)' }} />

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
                  <Text>Support</Text>
                </li>
                <li
                  id="stockNav"
                  className={active === 'stock' ? 'navListActive' : null}
                  onClick={() => navigate('../stock')}
                  onMouseEnter={() => {
                    selectNav('stockNav');
                  }}
                  onMouseLeave={() => {
                    diselectNav('stockNav');
                  }}
                >
                  <Text>Stock</Text>
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
                borderRadius={'20px'}
                style={{
                  background:
                    'linear-gradient(to bottom, var(--p-450), var(--p-400))',
                  border: '2px solid var(--p-400)',
                }}
                py={2}
                px={4}
                w={'100%'}
              >
                <VStack color={'white'} pt={10} mb={4}>
                  <Text fontWeight={'bold'}>Username</Text>
                  <Text fontSize={'sm'} m={'0px !important'}>
                    Cashier
                  </Text>
                </VStack>
                <SecondaryButtonOutline label={'Manage'} w={'100%'} />
                <PrimaryButton label={'Logout'} w={'100%'} />
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </nav>
    </>
  );
};

const ResponsiveNav = ({ active }) => {
  // Width Meter
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });
  return (
    <>
      {screenWidth <= 1000 ? (
        <NavMobile active={active} />
      ) : (
        <Nav active={active} />
      )}
    </>
  );
};

export default ResponsiveNav;
