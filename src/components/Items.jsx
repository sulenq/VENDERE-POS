import { useState, useEffect, useRef } from 'react';
import {
  IconButton,
  useColorMode,
  Text,
  VStack,
  HStack,
  Input,
} from '@chakra-ui/react';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';

import '../css/vendereApp.css';
import { PrimaryButton, PrimaryButtonOutline } from './Buttons';

const Items = ({ items, search, setSearch, addItemToCartList }) => {
  const { colorMode } = useColorMode();
  const searchItem = useRef(null);

  const [itemIndex, setItemIndex] = useState(1);
  const [itemsLength, setItemLength] = useState(0);

  function selectItem() {
    const targetItem = document.querySelector(
      `.items > :nth-child(${itemIndex})`
    );
    const items = document.querySelectorAll('.items > div');

    if (targetItem) {
      const rect = targetItem.getBoundingClientRect();
      if (
        !(
          rect.top >= 100 &&
          rect.left >= 0 &&
          rect.bottom <= window.innerHeight &&
          rect.right <= window.innerWidth
        )
      ) {
        targetItem.scrollIntoView();
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

  useEffect(() => {
    setItemIndex(1);
    selectItem();
  }, [search]);

  useEffect(() => {
    selectItem();
  }, [itemIndex]);

  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      const btn = document.querySelector(
        `.items :nth-child(${itemIndex}) .actionBtnSection > button`
      );
      if (btn) {
        btn.click();
      }
    }
  };

  const handleKeyDown = e => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (itemIndex < itemsLength) {
        setItemIndex(itemIndex + 1);
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (itemIndex > 1) {
        setItemIndex(itemIndex - 1);
      }
    }
  };

  // KeyUp Event

  return (
    <VStack id="addItemToCart" h={'100%'} w={'50%'}>
      <VStack
        alignItems={'flex-start'}
        py={4}
        w={'100%'}
        h={'100%'}
        borderRadius={12}
        bg={colorMode === 'light' ? '#ffffff' : '#1A202C'}
      >
        <HStack py={0} px={4}>
          <AddShoppingCartRoundedIcon />
          <Text fontWeight={'bold'}>Add Item to Cart</Text>
        </HStack>

        <VStack h={'100%'} w={'100%'}>
          {/* Search Items Section */}
          <HStack px={4} w={'100%'}>
            <Input
              ref={searchItem}
              className={'inputBox'}
              onKeyUp={handleKeyUp}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              onFocus={e => e.target.select()}
              onChange={e => {
                setSearch(e.target.value);
              }}
              type={'text'}
              value={search}
              placeholder={'Search item by name or code'}
              w={'100%'}
              border={'1px solid'}
              borderRadius={'10px 0 0 10px'}
              style={{ borderColor: 'var(--p-500)' }}
              _focusVisible={{ border: '2px solid #4f6aa9' }}
            />
            <PrimaryButton
              label={'SCAN'}
              borderRadius={'0 10px 10px 0 !important'}
              ml={'0px !important'}
            />
          </HStack>

          {/* Items Header */}
          <HStack fontSize={'sm'} w={'100%'} py={2} pl={4} pr={6}>
            <Text fontWeight={'bold'} w={'30%'}>
              CODE
            </Text>
            <Text fontWeight={'bold'} w={'50%'}>
              ITEM
            </Text>
            <Text
              fontWeight={'bold'}
              w={'20%'}
              textAlign={'center'}
              ml={'0px !important'}
            >
              ACTION
            </Text>
          </HStack>

          {/* Items */}
          <VStack
            className="items"
            h="calc(100% - 110px)"
            w={'100%'}
            mt={'0px !important'}
            fontSize={'sm'}
            overflowY={'auto'}
            borderBottom={'1px solid'}
            borderTop={'1px solid'}
            // pb={2}
            style={{
              borderColor:
                colorMode === 'light' ? '#e1e1e1' : 'var(--dark-dim)',
            }}
          >
            {items.map((item, index) => {
              if (
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.code.includes(search)
              ) {
                return (
                  <HStack
                    id={index}
                    pl={4}
                    pr={6}
                    mt={'0px !important'}
                    w={'100%'}
                    alignItems={'flex-start'}
                    key={index}
                    py={2}
                    position={'relative'}
                    style={{
                      background:
                        index % 2 === 1
                          ? colorMode === 'light'
                            ? 'var(--light)'
                            : '#2d374895'
                          : '',
                    }}
                  >
                    {/* Item's Code */}
                    <Text w={'30%'} p={'4px 8px'}>
                      {item.code}
                    </Text>

                    {/* Item's Name */}
                    <VStack w={'50%'} alignItems={'flex-start'} pr={4}>
                      <Text fontWeight={'bold'}>{item.name}</Text>
                      <Text m={'0 !important'}>@ {item.price}</Text>
                    </VStack>

                    {/* Item Action */}
                    <VStack w={'20%'} className={'actionBtnSection'}>
                      {/* Counter Qty */}
                      <HStack>
                        <IconButton
                          m={'0 !important'}
                          size={'sm'}
                          variant={'ghost'}
                          icon={<RemoveRoundedIcon />}
                          borderRadius={50}
                          onClick={() => {
                            const itemQty = document.querySelector(
                              `#qty${item.code}`
                            );
                            if (parseInt(itemQty.value) > 1) {
                              itemQty.value = parseInt(itemQty.value) - 1;
                            }
                          }}
                        />

                        <Input
                          id={`qty${item.code}`}
                          m={'0 !important'}
                          w={'40px'}
                          h={'28px'}
                          type={'number'}
                          defaultValue={1}
                          onFocus={e => e.target.select()}
                          onChange={e => {
                            if (
                              e.target.value === '' ||
                              e.target.value === '0'
                            ) {
                              e.target.value = 1;
                            }
                          }}
                          _focusVisible={{ border: '1px solid #4f6aa9' }}
                          p={'0'}
                          border={'none'}
                          textAlign={'center'}
                        />

                        <IconButton
                          size={'sm'}
                          m={'0 !important'}
                          onClick={() => {
                            const itemQty = document.querySelector(
                              `#qty${item.code}`
                            );
                            itemQty.value = parseInt(itemQty.value) + 1;
                          }}
                          variant={'ghost'}
                          icon={<AddRoundedIcon />}
                          borderRadius={50}
                        />
                      </HStack>

                      {/* Add Button */}
                      <PrimaryButtonOutline
                        label={'ADD'}
                        w={'100%'}
                        onClick={() => {
                          const itemQty = parseInt(
                            document.querySelector(`#qty${item.code}`).value
                          );

                          addItemToCartList({
                            itemId: item.id,
                            itemCode: item.code,
                            itemName: item.name,
                            itemPrice: item.price,
                            itemQty: itemQty,
                          });
                          document.querySelector(`#qty${item.code}`).value = 1;

                          searchItem.current.select();
                        }}
                        size={'sm'}
                      />
                    </VStack>
                  </HStack>
                );
              }
              return null;
            })}
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Items;
