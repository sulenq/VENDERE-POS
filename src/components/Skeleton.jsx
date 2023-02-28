import React from 'react';
import { Skeleton as SkeletonChakra, useColorMode } from '@chakra-ui/react';

const Skeleton = props => {
  const { colorMode } = useColorMode();

  return (
    <SkeletonChakra
      w={'100%'}
      h={props.h}
      startColor={colorMode === 'light' ? 'var(--p-50)' : 'var(--p-300)'}
      endColor={colorMode === 'light' ? 'var(--p-75)' : 'var(--p-400)'}
    />
  );
};

export { Skeleton };
