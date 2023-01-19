import {
  useColorMode,
  ModalOverlay as Modaloverlay,
  ModalContent as Modalcontent,
  ModalBody as Modalbody,
  ModalFooter as Modalfooter,
} from '@chakra-ui/react';

const ModalOverlay = () => {
  return (
    <Modaloverlay bg="#00000070" backdropFilter="auto" backdropBlur="5px" />
  );
};

const ModalContent = ({ content }) => {
  const { colorMode } = useColorMode();

  return (
    <Modalcontent
      borderRadius={12}
      w={'95%'}
      bg={colorMode === 'light' ? '#ffffff' : '#1a202c95'}
      backdropFilter="auto"
      backdropBlur="20px"
    >
      {content}
    </Modalcontent>
  );
};

const ModalBody = ({ content }) => {
  return <Modalbody>{content}</Modalbody>;
};

const ModalFooter = ({ content }) => {
  const { colorMode } = useColorMode();

  return (
    <Modalfooter
      bg={colorMode === 'light' ? '#eff2f6' : '#2d374850'}
      borderRadius={'0 0 10px 10px'}
    >
      {content}
    </Modalfooter>
  );
};
export { ModalOverlay, ModalContent, ModalBody, ModalFooter };
