import React from 'react';
import {
  useColorMode,
  useColorModeValue,
  IconButton,
  Button,
  Text,
  Icon,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const ColorModeIconButton = props => {
  const { toggleColorMode, colorMode } = useColorMode();
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
      color={'current'}
      onClick={toggleColorMode}
      icon={<SwitchIcon />}
      _hover={{
        background: colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300)',
      }}
      _active={{
        background: colorMode === 'light' ? 'var(--p-100)' : 'var(--p-350)',
      }}
      {...props}
    ></IconButton>
  );
};

const ColorModeButton = props => {
  const { toggleColorMode, colorMode } = useColorMode();
  const text = useColorModeValue('dark', 'light');
  const SwitchIcon = useColorModeValue(FaMoon, FaSun);

  return (
    <Button
      size={props.size}
      py={'6px'}
      px={'12px'}
      aria-label={`Switch to ${text} mode`}
      variant="ghost"
      borderRadius={12}
      color="current"
      onClick={toggleColorMode}
      _hover={{
        background: colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300)',
      }}
      _active={{
        background: colorMode === 'light' ? 'var(--p-100)' : 'var(--p-350)',
      }}
      {...props}
    >
      <Icon as={SwitchIcon} mt={'2px'} mr={1} />
      <Text>Theme</Text>
    </Button>
  );
};

export { ColorModeIconButton, ColorModeButton };
