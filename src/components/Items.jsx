import { useState, useEffect, useRef } from 'react';
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

const Items = (
  items,
  cartList,
  setCartList,
  total,
  setTotal,
  pay,
  setPay,
  change,
  setChange,
  search,
  setSearch,
  setInvoice,
  addItemToCartList
) => {
  {
    const { colorMode } = useColorMode();
    const searchItem = useRef(null);

    return (
      <div className="items">
        <div className="wrapper">Items List</div>
        <Box
          py={4}
          h={'95%'}
          w={'95%'}
          m={'auto !important'}
          borderRadius={12}
          bg={colorMode === 'light' ? '#ffffff' : '#1A202C95'}
        >
          <ModalHeader py={0} px={4} mb={4}>
            <HStack>
              <AddShoppingCartRoundedIcon />
              <Text fontWeight={'bold'}>Add Item to Cart</Text>
            </HStack>
          </ModalHeader>

          <ModalCloseButton borderRadius={50} />

          <ModalBody p={0} h={'95%'} display={'flex'} flexDirection={'column'}>
            {/* Search Items Section */}
            <HStack px={4}>
              <Input
                ref={searchItem}
                className={'inputBox'}
                onFocus={e => e.target.select()}
                onChange={e => setSearch(e.target.value)}
                type={'text'}
                value={search}
                placeholder={'Search item by name or code'}
                w={'100%'}
                borderRadius={'10px 0 0 10px'}
                _focusVisible={{ border: '2px solid #4f6aa9' }}
              />
              <PrimaryButton
                label={'SCAN'}
                borderRadius={'0 10px 10px 0 !important'}
                ml={'0px !important'}
              />
            </HStack>

            {/* Items */}
            <HStack
              fontSize={'sm'}
              w={'100%'}
              mt={2}
              py={2}
              px={5}
              borderBottom={'1px solid'}
              style={{ borderColor: '#e1e1e1' }}
            >
              <Text fontWeight={'bold'} w={'30%'}>
                CODE
              </Text>
              <Text fontWeight={'bold'} w={'40%'}>
                ITEM
              </Text>
              <Text fontWeight={'bold'} w={'30%'} textAlign={'center'}>
                ACTION
              </Text>
            </HStack>

            <Box className="items" fontSize={'sm'} overflowY={'auto'}>
              {items.map((item, index) => {
                if (
                  item.name.toLowerCase().includes(search.toLowerCase()) ||
                  item.code.includes(search)
                ) {
                  return (
                    <HStack
                      px={4}
                      alignItems={'flex-start'}
                      key={index}
                      py={2}
                      style={{
                        background:
                          index % 2 === 1
                            ? colorMode === 'light'
                              ? 'var(--light)'
                              : '#2d374895'
                            : '',
                      }}
                    >
                      <Text w={'30%'} p={'4px 8px'}>
                        item code
                      </Text>

                      <VStack w={'40%'} alignItems={'flex-start'}>
                        <Text>{item.name}</Text>
                        <Text w={'40%'} m={'0 !important'}>
                          @ {item.price}
                        </Text>
                      </VStack>

                      <VStack pr={2}>
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
          </ModalBody>
        </Box>
      </div>
    );
  }
};

export default Items;
