import { Button } from '@chakra-ui/react';
import '../css/vendereApp.css';

const PrimaryButton = ({ leftIcon, label, onClick, type, form }) => {
  return (
    <Button
      className="btn"
      bg={'#4f6aa9'}
      color={'white'}
      _hover={{ bg: '#364d8d' }}
      _active={{ bg: '#223472' }}
      leftIcon={leftIcon}
      onClick={onClick}
      type={type}
      form={form}
    >
      {label}
    </Button>
  );
};

const PrimaryButtonOutline = ({ leftIcon, label, onClick, type, form }) => {
  return (
    <Button
      className="btn"
      leftIcon={leftIcon}
      onClick={onClick}
      bg={'#fdd100'}
      color={'black'}
      _hover={{ bg: '#d9b115' }}
      _active={{ bg: '#e9b115' }}
      type={type}
      form={form}
      variant={'outline'}
    >
      {label}
    </Button>
  );
};

export { PrimaryButton, PrimaryButtonOutline };
