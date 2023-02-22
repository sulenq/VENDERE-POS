import { Button, useColorMode, Icon } from '@chakra-ui/react';

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';

import '../css/vendereApp.css';

const PrimaryButton = ({
  leftIcon,
  label,
  onClick,
  type,
  form,
  size,
  pb,
  borderRadius,
  ml,
  w,
  id,
  isLoading,
  refq,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Button
      id={id}
      ref={refq}
      className="btn primaryBtn"
      onClick={onClick}
      size={size}
      type={type}
      form={form}
      variant={'solid'}
      pb={pb}
      borderRadius={borderRadius}
      ml={ml}
      w={w}
      isLoading={isLoading}
      _hover={{
        background:
          colorMode === 'light'
            ? 'var(--p-300) !important'
            : 'var(--p-100) !important',
      }}
      style={{
        color: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-500)',
        background: colorMode === 'light' ? 'var(--p-500)' : 'var(--p-50)',
      }}
      _active={{
        background: 'var(--accent) !important',
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
  id,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Button
      id={id}
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
        color: colorMode === 'light' ? 'var(--p-500)' : 'var(--p-50)',
        border: '2px solid',
        borderColor: colorMode === 'light' ? 'var(--p-500)' : 'var(--p-50)',
      }}
      _hover={{
        background:
          colorMode === 'light'
            ? 'var(--light) !important'
            : 'var(--p-100) !important',
      }}
      _active={{ background: 'var(--p-100) !important' }}
    >
      {leftIcon && <Icon as={leftIcon} h={5} pr={'2px'} />}
      {label}
    </Button>
  );
};

const PrimaryButtonNav = ({
  leftIcon,
  label,
  onClick,
  type,
  form,
  size,
  pb,
  borderRadius,
  ml,
  w,
  id,
  isLoading,
  refq,
}) => {
  const { colorMode } = useColorMode();

  return (
    <Button
      id={id}
      ref={refq}
      className="btn primaryBtn"
      onClick={onClick}
      size={size}
      type={type}
      form={form}
      variant={'solid'}
      pb={pb}
      borderRadius={borderRadius}
      ml={ml}
      w={w}
      isLoading={isLoading}
      _hover={{
        background: 'var(--p-100) !important',
      }}
      style={{
        color: 'var(--p-500)',
        background: 'var(--p-50)',
      }}
      _active={{ background: 'var(--accent) !important' }}
    >
      {leftIcon && <Icon as={leftIcon} w={5} pr={'2px'} />}
      {label}
    </Button>
  );
};

const SecondaryButtonOutlineNav = ({
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
        border: '2px solid',
        borderColor: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-50)',
      }}
    >
      {leftIcon && <Icon as={leftIcon} h={5} pr={'2px'} />}
      {label}
    </Button>
  );
};

export {
  PrimaryButton,
  PrimaryButtonOutline,
  PrimaryButtonNav,
  SecondaryButtonOutlineNav,
};
