import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useAuthUser, useSignOut } from 'react-auth-kit';

// Chakra UI
import {
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

const UpdateItem = props => {
  const baseURL = 'http://localhost:8080';
  const toast = useToast();
  const { colorMode } = useColorMode();
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
  const [addStock, setAddStock] = useState(0);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setItemToUpdate(JSON.parse(JSON.stringify(props.selectedItem)));
  }, [props.selectedItem]);

  function reverseFormatNumber(num) {
    let cleanedString;
    const validNums = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    const isNumValid = validNums.some(validNum => num.includes(validNum));
    if (isNumValid) {
      const numCapped = num.substring(0, 19);
      cleanedString = numCapped.replace(/\./g, '');
    } else {
      cleanedString = '0';
    }
    return cleanedString;
  }

  function formatNum(num) {
    let formattedNum;
    if (num != 0) {
      formattedNum = num.toLocaleString('id-ID');
    } else {
      formattedNum = '';
    }

    return formattedNum;
  }

  function onUpdate(e) {
    e.preventDefault();

    const token = Cookies.get('_auth');

    console.log('Updating item...');

    const updateProductAPI = new URL(
      `${baseURL}/api/v1/products/update?product_id=${itemToUpdate.ID}`
    );

    function updateSelectedItem() {
      console.log(itemToUpdate);
      const dataToUpdate = {
        ...itemToUpdate,
        stock: itemToUpdate.stock + addStock,
      };
      axios
        .put(updateProductAPI, dataToUpdate, {
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
    }, 1);
  }

  return (
    <>
      <PrimaryButtonOutline
        w={'100%'}
        leftIcon={DriveFileRenameOutlineOutlinedIcon}
        label={'Update Product'}
        onClick={onOpen}
      />

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
                  <Text>Updating Product</Text>
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

                    <form>
                      <FormControl isRequired>
                        <FormLabel>Product's Code</FormLabel>
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
                        <FormLabel>Product's Name</FormLabel>
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

                      <HStack mt={4}>
                        <FormControl isRequired>
                          <FormLabel>Supply</FormLabel>
                          <Input
                            // onFocus={e => e.target.select()}
                            placeholder="e.g 24"
                            // type={'number'}
                            value={formatNum(itemToUpdate.stock + addStock)}
                            onChange={e => {
                              setItemToUpdate({
                                ...itemToUpdate,
                                stock: parseInt(
                                  reverseFormatNumber(e.target.value)
                                ),
                              });
                            }}
                            onKeyUp={e => {
                              if (e.key === 'Enter') {
                                document
                                  .querySelector('#updateProductBtn')
                                  .click();
                              }
                            }}
                          />
                        </FormControl>

                        <FormControl>
                          <FormLabel>Add to Supply</FormLabel>
                          <Input
                            // onFocus={e => e.target.select()}
                            placeholder="e.g 24"
                            // type={'number'}
                            value={formatNum(addStock)}
                            onChange={e => {
                              setAddStock(
                                parseInt(reverseFormatNumber(e.target.value))
                              );
                            }}
                            onKeyUp={e => {
                              if (e.key === 'Enter') {
                                document
                                  .querySelector('#updateProductBtn')
                                  .click();
                              }
                            }}
                          />
                        </FormControl>
                      </HStack>

                      {/* <FormControl mt={4} isRequired>
                      <FormLabel>Buy Price</FormLabel>
                      <Input
                        onFocus={e => e.target.select()}
                        placeholder="e.g 24"
                        // type={'number'}
                        value={formatNum(itemToUpdate.stock)}
                        onChange={e => {
                          setItemToUpdate({
                            ...itemToUpdate,
                            stock: parseInt(
                              reverseFormatNumber(e.target.value)
                            ),
                          });
                        }}
                      />
                    </FormControl> */}

                      <FormControl mt={4} isRequired>
                        <FormLabel>Price</FormLabel>
                        <Input
                          onFocus={e => e.target.select()}
                          placeholder="e.g 24.000"
                          // type={'number'}
                          value={formatNum(itemToUpdate.price)}
                          onChange={e => {
                            setItemToUpdate({
                              ...itemToUpdate,
                              price: parseInt(
                                reverseFormatNumber(e.target.value)
                              ),
                            });
                          }}
                          onKeyUp={e => {
                            if (e.key === 'Enter') {
                              document
                                .querySelector('#updateProductBtn')
                                .click();
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
                        colorScheme={
                          colorMode === 'light' ? 'blackAlpha' : 'gray'
                        }
                      >
                        Close
                      </Button>
                      <PrimaryButton
                        id={'updateProductBtn'}
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
  const { colorMode } = useColorMode();
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
    // console.log(itemToUpdate);
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
    }, 1);
  }

  return (
    <>
      <PrimaryButtonOutline
        w={'100%'}
        leftIcon={DeleteOutlineOutlinedIcon}
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
                  <Text>Deleting Product</Text>
                </HStack>
              </ModalHeader>

              <ModalBody
                content={
                  <>
                    <Alert
                      borderRadius={'8px'}
                      status="warning"
                      variant={'left-accent'}
                      mb={5}
                    >
                      <AlertIcon
                        alignSelf={'flex-start'}
                        mt={'2px !important'}
                      />
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
                        colorScheme={
                          colorMode === 'light' ? 'blackAlpha' : 'gray'
                        }
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

  const loading = props.loading;
  const skeletonLength = ['', '', '', '', '', '', '', '', '', '', '', ''];
  const [itemFound, setItemFound] = useState(true);

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
  }, [props.search, props.data, props.refresh]);

  useEffect(() => {
    if (itemFound) {
      props.setItemIndex(1);
      props.selectItem({ index: 1 });
    }
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
          className={colorMode === 'light' ? 'items onLight' : 'items onDark'}
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
                  <Text className="itemID" display={'none'}>
                    {item?.ID}
                  </Text>
                  <Text w={'30%'} p={'4px 8px'}>
                    {item.code}
                  </Text>

                  {/* Item's Name */}
                  <VStack w={'50%'} alignItems={'flex-start'} pr={4}>
                    <Text fontWeight={'bold'}>{item.name}</Text>
                    <Text mt={'4px !important'}>
                      {'Rp. ' + item.price.toLocaleString('id-ID')}
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
                            document.querySelector('#itemSearchBox').focus();
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
        borderRadius: '20px',
        background: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-400a)',
      }}
      pt={3}
    >
      <HStack alignSelf={'flex-start'} px={3} mb={2} opacity={0.5}>
        <Icon as={InfoOutlinedIcon} />
        <Text fontWeight={'bold'}>Product Details</Text>
      </HStack>

      <VStack
        id={'itemDetails'}
        className={colorMode === 'light' ? 'onLight' : 'onDark'}
        h={selectedItem.ID ? 'calc(100% - 96px)' : '100%'}
        w={'100%'}
        mt={'0px !important'}
        fontSize={'sm'}
        overflowY={'auto'}
        maxH={screenWidth <= 1000 ? window.innerHeight - 200 : '100%'}
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
              opacity: 0.1,
              // borderRadius: '20px',
              background: 'var(--p-200)',
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
                colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300a2)',
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
                colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300a2)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Name
            </Text>
            <Text w={'calc(100% - 150px)'}>{selectedItem?.name}</Text>
          </HStack>

          {/* <HStack
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300a2)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Buy Price
            </Text>
            <Text w={'calc(100% - 150px)'}>
              {selectedItem?.modal?.toLocaleString('id-ID')}
            </Text>
          </HStack> */}

          <HStack
            px={5}
            pb={2}
            w={'100%'}
            alignItems={'flex-start'}
            borderBottom={'1px solid'}
            style={{
              borderColor:
                colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300a2)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Price
            </Text>
            <Text w={'calc(100% - 150px)'}>
              {selectedItem?.price?.toLocaleString('id-ID')}
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
                colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300a2)',
            }}
          >
            <Text className="detailsLabels" w={'150px'}>
              Supply
            </Text>
            <Text w={'calc(100% - 150px)'}>
              {selectedItem?.stock?.toLocaleString('id-ID')}
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
                colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300a2)',
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
                colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300a2)',
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
                colorMode === 'light' ? 'var(--p-75)' : 'var(--p-300a2)',
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
        p={'16px 12px 12px 12px'}
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
            <PrimaryButtonOutline
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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });
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

      <Modal isOpen={isOpen} onClose={onClose} trapFocus={false} isCentered>
        <ModalOverlay />

        <ModalContent
          maxH={'90%'}
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

export { ItemsList, ItemDetails };
