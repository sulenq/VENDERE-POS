import React, { useState, useMemo } from 'react';
import { Input, useColorMode } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';

const SearchBox = props => {
  const { colorMode } = useColorMode();

  const { pathname } = useLocation();

  const [itemsLength, setItemLength] = useState(0);

  function selectItem() {
    const targetItem = document.querySelector(
      `.items > :nth-child(${props.itemIndex})`
    );

    // console.log(targetItem);

    const items = document.querySelectorAll('.items > div');

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

    setItemLength(items.length);

    items.forEach(item => {
      item.classList.remove('itemSelected');
    });
    if (targetItem) {
      targetItem.classList.add('itemSelected');
    }
    // console.log(itemIndex);
  }

  useMemo(() => {
    props.setItemIndex(1);
    selectItem();
  }, [props.search]);

  useMemo(() => {
    selectItem();
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
      if (props.itemIndex < itemsLength) {
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
      border={'1px solid'}
      borderRadius={'8px'}
      style={{
        borderColor:
          colorMode === 'light'
            ? '2px solid var(--p-500)'
            : '2px solid var(--p-50)',
      }}
      _focusVisible={{
        border: colorMode === 'light' ? '2px solid ' : '2px solid',
      }}
    />
  );
};

export { SearchBox };
