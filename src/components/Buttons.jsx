import { Button, useColorMode, Icon } from '@chakra-ui/react';

import '../css/vendereApp.css';

const PrimaryButton = props => {
  const { colorMode } = useColorMode();

  return (
    <Button
      // {...props}
      id={props.id}
      onClick={props.onClick}
      size={props.size}
      form={props.form}
      type={props.type}
      pb={props.pb}
      ml={props.ml}
      mr={props.mr}
      w={props.w}
      ref={props.refq}
      borderRadius={props.borderRadius || 50}
      isLoading={props.isLoading}
      variant={'solid'}
      color={colorMode === 'light' ? 'var(--p-50)' : 'var(--p-500)'}
      background={colorMode === 'light' ? 'var(--p-500)' : 'var(--p-50)'}
      style={props.style}
      _hover={{
        background:
          colorMode === 'light'
            ? 'var(--p-300) !important'
            : 'var(--p-100) !important',
      }}
      _active={{
        background: 'var(--accent) !important',
      }}
    >
      {props.leftIcon && (
        <Icon as={props.leftIcon} w={5} pr={props.label ? '2px' : ''} />
      )}
      {props.label}
    </Button>
  );
};

const PrimaryButtonOutline = props => {
  const { colorMode } = useColorMode();

  return (
    <Button
      id={props.id}
      onClick={props.onClick}
      type={props.type}
      size={props.size}
      form={props.form}
      pb={props.pb}
      w={props.w}
      variant={'outline'}
      ref={props.refq}
      borderRadius={props.borderRadius || 50}
      style={{
        color: colorMode === 'light' ? 'var(--p-500)' : 'var(--p-50)',
        border: '1px solid',
        borderColor: colorMode === 'light' ? 'var(--p-200)' : 'var(--p-250)',
      }}
      _hover={{
        background:
          colorMode === 'light'
            ? 'var(--p-75) !important'
            : 'var(--p-350) !important',
      }}
      _active={{
        background:
          colorMode === 'light'
            ? 'var(--p-100a) !important'
            : 'var(--p-300) !important',
      }}
    >
      {props.leftIcon && (
        <Icon as={props.leftIcon} h={5} pr={props.label ? '2px' : ''} />
      )}
      {props.label}
    </Button>
  );
};

const PrimaryButtonNav = props => {
  const { colorMode } = useColorMode();

  return (
    <Button
      id={props.id}
      ref={props.refq}
      className="btn"
      onClick={props.onClick}
      size={props.size}
      type={props.type}
      form={props.form}
      variant={'solid'}
      pb={props.pb}
      borderRadius={props.borderRadius}
      ml={props.ml}
      w={props.w}
      isLoading={props.isLoading}
      _hover={{
        background: 'var(--p-100) !important',
      }}
      style={{
        color: 'var(--p-500)',
        background: 'var(--p-50)',
      }}
      _active={{ background: 'var(--accent) !important' }}
    >
      {props.leftIcon && (
        <Icon as={props.leftIcon} w={5} pr={props.label ? '2px' : ''} />
      )}
      {props.label}
    </Button>
  );
};

const SecondaryButtonOutlineNav = props => {
  const { colorMode } = useColorMode();

  return (
    <Button
      id={props.id}
      className="btn"
      onClick={props.onClick}
      type={props.type}
      size={props.size}
      form={props.form}
      variant={'outline'}
      ref={props.refq}
      pb={props.pb}
      w={props.w}
      style={{
        color: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-50)',
        border: '1px solid',
        borderColor: 'var(--p-250)',
      }}
      _hover={{
        background: 'whiteAlpha.200 !important',
      }}
      _active={{ background: 'whiteAlpha.300 !important' }}
    >
      {props.leftIcon && (
        <Icon as={props.leftIcon} h={5} pr={props.label ? '2px' : ''} />
      )}
      {props.label}
    </Button>
  );
};

const PrimaryButtonGhost = props => {
  const { colorMode } = useColorMode();

  return (
    <Button
      // {...props}
      id={props.id}
      onClick={props.onClick}
      size={props.size}
      form={props.form}
      type={props.type}
      pb={props.pb}
      ml={props.ml}
      mr={props.mr}
      w={props.w}
      ref={props.refq}
      borderRadius={props.borderRadius || 50}
      isLoading={props.isLoading}
      variant={'ghost'}
      // style={{
      //   color: 'var(--p-500)',
      //   background: 'var(--p-50)',
      // }}
      _hover={{
        background: colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
      }}
      _active={{
        background: colorMode === 'light' ? 'var(--p-75)' : 'var(--p-350)',
      }}
    >
      {props.leftIcon && <Icon as={props.leftIcon} w={5} pr={'2px'} />}
      {props.label}
    </Button>
  );
};

export {
  PrimaryButton,
  PrimaryButtonOutline,
  PrimaryButtonNav,
  SecondaryButtonOutlineNav,
  PrimaryButtonGhost,
};
