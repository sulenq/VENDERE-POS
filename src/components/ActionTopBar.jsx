import React from 'react';
import { HStack, Text, useColorMode, IconButton } from '@chakra-ui/react';
import { ColorModeIconButton } from './ColorModeSwitcher';

import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';

export const ActionTopBar = () => {
  const dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };
  const todayDate = new Date().toLocaleDateString(undefined, dateOptions);
  const { colorMode } = useColorMode();

  return (
    <HStack w={'100%'} pb={1} pl={3} pr={1} justifyContent={'space-between'}>
      <Text opacity={'0.5'}>{todayDate}</Text>
      <HStack>
        <IconButton
          icon={<RefreshOutlinedIcon style={{ fontSize: '18px' }} />}
          variant={'ghost'}
          size={'sm'}
          borderRadius={50}
          _hover={{
            background: colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300)',
          }}
          _active={{
            background:
              colorMode === 'light' ? 'var(--p-100a)' : 'var(--p-350)',
          }}
          onClick={() => {
            window.location.reload();
          }}
        />

        <ColorModeIconButton m={'0 !important'} size={'sm'} />
      </HStack>
    </HStack>
  );
};
