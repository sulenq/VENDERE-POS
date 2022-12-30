import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  useEffect(() => {
    activeNav = document.querySelector(`#${active}`);
    activeNav.classList.add('navMobileContentBtnSelect');
  });

  const selectNavList = e => {
    switch (active) {
      case 'cashier':
        activeNav.classList.remove('navMobileContentBtnSelect');
        break;
    }
    const target = e.target;
    const ul = document.querySelector('.navMobile > ul');

    target.classList.add('navMobileContentBtnSelect');
  };
  const diselectNavList = e => {
    switch (active) {
      case 'cashier':
        activeNav.classList.add('navMobileContentBtnSelect');
        break;
    }
    const target = e.target;
    target.classList.remove('navMobileContentBtnSelect');
  };

  return (
    <nav className="navMobile">
      <ul>
        {/* Reports */}
        <Link></Link>
        <li
          id="reports"
          onMouseEnter={selectNavList}
          onMouseLeave={diselectNavList}
        >
          <div className="navMobileContentBtn">
            <Icon as={SummarizeIcon} fontSize={'xx-large'} />
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
        <li
          id="debts"
          onMouseEnter={selectNavList}
          onMouseLeave={diselectNavList}
        >
          <div className="navMobileContentBtn">
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
        <li
          id="cashier"
          onMouseEnter={selectNavList}
          onMouseLeave={diselectNavList}
        >
          <div className="navMobileContentBtn">
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
        <li
          id="transactions"
          onMouseEnter={selectNavList}
          onMouseLeave={diselectNavList}
        >
          <div className="navMobileContentBtn">
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
        <div id="navOther">
          <Menu>
            <MenuButton aria-label="Other">
              <div className="navMobileContentBtn">
                <Icon as={MoreVertRoundedIcon} fontSize={'xx-large'} />
                <Text fontSize={'xs'} style={{ color: 'var(--primary-200)' }}>
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
        </div>
      </ul>
    </nav>
  );
};

export default Nav;
