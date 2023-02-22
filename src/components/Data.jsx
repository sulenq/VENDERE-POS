import { Stat as StatChakra } from '@chakra-ui/react';

const Stat = ({ content, w }) => {
  return (
    <StatChakra
      w={w}
      bgGradient={'linear(to-l, var(--p-450), var(--p-400))'}
      style={{ color: 'white', border: '4px solid var(--p-400)' }}
      borderRadius={'12px'}
      // h={'102px'}
      px={4}
      py={2}
    >
      {content}
    </StatChakra>
  );
};

export { Stat };
