import React from 'react';
import { Heading, Text } from '@chakra-ui/react';

import '../css/vendereApp.css';

const Nav = () => {
  return (
    <>
      <div className="profile">
        <img />
        <Text>Username</Text>
      </div>
      <nav className="nav">
        <Heading as={'h1'}>Nav</Heading>
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

export default Nav;
