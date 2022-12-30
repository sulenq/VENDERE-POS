import React, { useEffect, useMemo, useState } from 'react';
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

const Nav = ({ active }) => {
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

export default Nav;
