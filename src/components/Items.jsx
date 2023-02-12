import { useState, useEffect, useRef, useMemo } from 'react';
import {
  IconButton,
  Icon,
  useColorMode,
  Text,
  VStack,
  HStack,
  Button,
  ButtonGroup,
  Box,
  Divider,
  Input,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react';
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import RemoveShoppingCartRoundedIcon from '@mui/icons-material/RemoveShoppingCartRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

import '../css/vendereApp.css';
import { ColorModeIconButton } from './ColorModeSwitcher';
import { PrimaryButton, PrimaryButtonOutline } from './Buttons';

const Items = ({ items, search, setSearch, addItemToCartList }) => {
  {
    const { colorMode } = useColorMode();
    const searchItem = useRef(null);

    const [itemIndex, setItemIndex] = useState(1);
    const [itemsLength, setItemLength] = useState(0);

    useEffect(() => {
      setItemIndex(1);
      const targetItem = document.querySelector(
        `.items > :nth-child(${itemIndex})`
      );
      const items = document.querySelectorAll('.items > div');

      setItemLength(items.length);

      items.forEach(item => {
        item.classList.remove('itemSelected');
      });
      if (targetItem) {
        targetItem.classList.add('itemSelected');
      }
      console.log(itemIndex);
    }, [search]);

    useEffect(() => {
      const targetItem = document.querySelector(
        `.items > :nth-child(${itemIndex})`
      );
      const items = document.querySelectorAll('.items > div');

      setItemLength(items.length);

      items.forEach(item => {
        item.classList.remove('itemSelected');
      });
      if (targetItem) {
        targetItem.classList.add('itemSelected');
      }
      console.log(itemIndex);
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
      <Box h={'100%'} w={'50%'}>
        <Box
          py={4}
          w={'100%'}
          h={'100%'}
          borderRadius={12}
          bg={colorMode === 'light' ? '#ffffff' : '#1A202C'}
        >
          <Box py={0} px={4} mb={4}>
            <HStack>
              <AddShoppingCartRoundedIcon />
              <Text fontWeight={'bold'}>Add Item to Cart</Text>
            </HStack>
          </Box>

          <Box p={0} h={'95%'} display={'flex'} flexDirection={'column'}>
            {/* Search Items Section */}
            <HStack px={4}>
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
            <HStack
              fontSize={'sm'}
              w={'100%'}
              mt={2}
              py={2}
              px={5}
              borderBottom={'1px solid'}
              style={{
                borderColor:
                  colorMode === 'light' ? '#e1e1e1' : 'var(--dark-dim)',
              }}
            >
              <Text fontWeight={'bold'} w={'40%'}>
                CODE
              </Text>
              <Text fontWeight={'bold'} w={'40%'}>
                ITEM
              </Text>
              <Text fontWeight={'bold'} w={'27%'} textAlign={'center'}>
                ACTION
              </Text>
            </HStack>

            {/* Items */}
            <Box className="items" fontSize={'sm'} overflowY={'auto'}>
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
                      <Text w={'40%'} p={'4px 8px'}>
                        {item.code}
                      </Text>

                      <VStack w={'40%'} alignItems={'flex-start'} pr={4}>
                        <Text fontWeight={'bold'}>{item.name}</Text>
                        <Text m={'0 !important'}>@ {item.price}</Text>
                      </VStack>

                      <VStack pr={2} w={'20%'} className={'actionBtnSection'}>
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

                            addItemToCartList(
                              item.code,
                              item.name,
                              item.price,
                              itemQty
                            );
                            document.querySelector(
                              `#qty${item.code}`
                            ).value = 1;

                            searchItem.current.select();
                          }}
                          size={'sm'}
                        />
                      </VStack>
                    </HStack>
                  );
                }
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
};

export default Items;
