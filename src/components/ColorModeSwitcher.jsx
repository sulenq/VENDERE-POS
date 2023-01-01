import React from 'react';
import { useColorMode, useColorModeValue, Button } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

export const ColorModeSwitcher = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Button
      size="md"
      py={'6px'}
      px={'12px'}
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      borderRadius={'0'}
      color="current"
      onClick={toggleColorMode}
      leftIcon={<SwitchIcon />}
      {...props}
    >
      Theme
    </Button>
  );
};
