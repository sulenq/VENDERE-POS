import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

import { ColorModeIconButton } from '../components/ColorModeSwitcher';

export default function Home() {
  const navigate = useNavigate();
  const vendereApp = () => {
    navigate('/vendere-app/cashier');
  };
  return (
    <div className="home">
      <ColorModeIconButton />
      <Button onClick={vendereApp}>Vendere App</Button>
    </div>
  );
}
