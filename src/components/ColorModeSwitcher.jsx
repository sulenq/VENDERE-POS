import React from 'react';
import { useColorMode, useColorModeValue, IconButton } from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeIconButton = props => {
  const { toggleColorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <IconButton
      size="md"
      py={'6px'}
      px={'12px'}
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      borderRadius={50}
      color="current"
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      {...props}
    ></IconButton>
  );
};

export { ColorModeIconButton };
