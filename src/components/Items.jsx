import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useAuthUser, useSignOut } from 'react-auth-kit';

// Chakra UI
import {
  IconButton,
  useColorMode,
  Text,
  VStack,
  HStack,
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
  Badge,
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
import LayersClearOutlinedIcon from '@mui/icons-material/LayersClearOutlined';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

import '../css/vendereApp.css';
import { PrimaryButton, PrimaryButtonOutline } from './Buttons';
import { MoneyOff, PeopleAltOutlined, Search } from '@mui/icons-material';
import { SearchBox, Input } from './Inputs';
import { Skeleton } from './Skeleton';
import { ModalContent, ModalOverlay, ModalBody, ModalFooter } from './Modals';

// export default function Items({ items, search, setSearch, addItemToCartList }) {
//   const { colorMode } = useColorMode();
//   const searchItem = useRef(null);

//   return (
//     <VStack
//       id="addItemToCart"
//       h={'100%'}
//       w={'50%'}
//       alignItems={'flex-start'}
//       py={2}
//       borderRadius={12}
//       style={{
//         background: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-400)',
//       }}
//     >
//       <HStack py={0} px={4}>
//         <AddShoppingCartRoundedIcon />
//         <Text fontWeight={'bold'}>Add Item to Cart</Text>
//       </HStack>

//       {/* Search Items Section */}
//       <HStack px={3} w={'100%'} position={'relative'}>
//         <SearchBox
//           refq={searchItem}
//           search={search}
//           onChange={e => {
//             setSearch(e.target.value);
//           }}
//         />
//         {/* <PrimaryButton
//           label={'SCAN'}
//           ml={'0px !important'}
//           borderRadius={'8px !important'}
//           style={{
//             position: 'absolute',
//             right: '0',
//           }}
//         /> */}
//       </HStack>

//       {/* Items Section */}
//       <VStack h={'calc(100% - 80px)'} w={'100%'}>
//         {/* Items Header */}
//         <HStack fontSize={'sm'} w={'100%'} py={2} pl={4} pr={6}>
//           <Text fontWeight={'bold'} w={'30%'}>
//             CODE
//           </Text>
//           <Text fontWeight={'bold'} w={'50%'}>
//             ITEM
//           </Text>
//           <Text
//             fontWeight={'bold'}
//             w={'20%'}
//             textAlign={'center'}
//             ml={'0px !important'}
//           >
//             ACTION
//           </Text>
//         </HStack>

//         {/* Items */}
//         <VStack
//           className="items"
//           h={'100%'}
//           w={'100%'}
//           mt={'0px !important'}
//           fontSize={'sm'}
//           overflowY={'auto'}
//           borderTop={'1px solid'}
//           borderBottom={'1px solid'}
//           style={{
//             borderColor:
//               colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
//           }}
//         >
//           {items.map((item, index) => {
//             if (
//               item.name.toLowerCase().includes(search.toLowerCase()) ||
//               item.code.includes(search)
//             ) {
//               return (
//                 <HStack
//                   id={index}
//                   pl={4}
//                   pr={6}
//                   mt={'0px !important'}
//                   w={'100%'}
//                   alignItems={'flex-start'}
//                   key={index}
//                   py={2}
//                   position={'relative'}
//                   style={{
//                     background:
//                       index % 2 === 1
//                         ? colorMode === 'light'
//                           ? 'var(--light)'
//                           : 'var(--dark)'
//                         : '',
//                   }}
//                 >
//                   {/* Item's Code */}
//                   <Text w={'30%'} p={'4px 8px'}>
//                     {item.code}
//                   </Text>

//                   {/* Item's Name */}
//                   <VStack w={'50%'} alignItems={'flex-start'} pr={4}>
//                     <Text fontWeight={'bold'}>{item.name}</Text>
//                     <Text m={'0 !important'}>@ {item.price}</Text>
//                   </VStack>

//                   {/* Item Action */}
//                   <VStack w={'20%'} className={'actionBtnSection'}>
//                     {/* Counter Qty */}
//                     <HStack>
//                       <IconButton
//                         m={'0 !important'}
//                         size={'sm'}
//                         variant={'ghost'}
//                         icon={<RemoveRoundedIcon />}
//                         borderRadius={50}
//                         onClick={() => {
//                           const itemQty = document.querySelector(
//                             `#qty${item.code}`
//                           );
//                           if (parseInt(itemQty.value) > 1) {
//                             itemQty.value = parseInt(itemQty.value) - 1;
//                           }
//                         }}
//                       />

//                       <Input
//                         id={`qty${item.code}`}
//                         m={'0 !important'}
//                         w={'40px'}
//                         h={'28px'}
//                         type={'number'}
//                         defaultValue={1}
//                         onFocus={e => e.target.select()}
//                         onChange={e => {
//                           if (e.target.value === '' || e.target.value === '0') {
//                             e.target.value = 1;
//                           }
//                         }}
//                         _focusVisible={{ border: '1px solid #4f6aa9' }}
//                         p={'0'}
//                         border={'none'}
//                         textAlign={'center'}
//                       />

//                       <IconButton
//                         size={'sm'}
//                         m={'0 !important'}
//                         onClick={() => {
//                           const itemQty = document.querySelector(
//                             `#qty${item.code}`
//                           );
//                           itemQty.value = parseInt(itemQty.value) + 1;
//                         }}
//                         variant={'ghost'}
//                         icon={<AddRoundedIcon />}
//                         borderRadius={50}
//                       />
//                     </HStack>

//                     {/* Add Button */}
//                     <PrimaryButtonOutline
//                       label={'ADD'}
//                       w={'100%'}
//                       onClick={() => {
//                         const itemQty = parseInt(
//                           document.querySelector(`#qty${item.code}`).value
//                         );

//                         addItemToCartList({
//                           itemId: item.id,
//                           itemCode: item.code,
//                           itemName: item.name,
//                           itemPrice: item.price,
//                           itemQty: itemQty,
//                         });
//                         document.querySelector(`#qty${item.code}`).value = 1;

//                         searchItem.current.select();
//                       }}
//                       size={'sm'}
//                     />
//                   </VStack>
//                 </HStack>
//               );
//             } else {
//               return null;
//             }
//           })}
//         </VStack>
//       </VStack>
//     </VStack>
//   );
// }

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
  const [loading, setLoading] = useState(false);
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
          props.setSelectedItem({});
          props.setRefresh(!props.refresh);
          setLoading(false);
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
            setLoading(false);
          }
        });
    }

    setLoading(true);
    setTimeout(() => {
      updateSelectedItem();
    }, 1000);
  }

  return (
    <>
      <PrimaryButton w={'100%'} label={'Update Product'} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent
          content={
            <>
              <ModalHeader px={4}>
                <HStack>
                  <Icon
                    as={DriveFileRenameOutlineOutlinedIcon}
                    fontSize={'xx-large'}
                  />
                  <Text>Update Product</Text>
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
                          placeholder="e.g 086496010947 or ndog123"
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
                      <PrimaryButton
                        label={'Update Product'}
                        isLoading={loading}
                        onClick={onUpdate}
                      />
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

const DeleteItem = props => {
  // console.log(props.setSelectedItem);
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

  const [loading, setLoading] = useState();

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
          props.setSelectedItem({});
          props.setRefresh(!props.refresh);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
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
          setLoading(false);
        });
    }

    setLoading(true);
    setTimeout(() => {
      deleteSelectedItem();
    }, 1000);
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
              <ModalHeader px={4}>
                <HStack>
                  <Icon as={DeleteOutlineOutlinedIcon} fontSize={'xx-large'} />
                  <Text>Delete Product</Text>
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
                      Make sure if you want to delete product, you cannot undo
                      this action.
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
                      <PrimaryButton
                        label={'Delete Product'}
                        isLoading={loading}
                        onClick={onDelete}
                      />
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
    }, 300);
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
          Product Not Found
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
                  key={index}
                  id={'item' + index}
                  pl={4}
                  pr={6}
                  mt={'0px !important'}
                  w={'100%'}
                  alignItems={'flex-start'}
                  py={2}
                  position={'relative'}
                  style={{
                    background:
                      index % 2 === 1
                        ? colorMode === 'light'
                          ? 'var(--light)'
                          : 'var(--dark)'
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
                      {'@ ' + item.price.toLocaleString()}
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
                          setSelectedItem={props.setSelectedItem}
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
                          setSelectedItem={props.setSelectedItem}
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
          return <Skeleton key={index} h={'100px'} />;
        })}
      </VStack>
    );
  }
};

const ItemDetails = props => {
  const selectedItem = props.selectedItem;
  const auth = useAuthUser();
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
        background: colorMode === 'light' ? 'white' : 'var(--p-400a)',
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
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Code
            </Text>
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
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Name
            </Text>
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
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Buy Price
            </Text>
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
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Sell Price
            </Text>
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
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Supply
            </Text>
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
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Created By (ID)
            </Text>
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
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Created At
            </Text>
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
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Updated At
            </Text>
            <Text w={'calc(100% - 150px)'}>{selectedItem?.UpdatedAt}</Text>
          </HStack>
        </VStack>
      </VStack>

      <HStack
        w={'100%'}
        mt={'0px !important'}
        p={3}
        fontSize={'sm'}
        overflowY={'auto'}
        borderRadius={'0 0 12px 12px'}
        justifyContent={'center'}
        style={{
          borderColor:
            colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
        }}
      >
        {selectedItem.ID && auth().userRole === 'admin' ? (
          <ButtonGroup w={'100%'} isAttached>
            <UpdateItem
              selectedItem={selectedItem}
              setSelectedItem={props.setSelectedItem}
              refresh={props.refresh}
              setRefresh={props.setRefresh}
            />
            <DeleteItem
              selectedItem={selectedItem}
              setSelectedItem={props.setSelectedItem}
              refresh={props.refresh}
              setRefresh={props.setRefresh}
            />
          </ButtonGroup>
        ) : (
          selectedItem.ID && (
            <PrimaryButton
              label={'Got It'}
              w={'100%'}
              onClick={props.onClose}
            />
          )
        )}
      </HStack>
    </VStack>
  );
};

const ItemDetailsModal = props => {
  // console.log(props);
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
          content={
            <>
              <ModalBody
                content={
                  <>
                    <ModalCloseButton borderRadius={50} />

                    <ItemDetails
                      setSelectedItem={props.setSelectedItem}
                      selectedItem={props.selectedItem}
                      refresh={props.refresh}
                      setRefresh={props.setRefresh}
                      onClose={onClose}
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

const TransactionsList = props => {
  const baseURL = 'http://localhost:8080';
  const { colorMode } = useColorMode();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const auth = useAuthUser();
  const [loading, setLoading] = useState(false);
  const skeletonLength = ['', '', '', '', '', '', '', '', '', '', '', ''];
  const [itemFound, setItemFound] = useState(true);

  //* GET DATA
  useEffect(() => {
    const token = Cookies.get('_auth');

    let getTransactionsAPI;
    if (auth().userRole === 'admin') {
      getTransactionsAPI = `${baseURL}/api/v1/transactions/admin`;
    } else if (auth().userRole === 'cashier') {
      getTransactionsAPI = `${baseURL}/api/v1/transactions/cashier`;
    }
    setLoading(true);

    setTimeout(() => {
      axios
        .get(getTransactionsAPI, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          // console.log(r.data.data);
          if (r.data.data) {
            props.setData(r.data.data);
          } else {
            props.setData([]);
          }
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }, 300);
  }, [props.refresh]);

  useEffect(() => {
    if (props.data?.length > 0) {
      props.selectItem({ index: 1 });
    }
  }, [props.data]);

  useEffect(() => {
    let isItemFound = true;
    if (props.data?.length !== 0) {
      isItemFound = props.data?.some(item => {
        return item.ID.toString()?.includes(props.search);
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
          Transaction Not Found
        </Text>
      </VStack>
    );
  };

  const dateOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
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
          style={{
            borderColor:
              colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
          }}
        >
          {props.data?.map((item, index) => {
            // console.log(item);
            const date = new Date(item.CreatedAt);
            const formattedDate = date.toLocaleDateString(
              undefined,
              dateOptions
            );

            if (item?.ID?.toString().includes(props.search)) {
              return (
                <HStack
                  key={index}
                  id={'item' + index}
                  pl={4}
                  pr={6}
                  mt={'0px !important'}
                  w={'100%'}
                  alignItems={'flex-start'}
                  py={2}
                  position={'relative'}
                  style={{
                    background:
                      index % 2 === 1
                        ? colorMode === 'light'
                          ? 'var(--light)'
                          : 'var(--dark)'
                        : null,
                  }}
                >
                  {/* Item's ID */}
                  <Text w={'25%'} p={'4px 8px'}>
                    {item?.ID}
                  </Text>

                  {/* Item's Status */}
                  <VStack w={'58%'} alignItems={'flex-start'} pr={4}>
                    <Text mt={'4px !important'}>{formattedDate}</Text>
                    <Badge
                      fontWeight={'bold'}
                      colorScheme={item.status === 'lunas' ? 'green' : 'red'}
                    >
                      {item?.status}
                    </Badge>
                  </VStack>

                  {/* Item Action */}
                  <VStack
                    w={'20%'}
                    className={'actionBtnSection'}
                    alignSelf={'center'}
                  >
                    {screenWidth <= 1000 ? (
                      <TransactionDetailsModal
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
                    )}
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
          return <Skeleton key={index} h={'100px'} />;
        })}
      </VStack>
    );
  }
};

const TransactionDetails = props => {
  // console.log(props.selectedItem);
  const { colorMode } = useColorMode();
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
        width: screenWidth <= 1000 ? '100%' : '50%',
        height: '100%',
        overflowY: 'auto',
        borderRadius: '12px',
        background: colorMode === 'light' ? 'white' : 'var(--p-400a)',
      }}
      pt={3}
    >
      <HStack alignSelf={'flex-start'} px={3} mb={2} opacity={0.5}>
        <Icon as={InfoOutlinedIcon} />
        <Text fontWeight={'bold'}>Transaction Details</Text>
      </HStack>

      <VStack
        id={'itemDetails'}
        h={'100%'}
        w={'100%'}
        mt={'0px !important'}
        fontSize={'sm'}
        overflowY={'auto'}
        pb={3}
      >
        <VStack w={'100%'}>
          <HStack
            key={0}
            pt={3}
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'25%'}>
              ID
            </Text>
            <Text w={'75%'}>{props?.selectedItem?.ID}</Text>
          </HStack>

          <HStack
            key={1}
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'25%'}>
              Cashier ID
            </Text>
            <Text w={'75%'}>{props?.selectedItem?.cashierId}</Text>
          </HStack>

          <HStack
            key={2}
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'25%'}>
              Date
            </Text>
            <Text w={'75%'}>{props?.selectedItem?.CreatedAt}</Text>
          </HStack>

          <HStack
            key={3}
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'25%'}>
              Status
            </Text>
            <Text w={'75%'}>
              <Badge
                colorScheme={
                  props?.selectedItem?.status === 'lunas' ? 'green' : 'red'
                }
              >
                {props?.selectedItem?.status}
              </Badge>
            </Text>
          </HStack>

          <HStack
            key={4}
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'25%'}>
              Total
            </Text>
            <Text w={'75%'}>
              {props?.selectedItem?.total?.toLocaleString()}
            </Text>
          </HStack>

          <HStack
            key={5}
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'25%'}>
              Pay
            </Text>
            <Text w={'75%'}>{props?.selectedItem?.pay?.toLocaleString()}</Text>
          </HStack>

          <HStack
            key={6}
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'25%'}>
              Change
            </Text>
            <Text w={'75%'}>
              {props?.selectedItem?.change?.toLocaleString()}
            </Text>
          </HStack>

          <HStack
            key={7}
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'25%'}>
              Cart List
            </Text>
            <VStack w={'75%'}>
              {props.selectedItem.cartList?.map((item, index) => {
                // console.log(item);
                return (
                  <HStack
                    py={index !== 0 ? 1 : null}
                    pb={index === 0 ? 1 : null}
                    mt={'0px !important'}
                    w={'100%'}
                    justifyContent={'space-between'}
                    alignItems={'flex-start'}
                    borderBottom={
                      index !== props.selectedItem.cartList.length - 1
                        ? '1px solid var(--p-200a)'
                        : ''
                    }
                  >
                    <VStack w={'70%'} alignItems={'flex-start'}>
                      <Text>{item.name}</Text>
                      <Text mt={'0px !important'}>
                        {'@ ' + item.price?.toLocaleString()}
                      </Text>
                    </VStack>
                    <Text w={'10%'}>x2</Text>
                    <Text w={'20%'} textAlign={'end'}>
                      {item.totalPrice?.toLocaleString()}
                    </Text>
                  </HStack>
                );
              })}
            </VStack>
          </HStack>

          <HStack
            key={8}
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'25%'}>
              Note
            </Text>
            <Text w={'75%'}>{props?.selectedItem?.notes}</Text>
          </HStack>

          <HStack
            key={9}
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'25%'}>
              Profit
            </Text>
            <Text w={'75%'}>
              {props?.selectedItem?.totalProfit?.toLocaleString()}
            </Text>
          </HStack>

          <HStack
            key={10}
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'25%'}>
              Updated At
            </Text>
            <Text w={'75%'}>{props?.selectedItem?.UpdatedAt}</Text>
          </HStack>
        </VStack>
      </VStack>

      {screenWidth <= 1000 && (
        <HStack
          w={'100%'}
          mt={'0px !important'}
          p={3}
          overflowY={'auto'}
          borderRadius={'0 0 12px 12px'}
          justifyContent={'center'}
          style={{
            borderColor:
              colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
          }}
          // bg={'var(--p-500)'}
          // py={3}
          // borderTop={'1px solid'}
          // borderBottom={'1px solid'}
        >
          <PrimaryButton label="Got It" w={'100%'} onClick={props.onClose} />
        </HStack>
      )}
    </VStack>
  );
};

const TransactionDetailsModal = props => {
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
          content={
            <>
              <ModalBody
                content={
                  <>
                    <ModalCloseButton borderRadius={50} />

                    <TransactionDetails
                      selectedItem={props.selectedItem}
                      refresh={props.refresh}
                      setRefresh={props.setRefresh}
                      onClose={onClose}
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

const DebtsList = props => {
  const baseURL = 'http://localhost:8080';
  const { colorMode } = useColorMode();
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

    const getTransactionsAdmin = `${baseURL}/api/v1/transactions/admin/debt`;

    setLoading(true);

    setTimeout(() => {
      axios
        .get(getTransactionsAdmin, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(r => {
          // console.log(r.data.data);
          if (r.data.data) {
            props.setData(r.data.data);
          } else {
            props.setData([]);
          }
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    }, 300);
  }, [props.refresh]);

  useEffect(() => {
    if (props.data?.length > 0) {
      props.selectItem({ index: 1 });
    }
  }, [props.data]);

  useEffect(() => {
    let isItemFound = true;
    if (props.data?.length !== 0) {
      isItemFound = props.data?.some(item => {
        return (
          item.ID.toString()?.includes(props.search) ||
          item.notes.toString()?.toLowerCase().includes(props.search)
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
          Debt Not Found
        </Text>
      </VStack>
    );
  };

  const dateOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
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
          style={{
            borderColor:
              colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-300)',
          }}
        >
          {props.data?.map((item, index) => {
            const date = new Date(item.CreatedAt);
            const formattedDate = date.toLocaleDateString(
              undefined,
              dateOptions
            );

            if (
              item.ID.toString().includes(props.search) ||
              item.notes.toString()?.toLowerCase().includes(props.search)
            ) {
              return (
                <HStack
                  key={index}
                  id={'item' + index}
                  pl={4}
                  pr={6}
                  mt={'0px !important'}
                  w={'100%'}
                  alignItems={'flex-start'}
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
                  {/* Item's ID */}
                  <Text w={'25%'} p={'4px 8px'}>
                    {item?.ID}
                  </Text>

                  {/* Item's Status */}
                  <VStack w={'58%'} alignItems={'flex-start'} pr={4}>
                    <Text mt={'4px !important'}>{formattedDate}</Text>
                    <Text mt={'2px !important'} opacity={item.notes ? 1 : 0.5}>
                      {item.notes || 'no notes'}
                    </Text>
                  </VStack>

                  {/* Item Action */}
                  <VStack
                    w={'20%'}
                    className={'actionBtnSection'}
                    alignSelf={'center'}
                  >
                    {screenWidth <= 1000 ? (
                      <DebtDetailsModal
                        selectItem={props.selectItem}
                        item={item}
                        selectedItem={props.selectedItem}
                        setSelectedItem={props.setSelectedItem}
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
                    )}
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
          return <Skeleton key={index} h={'100px'} />;
        })}
      </VStack>
    );
  }
};

const DebtDetails = props => {
  const { colorMode } = useColorMode();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  const PayDebt = () => {
    const baseURL = 'http://localhost:8080';

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [data, setData] = useState({
      pay: 0,
      change: props.selectedItem.change,
      status: 'hutang',
    });
    const [loading, setLoading] = useState(false);

    function onPayDebt() {
      const payDebtAPI = `${baseURL}/api/v1/transactions/updatedebt?transaction_id=${props.selectedItem.ID}`;
      const token = Cookies.get('_auth');

      const debtDataToUpdate = {
        pay: props.selectedItem.pay + data.pay,
        change: data.change,
        status: data.status,
      };
      console.log(debtDataToUpdate);

      setLoading(true);
      function payDebt() {
        axios
          .put(payDebtAPI, debtDataToUpdate, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(r => {
            console.log(r);
            props.setSelectedItem({});
            props.setRefresh(!props.refresh);
            setLoading(false);
          })
          .catch(err => {
            console.log(err);
            setLoading(false);
          });
      }

      payDebt();
      onClose();
    }

    return (
      <>
        <PrimaryButton label="Pay Debt" w={'100%'} onClick={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent
            content={
              <>
                <ModalHeader px={4}>
                  <HStack>
                    <Icon as={MoneyOff} fontSize={'xx-large'} />
                    <Text>Pay Debt</Text>
                  </HStack>
                </ModalHeader>

                <ModalBody
                  content={
                    <>
                      <HStack
                        fontWeight={'bold'}
                        alignItems={'flex-start'}
                        justifyContent={'space-between'}
                      >
                        <Text fontSize={'x-large'}>Rp.</Text>
                        <Text fontSize={'xxx-large'}>{data.change}</Text>
                      </HStack>
                      <HStack w={'100%'} justifyContent={'flex-end'}>
                        {data.status === 'lunas' ? (
                          <Badge fontSize={'16px'} colorScheme={'green'}>
                            lunas
                          </Badge>
                        ) : (
                          <Badge fontSize={'16px'} colorScheme={'red'}>
                            hutang
                          </Badge>
                        )}
                      </HStack>

                      <FormControl mt={4} isRequired>
                        <FormLabel>Pay</FormLabel>
                        <HStack w={'100%'}>
                          <Input
                            value={data.pay || ''}
                            type={'number'}
                            onKeyUp={e => {
                              if (e.key === 'Enter') {
                                document.querySelector('#payDebtBtn').click();
                              }
                            }}
                            onChange={e => {
                              let status = 'hutang';
                              if (
                                e.target.value >=
                                props.selectedItem.change * -1
                              ) {
                                status = 'lunas';
                              } else {
                                status = 'hutang';
                              }
                              setData({
                                pay: parseInt(e.target.value),
                                change:
                                  parseInt(e.target.value || '0') +
                                  props.selectedItem.change,
                                status: status,
                              });
                            }}
                          />
                        </HStack>
                      </FormControl>
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
                        <PrimaryButton
                          id={'payDebtBtn'}
                          label={'Pay Debt'}
                          isLoading={loading}
                          onClick={onPayDebt}
                        />
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

  return (
    <VStack
      style={{
        width: screenWidth <= 1000 ? '100%' : '50%',
        height: '100%',
        overflowY: 'auto',
        borderRadius: '12px',
        background: colorMode === 'light' ? 'white' : 'var(--p-400a)',
      }}
      pt={3}
      justifyContent={'space-between'}
    >
      <VStack
        w={'100%'}
        h={props.selectedItem.ID ? 'calc(100% - 64px)' : '100%'}
      >
        <HStack alignSelf={'flex-start'} px={3} mb={2} opacity={0.5}>
          <Icon as={InfoOutlinedIcon} />
          <Text fontWeight={'bold'}>Debt Details</Text>
        </HStack>

        <VStack
          id={'itemDetails'}
          w={'100%'}
          mt={'0px !important'}
          fontSize={'sm'}
          overflowY={'auto'}
          pb={3}
        >
          <VStack w={'100%'}>
            <HStack
              key={0}
              pt={3}
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
              <Text className="detailsLabels" w={'25%'}>
                ID
              </Text>
              <Text w={'75%'}>{props?.selectedItem?.ID}</Text>
            </HStack>

            <HStack
              key={1}
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
              <Text className="detailsLabels" w={'25%'}>
                Cashier ID
              </Text>
              <Text w={'75%'}>{props?.selectedItem?.cashierId}</Text>
            </HStack>

            <HStack
              key={2}
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
              <Text className="detailsLabels" w={'25%'}>
                Date
              </Text>
              <Text w={'75%'}>{props?.selectedItem?.CreatedAt}</Text>
            </HStack>

            <HStack
              key={3}
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
              <Text className="detailsLabels" w={'25%'}>
                Status
              </Text>
              <Text w={'75%'}>
                <Badge
                  colorScheme={
                    props?.selectedItem?.status === 'lunas' ? 'green' : 'red'
                  }
                >
                  {props?.selectedItem?.status}
                </Badge>
              </Text>
            </HStack>

            <HStack
              key={4}
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
              <Text className="detailsLabels" w={'25%'}>
                Total
              </Text>
              <Text w={'75%'}>
                {props?.selectedItem?.total?.toLocaleString()}
              </Text>
            </HStack>

            <HStack
              key={5}
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
              <Text className="detailsLabels" w={'25%'}>
                Pay
              </Text>
              <Text w={'75%'}>
                {props?.selectedItem?.pay?.toLocaleString()}
              </Text>
            </HStack>

            <HStack
              key={6}
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
              <Text className="detailsLabels" w={'25%'}>
                Change
              </Text>
              <Text w={'75%'}>
                {props?.selectedItem?.change?.toLocaleString()}
              </Text>
            </HStack>

            <HStack
              key={7}
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
              <Text className="detailsLabels" w={'25%'}>
                Cart List
              </Text>
              <VStack w={'75%'} pr={2}>
                {props.selectedItem.cartList?.map((item, index) => {
                  // console.log(item);
                  return (
                    <HStack
                      py={index !== 0 ? 1 : null}
                      pb={index === 0 ? 1 : null}
                      mt={'0px !important'}
                      w={'100%'}
                      justifyContent={'space-between'}
                      alignItems={'flex-start'}
                      borderBottom={
                        index !== props.selectedItem.cartList.length - 1
                          ? '1px solid var(--p-200a)'
                          : ''
                      }
                    >
                      <VStack w={'70%'} alignItems={'flex-start'}>
                        <Text>{item.name}</Text>
                        <Text mt={'0px !important'}>
                          {'@ ' + item.price?.toLocaleString()}
                        </Text>
                      </VStack>
                      <Text w={'10%'}>x2</Text>
                      <Text w={'20%'} textAlign={'end'}>
                        {item.totalPrice?.toLocaleString()}
                      </Text>
                    </HStack>
                  );
                })}
              </VStack>
            </HStack>

            <HStack
              key={8}
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
              <Text className="detailsLabels" w={'25%'}>
                Note
              </Text>
              <Text w={'75%'}>{props?.selectedItem?.notes}</Text>
            </HStack>

            <HStack
              key={9}
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
              <Text className="detailsLabels" w={'25%'}>
                Profit
              </Text>
              <Text w={'75%'}>
                {props?.selectedItem?.totalProfit?.toLocaleString()}
              </Text>
            </HStack>

            <HStack
              key={10}
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
              <Text className="detailsLabels" w={'25%'}>
                Updated At
              </Text>
              <Text w={'75%'}>{props?.selectedItem?.UpdatedAt}</Text>
            </HStack>
          </VStack>
        </VStack>
      </VStack>

      <HStack
        w={'100%'}
        mt={'0px !important'}
        p={3}
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
        {props.selectedItem.ID && (
          <PayDebt setSelectedItem={props.setSelectedItem} />
        )}
      </HStack>
    </VStack>
  );
};

const DebtDetailsModal = props => {
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
          content={
            <>
              <ModalCloseButton borderRadius={50} />

              <ModalBody
                content={
                  <>
                    <DebtDetails
                      selectedItem={props.selectedItem}
                      setSelectedItem={props.setSelectedItem}
                      refresh={props.refresh}
                      setRefresh={props.setRefresh}
                      onClose={onClose}
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

const EmployeesList = props => {
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

    const getItemsAPI = `${baseURL}/api/v1/cashiers`;

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
    }, 300);
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
          item?.username?.toLowerCase().includes(props.search.toLowerCase()) ||
          item?.ID?.toString().includes(props.search)
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
          Employee Not Found
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
              item?.username
                ?.toLowerCase()
                .includes(props.search.toLowerCase()) ||
              item?.ID?.toString().includes(props.search)
            ) {
              return (
                <HStack
                  key={index}
                  id={'item' + index}
                  pl={4}
                  pr={6}
                  mt={'0px !important'}
                  w={'100%'}
                  alignItems={'flex-start'}
                  py={2}
                  position={'relative'}
                  style={{
                    background:
                      index % 2 === 1
                        ? colorMode === 'light'
                          ? 'var(--light)'
                          : 'var(--dark)'
                        : null,
                  }}
                >
                  {/* Emp ID */}
                  <Text w={'30%'} p={'4px 8px'}>
                    {item.ID}
                  </Text>

                  {/* Emp Username */}
                  <VStack w={'50%'} alignItems={'flex-start'} pr={4}>
                    <Text fontWeight={'bold'}>{item?.username}</Text>
                    <Text mt={'4px !important'}>
                      {item?.role?.charAt(0).toUpperCase() +
                        item?.role?.slice(1)}
                    </Text>
                  </VStack>

                  {/* Emp Action */}
                  <VStack
                    w={'20%'}
                    className={'actionBtnSection'}
                    alignSelf={'center'}
                  >
                    {screenWidth <= 1000 ? (
                      <EmployeeDetailsModal
                        selectItem={props.selectItem}
                        item={item}
                        selectedItem={props.selectedItem}
                        setSelectedItem={props.setSelectedItem}
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
                    )}
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
          return <Skeleton key={index} h={'100px'} />;
        })}
      </VStack>
    );
  }
};

const EmployeeDetails = props => {
  const selectedItem = props.selectedItem;
  const auth = useAuthUser();
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
        background: colorMode === 'light' ? 'white' : 'var(--p-400a)',
      }}
      pt={3}
    >
      <HStack alignSelf={'flex-start'} px={3} mb={2} opacity={0.5}>
        <Icon as={InfoOutlinedIcon} />
        <Text fontWeight={'bold'}>Employee Details</Text>
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
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              ID
            </Text>
            <Text w={'calc(100% - 150px)'}>{selectedItem?.ID}</Text>
          </HStack>

          <HStack
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Admin ID
            </Text>
            <Text w={'calc(100% - 150px)'}>{selectedItem?.admin_id}</Text>
          </HStack>

          <HStack
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Username
            </Text>
            <Text w={'calc(100% - 150px)'}>{selectedItem?.username}</Text>
          </HStack>

          <HStack
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Role (Job)
            </Text>
            <Text w={'calc(100% - 150px)'}>
              {selectedItem?.role?.charAt(0)?.toUpperCase() +
                selectedItem?.role?.slice(1) || ''}
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
                colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Created At
            </Text>
            <Text w={'calc(100% - 150px)'}>{selectedItem?.CreatedAt}</Text>
          </HStack>
        </VStack>
      </VStack>

      <HStack
        w={'100%'}
        mt={'0px !important'}
        p={3}
        fontSize={'sm'}
        overflowY={'auto'}
        borderRadius={'0 0 12px 12px'}
        justifyContent={'center'}
        style={{
          borderColor:
            colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
        }}
      >
        {selectedItem.ID && auth().userRole === 'admin' ? (
          <ButtonGroup w={'100%'} isAttached>
            <DeleteEmployee
              selectedItem={selectedItem}
              setSelectedItem={props.setSelectedItem}
              refresh={props.refresh}
              setRefresh={props.setRefresh}
            />
          </ButtonGroup>
        ) : (
          selectedItem.ID && (
            <PrimaryButton
              label={'Got It'}
              w={'100%'}
              onClick={props.onClose}
            />
          )
        )}
      </HStack>
    </VStack>
  );
};

const EmployeeDetailsModal = props => {
  // console.log(props);
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
          content={
            <>
              <ModalBody
                content={
                  <>
                    <ModalCloseButton borderRadius={50} />

                    <EmployeeDetails
                      setSelectedItem={props.setSelectedItem}
                      selectedItem={props.selectedItem}
                      refresh={props.refresh}
                      setRefresh={props.setRefresh}
                      onClose={onClose}
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

const DeleteEmployee = props => {
  // console.log(props.setSelectedItem);
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

  const [loading, setLoading] = useState();

  function onDelete(e) {
    e.preventDefault();

    const token = Cookies.get('_auth');

    console.log('Deleting item...');
    // console.log(registerData);
    // console.log(token);

    const deleteProductAPI = new URL(
      `${baseURL}/api/v1/cashier/delete?cashier_id=${props.selectedItem.ID}`
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
              title: 'Employee Account Deleted',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
          props.setSelectedItem({});
          props.setRefresh(!props.refresh);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          if (err) {
            toast({
              position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
              title: 'Sorry, fail to delete Employee Accountem.',
              // description: err.response.data.data.error,
              status: 'error',
              duration: 3000,
              isClosable: true,
            });
          }
          setLoading(false);
        });
    }

    setLoading(true);
    setTimeout(() => {
      deleteSelectedItem();
    }, 1000);
  }

  return (
    <>
      <PrimaryButtonOutline
        w={'100%'}
        label={'Delete Employee Account'}
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />

        <ModalContent
          content={
            <>
              <ModalHeader px={4}>
                <HStack>
                  <Icon as={DeleteOutlineOutlinedIcon} fontSize={'xx-large'} />
                  <Text>Delete Account</Text>
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
                      Make sure if you want to delete employee account, you
                      cannot undo this action.
                    </Alert>
                    <Text>
                      Are you sure to delete the selected employee account?{' '}
                    </Text>
                    <HStack w={'100%'}>
                      <Text w={'50px'}>Code</Text>
                      <Text fontWeight={'bold'}>{props?.selectedItem?.ID}</Text>
                    </HStack>
                    <HStack w={'100%'}>
                      <Text w={'50px'}>Name</Text>
                      <Text fontWeight={'bold'}>
                        {props?.selectedItem?.username}
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
                      <PrimaryButton
                        label={'Delete Account'}
                        isLoading={loading}
                        onClick={onDelete}
                      />
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

export {
  ItemsList,
  ItemDetails,
  TransactionsList,
  TransactionDetails,
  DebtsList,
  DebtDetails,
  EmployeesList,
  EmployeeDetails,
  EmployeeDetailsModal,
};
