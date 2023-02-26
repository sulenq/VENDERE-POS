import React, { useState, useEffect } from 'react';
import {
  Input,
  useColorMode,
  Kbd,
  HStack,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const SearchBox = props => {
  const { colorMode } = useColorMode();

  const { pathname } = useLocation();

  const items = document.querySelectorAll('.items > div');

  function selectItemIndicator() {
    const targetItem = document.querySelector(
      `.items > :nth-child(${props.itemIndex})`
    );

    // console.log(targetItem);

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
    props.setItemIndex(1);
  }, [props.search]);

  useEffect(() => {
    selectItemIndicator();
  });

  const handleKeyUp = e => {
    if (pathname === '/vendere-app/cashier') {
      if (e.key === 'Enter') {
        const btn = document.querySelector(
          `.items :nth-child(${props.itemIndex}) .actionBtnSection > button`
        );
        if (btn) {
          btn.click();
        }
      }
    } else if (pathname === '/vendere-app/manageitems') {
      //todo handle klik enter pas select item di manage items
      if (e.key === 'Enter') {
        props.selectItem(props.itemIndex);
      }
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (props.itemIndex < props.itemsLength - 2) {
        props.setItemIndex(props.itemIndex + 1);
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (props.itemIndex > 1) {
        props.setItemIndex(props.itemIndex - 1);
      }
    }
  };

  return (
    <InputGroup>
      <Input
        ref={props.refq}
        onChange={props.onChange}
        onKeyUp={handleKeyUp}
        onKeyDown={handleKeyDown}
        value={props.search}
        id={'itemSearchBox'}
        className={'inputBox'}
        tabIndex={0}
        onFocus={e => e.target.select()}
        type={'text'}
        placeholder={'Search item by name or code'}
        w={'100%'}
        pr={'96px !important'}
        border={'1px solid'}
        borderColor={colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300)'}
        borderRadius={'8px'}
        _focusVisible={{
          border: colorMode === 'light' ? '2px solid' : '2px solid',
        }}
      />
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
    </InputGroup>
  );
};

export { SearchBox };
