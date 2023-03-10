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
      borderRadius={12}
      w={props.w || '95%'}
      bg={colorMode === 'light' ? 'var(--p-50)' : 'var(--p-400a)'}
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
    <Modalbody
      h={props.h}
      px={props.px}
      py={props.py}
      pb={props.pb || 4}
      id={props.id}
    >
      {props.content}
    </Modalbody>
  );
};

const ModalFooter = ({ content }) => {
  const { colorMode } = useColorMode();

  return (
    <Modalfooter
      bg={colorMode === 'light' ? '#eff2f6' : 'var(--p-450a)'}
      borderRadius={'0 0 10px 10px'}
      flexDirection={'column'}
      py={3}
    >
      {content}
    </Modalfooter>
  );
};
export { ModalOverlay, ModalContent, ModalBody, ModalFooter };
