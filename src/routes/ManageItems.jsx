import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import {
  VStack,
  HStack,
  Text,
  useColorMode,
  Icon,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';

// MUI Icons
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';

import ResponsiveNav from '../components/ResponsiveNav';
import { SearchBox } from '../components/Inputs';
import { PrimaryButton, PrimaryButtonOutline } from '../components/Buttons';

export default function ManageItems(props) {
  const baseURL = 'http://localhost:8080';

  //* get items if refreshed
  useEffect(() => {
    const token = Cookies.get('_auth');

    // console.log(props.items);

    const createItemsAPI = `${baseURL}/api/v1/create`;
    const getItemsAPI = `${baseURL}/api/v1/products`;
    const updateItemsAPI = `${baseURL}/api/v1/products/update`;
    const deleteItemsAPI = `${baseURL}/api/v1/products/delete`;

    if (props.items.length === 0) {
      axios
        .get(getItemsAPI, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => {
          // console.log(r.data.data);
          props.setItems(r.data.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(props.items).length !== 0) {
      selectItem(1);
    }
  }, [props.items]);

  const dateOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const { colorMode } = useColorMode();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
  });

  function selectItem(itemIndex) {
    // console.log(itemIndex);

    const selectedItemCode = document.querySelector(
      `.items > :nth-child(${itemIndex}) p`
    )?.textContent;

    // console.log(selectedItemCode);

    const selectedItem = props.items.find(item => {
      return item.code === selectedItemCode;
    });

    const CreatedAt = new Date(selectedItem.CreatedAt);

    const UpdatedAt = new Date(selectedItem.UpdatedAt);

    const DeletedAt = new Date(selectedItem.DeletedAt);

    const formattedCreatedAt = CreatedAt.toLocaleDateString(
      undefined,
      dateOptions
    );

    const formattedUpdatedAt = UpdatedAt.toLocaleDateString(
      undefined,
      dateOptions
    );

    const formattedDeletedAt = DeletedAt.toLocaleDateString(
      undefined,
      dateOptions
    );

    const selectedItemToSet = {
      ...selectedItem,
      CreatedAt: formattedCreatedAt,
      UpdatedAt: formattedUpdatedAt,
      DeletedAt: formattedDeletedAt,
    };

    const keys = Object.keys(selectedItemToSet);
    setSelectedItem({ ...selectedItemToSet, keys: keys });
    // console.log(keys);
    // console.log(selectedItemCode);
    // console.log({ ...selectedItemToSet, keys: keys });
  }

  const [search, setSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState({});
  const [itemIndex, setItemIndex] = useState(1);
  const [itemsLength, setItemsLength] = useState(0);

  //* Keydown event (arrow up & down) focus to searchBox
  document.documentElement.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!screenWidth <= 1000) {
        const itemSearchBox = document.querySelector('#itemSearchBox');
        itemSearchBox.focus();
      }
    }
  });

  return (
    <HStack
      className="vendereApp"
      p={screenWidth <= 1000 ? 0 : 4}
      alignItems={'center'}
    >
      <ResponsiveNav active={'ManageItems'} />

      <HStack
        id="appContentWrapper"
        ml={'0px !important'}
        style={{
          background:
            colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-400)',
          borderRadius: screenWidth <= 1000 ? 0 : '12px',
          width: screenWidth <= 1000 ? '100%' : 'calc(100% - 200px)',
          padding: 8,
          height: '100%',
          alignItems: 'flex-start',
        }}
      >
        {/* Items Section */}
        <VStack
          style={{
            width: screenWidth >= 1500 ? '70%' : '60%',
            height: '100%',
            overflowY: 'auto',
            paddingBottom: screenWidth <= 1000 ? '64px' : '',
            borderRadius: '12px',
            background: colorMode === 'light' ? 'white' : 'var(--dark)',
          }}
          py={3}
        >
          <HStack
            alignSelf={'flex-start'}
            px={3}
            w={'100%'}
            justifyContent={'space-between'}
            mb={1}
          >
            <HStack opacity={0.5}>
              <Icon as={Inventory2OutlinedIcon} />
              <Text fontWeight={'bold'}>All Items</Text>
            </HStack>
            <PrimaryButton
              leftIcon={AddOutlinedIcon}
              label={'Add New'}
              size={'sm'}
            />
          </HStack>

          {/* Search Box */}
          <HStack px={3} w={'100%'}>
            <SearchBox
              search={search}
              itemsLength={itemsLength}
              setItemsLength={setItemsLength}
              itemIndex={itemIndex}
              setItemIndex={setItemIndex}
              selectItem={selectItem}
              onChange={e => {
                setSearch(e.target.value);
              }}
            />
          </HStack>

          {/* Heading */}
          <HStack fontSize={'sm'} w={'100%'} py={2} pl={4} pr={6}>
            <Text fontWeight={'bold'} w={'30%'}>
              CODE
            </Text>
            <Text fontWeight={'bold'} w={'50%'}>
              ITEM
            </Text>
            <Text
              fontWeight={'bold'}
              w={'21%'}
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
            {props.items.map((item, index) => {
              if (
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.code.includes(search)
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
                      <Text m={'0 !important'}>@ {item.price}</Text>
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
                          setItemIndex(index + 1);
                          selectItem(index + 1);
                        }}
                      >
                        details
                      </Text>
                    </VStack>
                  </HStack>
                );
              } else {
                return null;
              }
            })}
          </VStack>
        </VStack>

        {/* Item Details */}
        <VStack
          style={{
            width: screenWidth >= 1500 ? '70%' : '60%',
            height: '100%',
            overflowY: 'auto',
            paddingBottom: screenWidth <= 1000 ? '64px' : '',
            borderRadius: '12px',
            background: colorMode === 'light' ? 'white' : 'var(--dark)',
          }}
          pt={3}
        >
          <HStack alignSelf={'flex-start'} px={3} mb={2} opacity={0.5}>
            <Icon as={InfoOutlinedIcon} />
            <Text fontWeight={'bold'}>Item Details</Text>
          </HStack>

          <VStack
            id={'itemDetails'}
            h={selectedItem.ID ? 'calc(100% - 96px)' : '100%'}
            w={'100%'}
            mt={'0px !important'}
            fontSize={'sm'}
            overflowY={'auto'}
            pb={3}
          >
            {/* item detail IMG */}
            <VStack px={3} w={'100%'} mb={2}>
              <VStack
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  aspectRatio: 3 / 2,
                  fontWeight: 'bold',
                  opacity: 0.2,
                  // borderRadius: '12px',
                  background:
                    colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300)',
                  borderRadius: '8px',
                }}
              >
                <Icon fontSize={'12rem'} as={ImageNotSupportedOutlinedIcon} />
                <Text fontSize={'xx-large'}>Coming Soon!</Text>
              </VStack>
            </VStack>

            {/* item detail data */}
            <VStack w={'100%'}>
              <HStack
                px={5}
                pb={2}
                w={'100%'}
                alignItems={'flex-start'}
                borderBottom={'1px solid'}
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
                }}
              >
                <Text w={'150px'}>Code</Text>
                <Text>{selectedItem?.code}</Text>
              </HStack>

              <HStack
                px={5}
                pb={2}
                w={'100%'}
                alignItems={'flex-start'}
                borderBottom={'1px solid'}
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
                }}
              >
                <Text w={'150px'}>Name</Text>
                <Text>{selectedItem?.name}</Text>
              </HStack>

              <HStack
                px={5}
                pb={2}
                w={'100%'}
                alignItems={'flex-start'}
                borderBottom={'1px solid'}
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
                }}
              >
                <Text w={'150px'}>Buy Price</Text>
                <Text>{selectedItem?.modal}</Text>
              </HStack>

              <HStack
                px={5}
                pb={2}
                w={'100%'}
                alignItems={'flex-start'}
                borderBottom={'1px solid'}
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
                }}
              >
                <Text w={'150px'}>Sell Price</Text>
                <Text>{selectedItem?.price}</Text>
              </HStack>

              <HStack
                px={5}
                pb={2}
                w={'100%'}
                alignItems={'flex-start'}
                borderBottom={'1px solid'}
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
                }}
              >
                <Text w={'150px'}>Supply</Text>
                <Text>{selectedItem?.stock}</Text>
              </HStack>

              <HStack
                px={5}
                pb={2}
                w={'100%'}
                alignItems={'flex-start'}
                borderBottom={'1px solid'}
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
                }}
              >
                <Text w={'150px'}>Created By (ID)</Text>
                <Text>{selectedItem?.user_id}</Text>
              </HStack>

              <HStack
                px={5}
                pb={2}
                w={'100%'}
                alignItems={'flex-start'}
                borderBottom={'1px solid'}
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
                }}
              >
                <Text w={'150px'}>Created At</Text>
                <Text>{selectedItem?.CreatedAt}</Text>
              </HStack>

              <HStack
                px={5}
                pb={2}
                w={'100%'}
                alignItems={'flex-start'}
                borderBottom={'1px solid'}
                style={{
                  borderColor:
                    colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
                }}
              >
                <Text w={'150px'}>Updated At</Text>
                <Text>{selectedItem?.UpdatedAt}</Text>
              </HStack>
            </VStack>
          </VStack>

          {selectedItem.ID && (
            <HStack
              w={'100%'}
              mt={'0px !important'}
              fontSize={'sm'}
              overflowY={'auto'}
              // bg={'var(--p-500)'}
              borderRadius={'0 0 12px 12px'}
              // py={3}
              // borderTop={'1px solid'}
              // borderBottom={'1px solid'}
              justifyContent={'center'}
              style={{
                borderColor:
                  colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
              }}
            >
              <ButtonGroup p={3} w={'100%'} isAttached>
                <PrimaryButton w={'100%'} label="Update Data" />
                <PrimaryButtonOutline w={'100%'} label={'Delete Item'} />
              </ButtonGroup>
            </HStack>
          )}
        </VStack>
      </HStack>
    </HStack>
  );
}
