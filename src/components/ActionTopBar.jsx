import React from 'react';
import { HStack, Text, Button } from '@chakra-ui/react';

import { ColorModeButton } from './ColorModeSwitcher';

export const ActionTopBar = () => {
  const dateOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const todayDate = new Date().toLocaleString(undefined, dateOptions);

  return (
    <HStack w={'100%'} pb={1} px={2} justifyContent={'space-between'}>
      <Text opacity={'0.5'}>{todayDate}</Text>
      <HStack>
        <Button variant={'ghost'} size={'sm'}>
          Refresh
        </Button>
        <ColorModeButton size={'sm'} />
      </HStack>
    </HStack>
  );
};
