import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Icon, Box, useColorMode } from '@chakra-ui/react';
import SummarizeIcon from '@mui/icons-material/Summarize';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import '../css/vendereApp.css';

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
    <Box
      className="navMobile"
      background={colorMode === 'light' ? '#4f6aa9' : '#4f6aa9'}
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
            <Icon as={SummarizeIcon} fontSize={'xx-large'} mx={'auto'} />
            <Text
              className="navLabel"
              display={'none'}
              style={{ color: 'var(--primary-200)' }}
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
              style={{ color: 'var(--primary-200)' }}
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
              style={{ color: 'var(--primary-200)' }}
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
              style={{ color: 'var(--primary-200)' }}
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
              style={{ color: 'var(--primary-200)' }}
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
  return (
    <>
      <nav className="nav">
        <ul>
          <li>Cashier</li>
          <li>Transaction</li>
          <li>Debts</li>
          <li>Reports</li>
        </ul>

        <ul>
          <li>Support</li>
          <li>Stock</li>
        </ul>

        <div className="profile">
          <img />
          <Text>Username</Text>
        </div>
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
      {screenWidth <= 820 ? (
        <NavMobile active={active} />
      ) : (
        <Nav active={active} />
      )}
    </>
  );
};

export default ResponsiveNav;
