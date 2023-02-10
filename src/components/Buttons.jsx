import { Button } from '@chakra-ui/react';
import '../css/vendereApp.css';

const PrimaryButton = ({ leftIcon, label, onClick, type, form, size }) => {
  return (
    <Button
      className="btn"
      bg={'#4f6aa9'}
      color={'white'}
      _hover={{ bg: '#364d8d' }}
      _active={{ bg: '#223472' }}
      leftIcon={leftIcon}
      onClick={onClick}
      size={size}
      type={type}
      form={form}
    >
      {label}
    </Button>
  );
};

const PrimaryButtonOutline = ({
  leftIcon,
  label,
  onClick,
  type,
  form,
  size,
}) => {
  return (
    <Button
      className="btn"
      leftIcon={leftIcon}
      onClick={onClick}
      color={'#4f6aa9'}
      _hover={{ bg: '#e5f0fc' }}
      _active={{ bg: '#ccdff9' }}
      border={'1px solid'}
      borderColor={'#4f6aa9'}
      type={type}
      size={size}
      form={form}
      variant={'outline'}
    >
      {label}
    </Button>
  );
};

export { PrimaryButton, PrimaryButtonOutline };
