import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Text,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import SummarizeIcon from '@mui/icons-material/Summarize';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import ReceiptRoundedIcon from '@mui/icons-material/ReceiptRounded';
import PointOfSaleRoundedIcon from '@mui/icons-material/PointOfSaleRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import '../css/vendereApp.css';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';

const NavMobile = ({ active }) => {
  let activeNav;
  console.log(active);
  useEffect(() => {
    activeNav = document.querySelector(`#${active}`);
    activeNav.classList.add('navMobileContentBtnSelect');
  });

  const selectNavList = targetId => {
    activeNav.classList.remove('navMobileContentBtnSelect');
    const target = document.querySelector(`#${targetId}`);
    console.log(target);
    target.classList.add('navMobileContentBtnSelect');
  };
  const diselectNavList = e => {
    const target = e.target;
    target.classList.remove('navMobileContentBtnSelect');
    activeNav.classList.add('navMobileContentBtnSelect');
  };

  const navigate = useNavigate();

  return (
    <nav className="navMobile">
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
            onMouseLeave={diselectNavList}
          >
            <Icon as={SummarizeIcon} fontSize={'xx-large'} mx={'auto'} />
            <Text
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
            onMouseLeave={diselectNavList}
          >
            <Icon as={MoneyOffIcon} fontSize={'xx-large'} />
            <Text
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
            onMouseLeave={diselectNavList}
          >
            <Icon as={PointOfSaleRoundedIcon} fontSize={'xx-large'} />
            <Text
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
            onMouseLeave={diselectNavList}
          >
            <Icon as={ReceiptRoundedIcon} fontSize={'xx-large'} />
            <Text
              style={{ color: 'var(--primary-200)' }}
              fontSize={'xs'}
              pt={1}
            >
              Transactions
            </Text>
          </div>
        </li>

        {/* Other */}
        <li id="navOther">
          <Menu>
            <MenuButton aria-label="Other" w={'100%'}>
              <div className="navMobileContentBtn">
                <Icon as={MoreVertRoundedIcon} fontSize={'xx-large'} />
                <Text
                  fontSize={'xs'}
                  style={{ color: 'var(--primary-200)' }}
                  pt={1}
                >
                  Other
                </Text>
              </div>
            </MenuButton>
            <MenuList minW={'150px'}>
              <div id="colorModeSwitcherMobile">
                <ColorModeSwitcher />
              </div>
              <MenuItem>Support</MenuItem>
              <MenuItem>Stock</MenuItem>
            </MenuList>
          </Menu>
        </li>
      </ul>
    </nav>
  );
};

const Nav = () => {
  return (
    <>
      <div className="profile">
        <img />
        <Text>Username</Text>
      </div>
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
