import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, HStack } from '@chakra-ui/react';
import '../css/landingPage.css';

import { ColorModeIconButton } from '../components/ColorModeSwitcher';

export default function Home() {
  const navigate = useNavigate();
  const vendereApp = () => {
    navigate('/vendere-app/cashier');
  };

  return (
    <div className="landingPage">
      <HStack>
        <Text>
          
        </Text>
      </HStack>
    </div>
  );
}
