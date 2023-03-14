import React, { useState, useEffect } from 'react';
import {
  Input as InputChakra,
  useColorMode,
  Kbd,
  HStack,
  InputGroup,
  InputRightElement,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const SearchBox = props => {
  const { colorMode } = useColorMode();
  const { pathname } = useLocation();
  const items = document.querySelectorAll('.items > div');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  function selectItemIndicator() {
    const targetItem = document.querySelector(
      `.items > :nth-child(${props?.itemIndex || 1})`
    );

    // console.log(props.itemIndex);

    if (targetItem) {
      const rect = targetItem.getBoundingClientRect();
      if (
        !(
          rect.top >= 200 &&
          rect.left >= 0 &&
          rect.bottom <= window.innerHeight - 100 &&
          rect.right <= window.innerWidth
        )
      ) {
        targetItem.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }

    props.setItemsLength(items.length);

    items.forEach(item => {
      item.classList.remove('itemSelected');
    });

    if (targetItem) {
      targetItem.classList.add('itemSelected');
    }
    // console.log(itemIndex);
  }

  useEffect(() => {
    selectItemIndicator();
  });

  const handleKeyUp = e => {
    if (pathname === '/vendere-app/cashier') {
      if (e.key === 'Enter') {
        const btn = document.querySelector(
          `.items :nth-child(${props.itemIndex}) .actionBtnSection > button`
        );
        const searchBox = document.querySelector('#itemSearchBox');
        if (btn) {
          btn.click();
          searchBox.select();
        }
      }
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (props.itemIndex < props.itemsLength) {
        props.setItemIndex(props.itemIndex + 1);
        props.selectItem({ index: props.itemIndex + 1 });
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (props.itemIndex > 1) {
        props.setItemIndex(props.itemIndex - 1);
        props.selectItem({ index: props.itemIndex - 1 });
      }
    }
  };

  return (
    <InputGroup>
      <InputChakra
        id={'itemSearchBox'}
        px={3}
        autoComplete={'off'}
        className={'inputBox'}
        onChange={props.onChange}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        value={props.search}
        tabIndex={0}
        onFocus={e => e.target.select()}
        placeholder={props.placeholder}
        _placeholder={{ opacity: 0.5 }}
        w={'100%'}
        pr={'96px !important'}
        border={'1px solid'}
        borderColor={colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300)'}
        borderRadius={'8px'}
        _focusVisible={{
          border: '1px solid',
        }}
      />
      {screenWidth > 1000 ? (
        <InputRightElement
          children={
            <HStack mr={'60px !important'}>
              <Kbd
                bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
              >
                ⬆
              </Kbd>

              <Text opacity={0.5}>or</Text>

              <Kbd
                bg={colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100'}
              >
                ⬇
              </Kbd>
            </HStack>
          }
        />
      ) : (
        ''
      )}
    </InputGroup>
  );
};

const Input = props => {
  const { colorMode } = useColorMode();

  return (
    <InputChakra
      {...props}
      onFocus={props.onFocus}
      px={3}
      type={props.type}
      placeholder={props.placeholder}
      _placeholder={{ opacity: 0.5 }}
      value={props.value}
      onChange={props.onChange}
      border={'1px solid'}
      borderColor={colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300)'}
      borderRadius={'8px'}
      _focusVisible={{
        border: '1px solid',
      }}
    />
  );
};

const InputNumber = props => {
  const { colorMode } = useColorMode();

  return (
    <NumberInput defaultValue={1} min={props.min} max={props.max}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};

export { SearchBox, Input, InputNumber };
