import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  IconButton,
  useColorMode,
  Text,
  VStack,
  HStack,
  Input,
  Icon,
  Avatar,
} from '@chakra-ui/react';

// MUI Icons
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

import '../css/vendereApp.css';
import { PrimaryButton, PrimaryButtonOutline } from './Buttons';
import { Search } from '@mui/icons-material';
import { SearchBox } from './Inputs';
import { Skeleton } from './Skeleton';

export default function Items({ items, search, setSearch, addItemToCartList }) {
  const { colorMode } = useColorMode();
  const searchItem = useRef(null);

  return (
    <VStack
      id="addItemToCart"
      h={'100%'}
      w={'50%'}
      alignItems={'flex-start'}
      py={2}
      borderRadius={12}
      style={{
        background: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-400)',
      }}
    >
      <HStack py={0} px={4}>
        <AddShoppingCartRoundedIcon />
        <Text fontWeight={'bold'}>Add Item to Cart</Text>
      </HStack>

      {/* Search Items Section */}
      <HStack px={3} w={'100%'} position={'relative'}>
        <SearchBox
          refq={searchItem}
          search={search}
          onChange={e => {
            setSearch(e.target.value);
          }}
        />
        {/* <PrimaryButton
          label={'SCAN'}
          ml={'0px !important'}
          borderRadius={'8px !important'}
          style={{
            position: 'absolute',
            right: '0',
          }}
        /> */}
      </HStack>

      {/* Items Section */}
      <VStack h={'calc(100% - 80px)'} w={'100%'}>
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
          h={'100%'}
          w={'100%'}
          mt={'0px !important'}
          fontSize={'sm'}
          overflowY={'auto'}
          borderTop={'1px solid'}
          borderBottom={'1px solid'}
          style={{
            borderColor:
              colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
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
                          : 'var(--dark)'
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
                          if (e.target.value === '' || e.target.value === '0') {
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
            } else {
              return null;
            }
          })}
        </VStack>
      </VStack>
    </VStack>
  );
}

const ItemsList = props => {
  const baseURL = 'http://localhost:8080';
  const { colorMode } = useColorMode();

  const [loading, setLoading] = useState(false);
  const skeletonLength = ['', '', '', '', '', '', '', '', '', ''];
  const [itemFound, setItemFound] = useState(true);

  //* GET DATA
  useEffect(() => {
    const token = Cookies.get('_auth');

    const getItemsAPI = `${baseURL}/api/v1/products`;

    setLoading(true);

    setTimeout(() => {
      axios
        .get(getItemsAPI, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => {
          // console.log(r.data.data);
          if (r.data.data) {
            console.log(r.data.data);
            props.setData(r.data.data);
          } else {
            props.setData([]);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(setLoading(false));
    }, 1000);
  }, [props.refresh]);

  useEffect(() => {
    if (props.data.length > 0) {
      props.selectItem({ index: 1, data: props.data });
    }
  }, [props.data]);

  useEffect(() => {
    let isItemFound = true;
    if (props.data.length !== 0) {
      isItemFound = props.data.some(item => {
        return (
          item.name.toLowerCase().includes(props.search.toLowerCase()) ||
          item.code.includes(props.search)
        );
      });
    }

    if (isItemFound) {
      setItemFound(true);
    } else {
      setItemFound(false);
      props.setSelectedItem({});
    }
  }, [props.search]);

  useEffect(() => {
    props.setItemIndex(1);
    props.selectItem({ index: 1 });
  }, [props.search, itemFound]);

  const ItemNotFound = () => {
    return (
      <VStack h={'100%'} justifyContent={'center'} opacity={0.2}>
        <Icon as={SearchOffOutlinedIcon} fontSize={'10rem'} />
        <Text fontSize={'x-large'} fontWeight={'bold'}>
          Item Not Found
        </Text>
      </VStack>
    );
  };

  if (!loading) {
    if (itemFound) {
      return (
        <VStack
          className="items"
          h={'100%'}
          w={'100%'}
          mt={'0px !important'}
          fontSize={'sm'}
          overflowY={'auto'}
          borderTop={'1px solid'}
          // borderBottom={'1px solid'}
          style={{
            borderColor:
              colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
          }}
        >
          {props.data.map((item, index) => {
            if (
              item.name.toLowerCase().includes(props.search.toLowerCase()) ||
              item.code.includes(props.search)
            ) {
              return (
                <HStack
                  id={'item' + index}
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
                          : 'var(--dark)'
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
                    <Text mt={'4px !important'}>
                      {item.price.toLocaleString()}
                    </Text>
                  </VStack>

                  {/* Item Action */}
                  <VStack
                    w={'20%'}
                    className={'actionBtnSection'}
                    alignSelf={'center'}
                  >
                    <Text
                      opacity={0.5}
                      size={'sm'}
                      cursor={'pointer'}
                      _hover={{ textDecoration: 'underline' }}
                      onClick={() => {
                        props.selectItem({ item: item });
                      }}
                    >
                      details
                    </Text>
                  </VStack>
                </HStack>
              );
            }
          })}
        </VStack>
      );
    } else {
      return <ItemNotFound />;
    }
  } else {
    return (
      <VStack className="skeleton">
        {skeletonLength.map((val, index) => {
          return <Skeleton key={index} h={'50px'} />;
        })}
      </VStack>
    );
  }
};

export { ItemsList };
