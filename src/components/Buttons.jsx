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
  w,
  id,
}) => {
  return (
    <Button
      id={id}
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
      w={w}
      style={{
        color: 'white',
        background: 'var(--p-500)',
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

const SecondaryButtonOutline = ({
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
      className="btn secondaryButtonOutline"
      onClick={onClick}
      type={type}
      size={size}
      form={form}
      variant={'outline'}
      ref={refq}
      pb={pb}
      w={w}
      style={{
        color: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-50)',
        border: '1px solid',
        borderColor: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-50)',
      }}
    >
      {leftIcon && <Icon as={leftIcon} h={5} pr={'2px'} />}
      {label}
    </Button>
  );
};

export { PrimaryButton, PrimaryButtonOutline, SecondaryButtonOutline };
