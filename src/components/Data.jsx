import { Stat as StatChakra, useColorMode } from '@chakra-ui/react';

const Stat = ({ content, w, style }) => {
  const { colorMode } = useColorMode();
  
  return (
    <StatChakra
      w={w}
      style={style}
      // h={'102px'}
      px={4}
      py={2}
    >
      {content}
    </StatChakra>
  );
};

export { Stat };
