import {
  useColorMode,
  ModalOverlay as Modaloverlay,
  ModalContent as Modalcontent,
  ModalBody as Modalbody,
  ModalFooter as Modalfooter,
} from '@chakra-ui/react';

const ModalOverlay = () => {
  return (
    <Modaloverlay bg="#00000070" backdropFilter="auto" backdropBlur="10px" />
  );
};

const ModalContent = props => {
  const { colorMode } = useColorMode();

  return (
    <Modalcontent
      ref={props.refq}
      borderRadius={12}
      w={props.w || '95%'}
      bg={colorMode === 'light' ? 'var(--p-50)' : 'var(--p-350a)'}
      backdropFilter="auto"
      backdropBlur="20px"
      m={'0px !important'}
      {...props}
    >
      {props.content}
    </Modalcontent>
  );
};

const ModalBody = props => {
  return (
    <Modalbody {...props} pb={props.pb || 4}>
      {props.content}
    </Modalbody>
  );
};

const ModalFooter = ({ content }) => {
  const { colorMode } = useColorMode();

  return (
    <Modalfooter
      bg={colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350a)'}
      borderRadius={'0 0 10px 10px'}
      flexDirection={'column'}
      p={4}
    >
      {content}
    </Modalfooter>
  );
};
export { ModalOverlay, ModalContent, ModalBody, ModalFooter };
