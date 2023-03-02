import React from 'react';
import { HStack, Text } from '@chakra-ui/react';

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
      <ColorModeButton size={'sm'} />
    </HStack>
  );
};
