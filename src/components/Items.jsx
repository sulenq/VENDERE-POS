import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

// Chakra UI
import {
  IconButton,
  useColorMode,
  Text,
  VStack,
  HStack,
  Input,
  Icon,
  ButtonGroup,
  Modal,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Alert,
  AlertIcon,
  FormLabel,
  FormControl,
  Button,
} from '@chakra-ui/react';

// MUI Icons
import AddShoppingCartRoundedIcon from '@mui/icons-material/AddShoppingCartRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

import '../css/vendereApp.css';
import { PrimaryButton, PrimaryButtonOutline } from './Buttons';
import { Search } from '@mui/icons-material';
import { SearchBox } from './Inputs';
import { Skeleton } from './Skeleton';
import { ModalContent, ModalOverlay, ModalBody, ModalFooter } from './Modals';

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

//* Update Item
const UpdateItem = props => {
  const baseURL = 'http://localhost:8080';
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const [itemToUpdate, setItemToUpdate] = useState(
    JSON.parse(JSON.stringify(props.selectedItem))
  );
  useEffect(() => {
    setItemToUpdate(JSON.parse(JSON.stringify(props.selectedItem)));
  }, [props.selectedItem]);

  function onUpdate(e) {
    e.preventDefault();

    const token = Cookies.get('_auth');

    console.log('Updating item...');

    const updateProductAPI = new URL(
      `${baseURL}/api/v1/products/update?product_id=${itemToUpdate.ID}`
    );

    function updateSelectedItem() {
      console.log(itemToUpdate);
      axios
        .put(updateProductAPI, itemToUpdate, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          console.log(r);
          onClose();
          if (r.status === 200) {
            toast({
              position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
              title: 'Item Updated',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
          props.setRefresh(!props.refresh);
        })
        .catch(err => {
          console.log(err);
          if (err) {
            toast({
              position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
              title: 'Sorry, fail to update item.',
              // description: err.response.data.data.error,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
        });
    }

    updateSelectedItem();
  }

  return (
    <>
      <PrimaryButton w={'100%'} label={'Update Product'} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent
          content={
            <>
              <ModalHeader>
                <HStack>
                  <Icon
                    as={DriveFileRenameOutlineOutlinedIcon}
                    fontSize={'xx-large'}
                  />
                  <Text>Update Item</Text>
                </HStack>
              </ModalHeader>

              <ModalBody
                content={
                  <>
                    {/* <Alert
                      borderRadius={'8px'}
                      status="info"
                      variant={'left-accent'}
                      mb={5}
                    >
                      <AlertIcon alignSelf={'flex-start'} />
                      Items will be refreshed after you update item.
                    </Alert> */}

                    <form id="addNewItemForm">
                      <FormControl mt={4} isRequired>
                        <FormLabel>Item's Code</FormLabel>
                        <Input
                          placeholder="e.g 089696010947 or ndog123"
                          value={itemToUpdate.code}
                          onChange={e => {
                            setItemToUpdate({
                              ...itemToUpdate,
                              code: e.target.value,
                            });
                          }}
                        />
                      </FormControl>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Item's Name</FormLabel>
                        <Input
                          placeholder="e.g Telur 1kg"
                          value={itemToUpdate.name}
                          onChange={e => {
                            setItemToUpdate({
                              ...itemToUpdate,
                              name: e.target.value,
                            });
                          }}
                        />
                      </FormControl>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Supply</FormLabel>
                        <Input
                          onFocus={e => e.target.select()}
                          placeholder="e.g 24"
                          type={'number'}
                          min={1}
                          value={itemToUpdate.stock}
                          onChange={e => {
                            if (parseInt(e.target.value) > 1) {
                              setItemToUpdate({
                                ...itemToUpdate,
                                stock: parseInt(e.target.value),
                              });
                            } else {
                              setItemToUpdate({
                                ...itemToUpdate,
                                stock: 1,
                              });
                            }
                          }}
                        />
                      </FormControl>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Buy Price</FormLabel>
                        <Input
                          onFocus={e => e.target.select()}
                          placeholder="e.g 24"
                          type={'number'}
                          min={1}
                          value={itemToUpdate.modal}
                          onChange={e => {
                            if (parseInt(e.target.value) > 1) {
                              setItemToUpdate({
                                ...itemToUpdate,
                                modal: parseInt(e.target.value),
                              });
                            } else {
                              setItemToUpdate({
                                ...itemToUpdate,
                                modal: 1,
                              });
                            }
                          }}
                        />
                      </FormControl>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Sell Price</FormLabel>
                        <Input
                          onFocus={e => e.target.select()}
                          placeholder="e.g 24"
                          type={'number'}
                          min={1}
                          value={itemToUpdate.price}
                          onChange={e => {
                            if (parseInt(e.target.value) > 1) {
                              setItemToUpdate({
                                ...itemToUpdate,
                                price: parseInt(e.target.value),
                              });
                            } else {
                              setItemToUpdate({
                                ...itemToUpdate,
                                price: 1,
                              });
                            }
                          }}
                        />
                      </FormControl>
                    </form>
                  </>
                }
              />
              <ModalFooter
                content={
                  <>
                    <ButtonGroup alignSelf={'flex-end'}>
                      <Button
                        className="btn"
                        onClick={onClose}
                        variant={'ghost'}
                      >
                        Close
                      </Button>
                      <PrimaryButton label={'Update Item'} onClick={onUpdate} />
                    </ButtonGroup>
                  </>
                }
              />
            </>
          }
        />
      </Modal>
    </>
  );
};

//* Delete Item
const DeleteItem = props => {
  const baseURL = 'http://localhost:8080';
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  function onDelete(e) {
    e.preventDefault();

    const token = Cookies.get('_auth');

    console.log('Deleting item...');
    // console.log(registerData);
    // console.log(token);

    const deleteProductAPI = new URL(
      `${baseURL}/api/v1/products/delete?product_id=${props.selectedItem.ID}`
    );

    function deleteSelectedItem() {
      axios
        .delete(deleteProductAPI, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          console.log(r);
          onClose();
          if (r.status === 200) {
            console.log(r);
            toast({
              position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
              title: 'Item Deleted',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
          props.setRefresh(!props.refresh);
        })
        .catch(err => {
          console.log(err);
          if (err) {
            toast({
              position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
              title: 'Sorry, fail to delete item.',
              // description: err.response.data.data.error,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
        });
    }

    deleteSelectedItem();
  }

  return (
    <>
      <PrimaryButtonOutline
        w={'100%'}
        label={'Delete Product'}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent
          content={
            <>
              <ModalHeader>
                <HStack>
                  <Icon as={DeleteOutlineOutlinedIcon} fontSize={'xx-large'} />
                  <Text>Delete Item</Text>
                </HStack>
              </ModalHeader>

              <ModalBody
                content={
                  <>
                    <Alert
                      borderRadius={'8px'}
                      status="error"
                      variant={'left-accent'}
                      mb={5}
                    >
                      <AlertIcon alignSelf={'flex-start'} />
                      Make sure if you want to delete item, you cannot undo this
                      action.
                    </Alert>
                    <Text>Are you sure to delete the selected item? </Text>
                    <HStack w={'100%'}>
                      <Text w={'50px'}>Code</Text>
                      <Text fontWeight={'bold'}>
                        {props?.selectedItem?.code}
                      </Text>
                    </HStack>
                    <HStack w={'100%'}>
                      <Text w={'50px'}>Name</Text>
                      <Text fontWeight={'bold'}>
                        {props?.selectedItem?.name}
                      </Text>
                    </HStack>
                  </>
                }
              />

              <ModalFooter
                content={
                  <>
                    <ButtonGroup alignSelf={'flex-end'}>
                      <Button
                        className="btn"
                        onClick={onClose}
                        variant={'ghost'}
                      >
                        Close
                      </Button>
                      <PrimaryButton label={'Delete Item'} onClick={onDelete} />
                    </ButtonGroup>
                  </>
                }
              />
            </>
          }
        />
      </Modal>
    </>
  );
};

const ItemsList = props => {
  const baseURL = 'http://localhost:8080';
  const { colorMode } = useColorMode();
  const location = useLocation();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const [loading, setLoading] = useState(false);
  const skeletonLength = ['', '', '', '', '', '', '', '', '', '', '', ''];
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

  function onAdd(item) {
    props.selectItem({ item: item });
    // console.log(item);
    props.addItemToCartList({
      itemId: item.ID,
      itemCode: item.code,
      itemName: item.name,
      itemPrice: item.price,
      itemQty: 1,
      itemModal: item.modal,
    });
  }

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
                          : 'var(--p-400)'
                        : null,
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
                    {location.pathname === '/vendere-app/cashier' && (
                      <>
                        <PrimaryButtonOutline
                          label={'ADD'}
                          size={'sm'}
                          onClick={() => {
                            onAdd(item);
                          }}
                        />
                        <ItemDetailsModal
                          selectItem={props.selectItem}
                          item={item}
                          selectedItem={props.selectedItem}
                          refresh={props.refresh}
                          setRefresh={props.setRefresh}
                        />
                      </>
                    )}

                    {location.pathname === '/vendere-app/manageproducts' ? (
                      screenWidth <= 1000 ? (
                        <ItemDetailsModal
                          selectItem={props.selectItem}
                          item={item}
                          selectedItem={props.selectedItem}
                          refresh={props.refresh}
                          setRefresh={props.setRefresh}
                        />
                      ) : (
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
                      )
                    ) : null}
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

const ItemDetails = props => {
  const selectedItem = props.selectedItem;
  const { colorMode } = useColorMode();
  const location = useLocation();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  return (
    <VStack
      style={{
        width:
          screenWidth <= 1000
            ? '100%'
            : location.pathname === '/vendere-app/cashier'
            ? '100%'
            : '50%',
        height: '100%',
        overflowY: 'auto',
        borderRadius: '12px',
        background: colorMode === 'light' ? 'white' : 'var(--dark)',
      }}
      pt={3}
    >
      <HStack alignSelf={'flex-start'} px={3} mb={2} opacity={0.5}>
        <Icon as={InfoOutlinedIcon} />
        <Text fontWeight={'bold'}>Product Details</Text>
      </HStack>

      <VStack
        id={'itemDetails'}
        h={selectedItem.ID ? 'calc(100% - 96px)' : '100%'}
        w={'100%'}
        mt={'0px !important'}
        fontSize={'sm'}
        overflowY={'auto'}
      >
        {/* item detail IMG */}
        <VStack px={3} w={'100%'} mb={2}>
          <VStack
            p={4}
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
        <VStack w={'100%'} pb={2}>
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
            <Text w={'calc(100% - 150px)'}>{selectedItem?.code}</Text>
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
            <Text w={'calc(100% - 150px)'}>{selectedItem?.name}</Text>
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
            <Text w={'calc(100% - 150px)'}>
              {selectedItem?.modal?.toLocaleString()}
            </Text>
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
            <Text w={'calc(100% - 150px)'}>
              {selectedItem?.price?.toLocaleString()}
            </Text>
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
            <Text w={'calc(100% - 150px)'}>
              {selectedItem?.stock?.toLocaleString()}
            </Text>
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
            <Text w={'calc(100% - 150px)'}>{selectedItem?.user_id}</Text>
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
            <Text w={'calc(100% - 150px)'}>{selectedItem?.CreatedAt}</Text>
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
            <Text w={'calc(100% - 150px)'}>{selectedItem?.UpdatedAt}</Text>
          </HStack>
        </VStack>
      </VStack>

      {selectedItem.ID && (
        <HStack
          w={'100%'}
          mt={'0px !important'}
          fontSize={'sm'}
          overflowY={'auto'}
          borderRadius={'0 0 12px 12px'}
          justifyContent={'center'}
          style={{
            borderColor:
              colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
          }}
          // bg={'var(--p-500)'}
          // py={3}
          // borderTop={'1px solid'}
          // borderBottom={'1px solid'}
        >
          <ButtonGroup p={3} w={'100%'} isAttached>
            <UpdateItem
              selectedItem={selectedItem}
              refresh={props.refresh}
              setRefresh={props.setRefresh}
            />
            <DeleteItem
              selectedItem={selectedItem}
              refresh={props.refresh}
              setRefresh={props.setRefresh}
            />
          </ButtonGroup>
        </HStack>
      )}
    </VStack>
  );
};

const ItemDetailsModal = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text
        opacity={0.5}
        size={'sm'}
        cursor={'pointer'}
        _hover={{ textDecoration: 'underline' }}
        onClick={() => {
          props.selectItem({ item: props.item });
          onOpen();
        }}
      >
        details
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent
          h={'95%'}
          content={
            <>
              <ModalCloseButton borderRadius={50} />

              <ModalBody
                content={
                  <>
                    <ItemDetails
                      selectedItem={props.selectedItem}
                      refresh={props.refresh}
                      setRefresh={props.setRefresh}
                    />
                  </>
                }
                px={0}
                py={0}
                pb={'0px'}
                h={'100%'}
              />
            </>
          }
        />
      </Modal>
    </>
  );
};

const TransactionDetails = props => {
  const baseURL = 'http://localhost:8080';
  const { colorMode } = useColorMode();
  const location = useLocation();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const [loading, setLoading] = useState(false);
  const skeletonLength = ['', '', '', '', '', '', '', '', '', '', '', ''];
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
                    {location.pathname === '/vendere-app/manageproducts' ? (
                      screenWidth <= 1000 ? (
                        <ItemDetailsModal
                          selectItem={props.selectItem}
                          item={item}
                          selectedItem={props.selectedItem}
                          refresh={props.refresh}
                          setRefresh={props.setRefresh}
                        />
                      ) : (
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
                      )
                    ) : null}
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

export { ItemsList, ItemDetails };
