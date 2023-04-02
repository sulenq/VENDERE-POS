import React, { useState, useEffect } from 'react';
import {
  Input as InputChakra,
  useColorMode,
  Kbd,
  HStack,
  InputGroup,
  InputRightElement,
  Text,
  Textarea as TextareaChakra,
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

    // if (e.key === 'ArrowDown') {
    //   e.preventDefault();
    //   if (props.itemIndex <= props.itemsLength) {
    //     if (props.itemIndex == props.itemsLength) {
    //       props.setItemIndex(1);
    //       props.selectItem({ index: 1 });
    //     } else {
    //       props.setItemIndex(props.itemIndex + 1);
    //       props.selectItem({ index: props.itemIndex + 1 });
    //     }
    //   }
    // }

    // if (e.key === 'ArrowUp') {
    //   e.preventDefault();
    //   if (props.itemIndex >= 1) {
    //     if (props.itemIndex == 1) {
    //       props.setItemIndex(props.itemIndex + props.itemsLength - 1);
    //       props.selectItem({ index: props.itemIndex + props.itemsLength - 1 });
    //     } else {
    //       props.setItemIndex(props.itemIndex - 1);
    //       props.selectItem({ index: props.itemIndex - 1 });
    //     }
    //   }
    // }
  };

  const handleKeyDown = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (props.itemIndex <= props.itemsLength) {
        if (props.itemIndex == props.itemsLength) {
          props.setItemIndex(1);
          props.selectItem({ index: 1 });
        } else {
          props.setItemIndex(props.itemIndex + 1);
          props.selectItem({ index: props.itemIndex + 1 });
        }
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (props.itemIndex >= 1) {
        if (props.itemIndex == 1) {
          props.setItemIndex(props.itemIndex + props.itemsLength - 1);
          props.selectItem({ index: props.itemIndex + props.itemsLength - 1 });
        } else {
          props.setItemIndex(props.itemIndex - 1);
          props.selectItem({ index: props.itemIndex - 1 });
        }
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
        pr={screenWidth >= 1000 ? '96px !important' : ''}
        bg={colorMode === 'light' ? 'var(--p-50)' : 'var(--p-300a2)'}
        borderLeft={'1px solid'}
        borderRight={'1px solid'}
        borderTop={'1px solid'}
        borderBottom={'2px solid'}
        borderColor={
          colorMode === 'light'
            ? 'var(--p-75) !important'
            : 'var(--p-300) !important'
        }
        borderRadius={'8px'}
        _focusVisible={{
          bg: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-350a2)',
          borderBottom: '2px solid var(--accent) !important',
        }}
      />
      {screenWidth > 1000 && (
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
      bg={colorMode === 'light' ? 'var(--p-50)' : 'var(--p-350a2)'}
      borderLeft={'1px solid'}
      borderRight={'1px solid'}
      borderTop={'1px solid'}
      borderBottom={'2px solid'}
      borderColor={
        colorMode === 'light'
          ? 'var(--p-75) !important'
          : 'var(--p-350a) !important'
      }
      borderRadius={'8px'}
      _focusVisible={{
        bg: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-350a2)',
        borderBottom: '2px solid var(--accent) !important',
      }}
    />
  );
};

const Textarea = props => {
  const { colorMode } = useColorMode();

  return (
    <TextareaChakra
      {...props}
      mt={'0px !important'}
      _placeholder={{ opacity: 0.5 }}
      bg={colorMode === 'light' ? 'var(--p-50)' : 'var(--p-350a2)'}
      borderLeft={'1px solid'}
      borderRight={'1px solid'}
      borderTop={'1px solid'}
      borderBottom={'2px solid'}
      borderColor={
        colorMode === 'light'
          ? 'var(--p-75) !important'
          : 'var(--p-350a) !important'
      }
      borderRadius={'8px'}
      _focusVisible={{
        bg: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-350a2)',
        borderBottom: '2px solid var(--accent) !important',
      }}
    />
  );
};

export { SearchBox, Input, Textarea };
