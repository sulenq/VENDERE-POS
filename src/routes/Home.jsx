import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

import { ColorModeSwitcher } from '../components/ColorModeSwitcher';

export default function Home() {
  const navigate = useNavigate();
  const vendereApp = () => {
    navigate('/vendere-app/cashier');
  };
  return (
    <div className="home">
      <ColorModeSwitcher />
      <Button onClick={vendereApp}>Vendere App</Button>
    </div>
  );
}
