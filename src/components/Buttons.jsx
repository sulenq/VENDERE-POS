import { Button, useColorMode, Icon } from '@chakra-ui/react';
import '../css/vendereApp.css';

const PrimaryButton = ({ 
  leftIcon, label, onClick, type, form, size, refq }) => {
  return (
    <Button
      className="btn primaryBtn"
      bg={'#4f6aa9'}
      leftIcon={leftIcon}
      onClick={onClick}
      size={size}
      type={type}
      form={form}
      ref={refq}
      // pb={'1px'}
      style={{
        color: 'white',
      }}
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
  refq,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Button
      className="btn primaryBtnOutline"
      onClick={onClick}
      type={type}
      size={size}
      form={form}
      variant={'outline'}
      ref={refq}
      // pb={'1px'}
      style={{
        color: colorMode === 'light' ? 'var(--p-500)' : 'var(--p-300)',
        border: '1px solid',
        borderColor: colorMode === 'light' ? 'var(--p-500)' : 'var(--p-300)',
      }}
    >
      {leftIcon && <Icon as={leftIcon} w={5} pr={'2px'} />}
      {label}
    </Button>
  );
};

export { PrimaryButton, PrimaryButtonOutline };
