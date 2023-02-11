import { Button, useColorMode, Icon } from '@chakra-ui/react';
import '../css/vendereApp.css';

const PrimaryButton = ({
  leftIcon,
  label,
  onClick,
  type,
  form,
  size,
  refq,
  pb,
  borderRadius,
  ml,
}) => {
  return (
    <Button
      className="btn primaryBtn"
      onClick={onClick}
      size={size}
      type={type}
      form={form}
      variant={'solid'}
      ref={refq}
      pb={pb}
      borderRadius={borderRadius}
      ml={ml}
      style={{
        color: 'white',
        background: '#4f6aa9',
      }}
    >
      {leftIcon && <Icon as={leftIcon} w={5} pr={'2px'} />}
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
  pb,
  w,
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
      pb={pb}
      w={w}
      style={{
        color: colorMode === 'light' ? 'var(--p-500)' : 'var(--p-300)',
        border: '1px solid',
        borderColor: colorMode === 'light' ? 'var(--p-500)' : 'var(--p-300)',
      }}
    >
      {leftIcon && <Icon as={leftIcon} h={5} pr={'2px'} />}
      {label}
    </Button>
  );
};

export { PrimaryButton, PrimaryButtonOutline };
