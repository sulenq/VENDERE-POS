import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import {
  useToast,
  HStack,
  useColorMode,
  VStack,
  Text,
  useDisclosure,
  ButtonGroup,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Icon,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

// MUI Icons
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';

// My Component
import ResponsiveNav from '../components/ResponsiveNav';
import { SearchBox } from '../components/Inputs';
import { PrimaryButton, PrimaryButtonOutline } from '../components/Buttons';
import { ActionTopBar } from '../components/ActionTopBar';
import { Stat } from '../components/Data';
import { ModalContent, ModalFooter, ModalOverlay } from '../components/Modals';
import { Input, InputNumber } from '../components/Inputs';
import { Skeleton } from '../components/Skeleton';

export default function ManageItems(props) {
  const baseURL = 'http://localhost:8080';

  const toast = useToast();

  const isItemsExist = props.items.length !== 0;

  const [isItemsLoading, setIsItemsLoading] = useState(false);

  //* get transactions if refreshed
  useEffect(() => {
    const token = Cookies.get('_auth');

    // console.log(props.items);

    const createItemsAPI = `${baseURL}/api/v1/create`;
    const getItemsAPI = `${baseURL}/api/v1/products`;
    const updateItemsAPI = `${baseURL}/api/v1/products/update`;
    const deleteItemsAPI = `${baseURL}/api/v1/products/delete`;

    if (props.items.length === 0) {
      setIsItemsLoading(true);
      setTimeout(() => {
        axios
          .get(getItemsAPI, { headers: { Authorization: `Bearer ${token}` } })
          .then(r => {
            // console.log(r.data.data);
            if (r.data.data) {
              props.setItems(r.data.data);
            } else {
              props.setItems([]);
            }
          })
          .catch(err => {
            console.log(err);
          })
          .finally(setIsItemsLoading(false));
      }, 1000);
    }
  }, []);

  useEffect(() => {
    if (props.items.length !== 0) {
      // console.log(props.items);
      selectItem(null, 1);
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

  const [search, setSearch] = useState('');

  const [itemIndex, setItemIndex] = useState(1);

  const [itemsLength, setItemsLength] = useState(0);

  const [selectedItem, setSelectedItem] = useState({});

  function selectItem(item, index) {
    let selectedItem;

    if (item) {
      selectedItem = item;
    } else {
      const selectedItemCode = document.querySelector(
        `.items > :nth-child(${index}) p`
      )?.textContent;

      selectedItem = props.items.find(item => {
        return item.code === selectedItemCode;
      });
    }

    // console.log(selectedItem);

    if (selectedItem) {
      const itemCodesElm = document.querySelectorAll('.items > div > p');

      itemCodesElm.forEach((itemCodeElm, index) => {
        if (itemCodeElm.textContent === selectedItem.code) {
          setItemIndex(index + 1);
        }
      });

      function selectedItemStruct(selectedItem) {
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
        const selectedItemToReturn = { ...selectedItemToSet, keys: keys };

        return selectedItemToReturn;
      }

      const selectedItemToSet = selectedItemStruct(selectedItem);

      setSelectedItem(selectedItemToSet);
    }
  }

  //* Keydown event (arrow up & down) focus to searchBox
  document.documentElement.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!screenWidth <= 1000) {
        const itemSearchBox = document.querySelector('#itemSearchBox');
        itemSearchBox?.focus();
      }
    }
  });

  //*Trans detail on mobile
  const TransactionDetail = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <Text onClick={onOpen}>details</Text>
        <Modal isOpen={isOpen}>
          <ModalOverlay />

          <ModalContent
            content={
              <>
                <VStack
                  style={{
                    width: '50%',
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
                    <Text fontWeight={'bold'}>Transaction Details</Text>
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
                    {/* item detail data */}
                    {!isItemsLoading ? (
                      <VStack w={'100%'}>
                        <HStack
                          pt={3}
                          px={5}
                          pb={2}
                          w={'100%'}
                          alignItems={'flex-start'}
                          borderBottom={'1px solid'}
                          style={{
                            borderColor:
                              colorMode === 'light'
                                ? 'var(--light-dim)'
                                : 'var(--p-300)',
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
                              colorMode === 'light'
                                ? 'var(--light-dim)'
                                : 'var(--p-300)',
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
                              colorMode === 'light'
                                ? 'var(--light-dim)'
                                : 'var(--p-300)',
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
                              colorMode === 'light'
                                ? 'var(--light-dim)'
                                : 'var(--p-300)',
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
                              colorMode === 'light'
                                ? 'var(--light-dim)'
                                : 'var(--p-300)',
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
                              colorMode === 'light'
                                ? 'var(--light-dim)'
                                : 'var(--p-300)',
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
                              colorMode === 'light'
                                ? 'var(--light-dim)'
                                : 'var(--p-300)',
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
                              colorMode === 'light'
                                ? 'var(--light-dim)'
                                : 'var(--p-300)',
                          }}
                        >
                          <Text w={'150px'}>Updated At</Text>
                          <Text>{selectedItem?.UpdatedAt}</Text>
                        </HStack>
                      </VStack>
                    ) : (
                      <VStack className="skeleton">
                        {itemsSkeleton.map(() => {
                          return (
                            <HStack w={'100%'} py={1}>
                              <Skeleton h={'24px'} />
                            </HStack>
                          );
                        })}
                      </VStack>
                    )}
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
                          colorMode === 'light'
                            ? 'var(--light-dim)'
                            : 'var(--p-300)',
                      }}
                    >
                      <ButtonGroup p={3} w={'100%'} isAttached>
                        <UpdateItem />
                        <DeleteItem />
                      </ButtonGroup>
                    </HStack>
                  )}
                </VStack>
              </>
            }
          />
        </Modal>
      </>
    );
  };

  //* Update Item
  const UpdateItem = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [itemToUpdate, setItemToUpdate] = useState({ ...selectedItem });

    function onUpdate(e) {
      e.preventDefault();

      const token = Cookies.get('_auth');

      console.log('Updating item...');

      const updateProductAPI = new URL(
        `${baseURL}/api/v1/products/update?product_id=${itemToUpdate.ID}`
      );

      function updateSelectedItem() {
        axios
          .put(updateProductAPI, {
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
            window.location.reload();
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
        <PrimaryButton w={'100%'} label={'Update Item'} onClick={onOpen} />
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />

          <ModalContent
            content={
              <>
                <ModalHeader>
                  <HStack>
                    <Icon
                      as={DeleteOutlineOutlinedIcon}
                      fontSize={'xx-large'}
                    />
                    <Text>Delete Item</Text>
                  </HStack>
                </ModalHeader>

                <ModalBody pb={6}>
                  <Alert
                    borderRadius={'8px'}
                    status="info"
                    variant={'left-accent'}
                    mb={5}
                  >
                    <AlertIcon alignSelf={'flex-start'} />
                    Page will be refreshed after you update item.
                  </Alert>

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
                </ModalBody>

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
                          label={'Update Item'}
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

  //* Delete Item
  const DeleteItem = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    function onDelete(e) {
      e.preventDefault();

      const token = Cookies.get('_auth');

      console.log('Deleting item...');
      // console.log(registerData);
      // console.log(token);

      const deleteProductAPI = new URL(
        `${baseURL}/api/v1/products/delete?product_id=${selectedItem.ID}`
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
              toast({
                position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
                title: 'Item Deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            }
            window.location.reload();
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
          label={'Delete Item'}
          onClick={onOpen}
        />
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />

          <ModalContent
            content={
              <>
                <ModalHeader>
                  <HStack>
                    <Icon
                      as={DeleteOutlineOutlinedIcon}
                      fontSize={'xx-large'}
                    />
                    <Text>Delete Item</Text>
                  </HStack>
                </ModalHeader>

                <ModalBody pb={6}>
                  <Alert
                    borderRadius={'8px'}
                    status="error"
                    variant={'left-accent'}
                    mb={5}
                  >
                    <AlertIcon alignSelf={'flex-start'} />
                    Make sure if you want to delete item, you cannot undo this
                    action and page will be refreshed.
                  </Alert>
                  <Text>Are you sure to delete the selected item? </Text>
                  <Text fontWeight={'bold'}>
                    {selectedItem.code} {selectedItem.name}
                  </Text>
                </ModalBody>

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
                          label={'Delete Item'}
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

  const itemsSkeleton = ['', '', '', '', '', '', '', '', '', '', '', ''];

  return (
    <HStack
      className="vendereApp"
      p={screenWidth <= 1000 ? 0 : 4}
      alignItems={'center'}
    >
      <ResponsiveNav active={'Transactions'} setItems={props.setItems} />

      <VStack
        id="appContentWrapper"
        ml={'0px !important'}
        h={'100%'}
        style={{
          background:
            colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-350)',
          borderRadius: screenWidth <= 1000 ? 0 : '12px',
          width: screenWidth <= 1000 ? '100%' : 'calc(100% - 200px)',
          padding: 8,
          height: '100%',
          alignItems: 'flex-start',
        }}
      >
        <ActionTopBar />
        
        <HStack h={'calc(100% - 40px)'} w={'100%'} mt={'4px !important'}>
          {/* Trans Section */}
          <VStack
            style={{
              width: screenWidth <= 1000 ? '100%' : '50%',
              height: '100%',
              overflowY: 'auto',
              paddingBottom: screenWidth <= 1000 ? '64px' : '',
              borderRadius: '12px',
              background: colorMode === 'light' ? 'white' : 'var(--p-400)',
            }}
            py={3}
          >
            {/* Title */}
            <HStack
              alignSelf={'flex-start'}
              px={3}
              w={'100%'}
              justifyContent={'space-between'}
              mb={1}
            >
              <HStack opacity={0.5}>
                <Icon as={ReceiptLongOutlinedIcon} />
                <Text fontWeight={'bold'}>All Transactions</Text>
              </HStack>
            </HStack>

            {/* Search Box */}
            <HStack px={3} w={'100%'}>
              <SearchBox
                placeholder={'Search transaction by id'}
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
                ID
              </Text>
              <Text fontWeight={'bold'} w={'50%'}>
                DATE
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

            {/* Trans */}
            {!isItemsLoading ? (
              isItemsExist ? (
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
                      colorMode === 'light'
                        ? 'var(--light-dim)'
                        : 'var(--p-300)',
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
                            {screenWidth <= 1000 ? (
                              <TransactionDetail />
                            ) : (
                              <Text
                                opacity={0.5}
                                size={'sm'}
                                cursor={'pointer'}
                                _hover={{ textDecoration: 'underline' }}
                                onClick={() => {
                                  selectItem(item, index + 1);
                                }}
                              >
                                details
                              </Text>
                            )}
                          </VStack>
                        </HStack>
                      );
                    } else {
                      return null;
                    }
                  })}
                </VStack>
              ) : (
                <VStack h={'100%'} w={'100%'}>
                  <Text>You have no trans</Text>
                </VStack>
              )
            ) : (
              <VStack className="skeleton">
                {itemsSkeleton.map(() => {
                  return <Skeleton h={'50px'} />;
                })}
              </VStack>
            )}
          </VStack>

          {/* Trans Details Section*/}
          {screenWidth <= 1000 ? null : (
            <VStack
              style={{
                width: '50%',
                height: '100%',
                overflowY: 'auto',
                paddingBottom: screenWidth <= 1000 ? '64px' : '',
                borderRadius: '12px',
                background: colorMode === 'light' ? 'white' : 'var(--p-400)',
              }}
              pt={3}
            >
              <HStack alignSelf={'flex-start'} px={3} mb={2} opacity={0.5}>
                <Icon as={InfoOutlinedIcon} />
                <Text fontWeight={'bold'}>Transaction Details</Text>
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
                {/* item detail data */}
                {!isItemsLoading ? (
                  <VStack w={'100%'}>
                    <HStack
                      pt={3}
                      px={5}
                      pb={2}
                      w={'100%'}
                      alignItems={'flex-start'}
                      borderBottom={'1px solid'}
                      style={{
                        borderColor:
                          colorMode === 'light'
                            ? 'var(--light-dim)'
                            : 'var(--p-300)',
                      }}
                    >
                      <Text w={'25%'}>ID</Text>
                      <Text w={'75%'}>{selectedItem?.code}</Text>
                    </HStack>

                    <HStack
                      px={5}
                      pb={2}
                      w={'100%'}
                      alignItems={'flex-start'}
                      borderBottom={'1px solid'}
                      style={{
                        borderColor:
                          colorMode === 'light'
                            ? 'var(--light-dim)'
                            : 'var(--p-300)',
                      }}
                    >
                      <Text w={'25%'}>Cashier ID</Text>
                      <Text w={'75%'}>{selectedItem?.code}</Text>
                    </HStack>

                    <HStack
                      px={5}
                      pb={2}
                      w={'100%'}
                      alignItems={'flex-start'}
                      borderBottom={'1px solid'}
                      style={{
                        borderColor:
                          colorMode === 'light'
                            ? 'var(--light-dim)'
                            : 'var(--p-300)',
                      }}
                    >
                      <Text w={'25%'}>Date</Text>
                      <Text w={'75%'}>{selectedItem?.name}</Text>
                    </HStack>

                    <HStack
                      px={5}
                      pb={2}
                      w={'100%'}
                      alignItems={'flex-start'}
                      borderBottom={'1px solid'}
                      style={{
                        borderColor:
                          colorMode === 'light'
                            ? 'var(--light-dim)'
                            : 'var(--p-300)',
                      }}
                    >
                      <Text w={'25%'}>Status</Text>
                      <Text w={'75%'}>{selectedItem?.modal}</Text>
                    </HStack>

                    <HStack
                      px={5}
                      pb={2}
                      w={'100%'}
                      alignItems={'flex-start'}
                      borderBottom={'1px solid'}
                      style={{
                        borderColor:
                          colorMode === 'light'
                            ? 'var(--light-dim)'
                            : 'var(--p-300)',
                      }}
                    >
                      <Text w={'25%'}>Total</Text>
                      <Text w={'75%'}>{selectedItem?.price}</Text>
                    </HStack>

                    <HStack
                      px={5}
                      pb={2}
                      w={'100%'}
                      alignItems={'flex-start'}
                      borderBottom={'1px solid'}
                      style={{
                        borderColor:
                          colorMode === 'light'
                            ? 'var(--light-dim)'
                            : 'var(--p-300)',
                      }}
                    >
                      <Text w={'25%'}>Pay</Text>
                      <Text w={'75%'}>{selectedItem?.stock}</Text>
                    </HStack>

                    <HStack
                      px={5}
                      pb={2}
                      w={'100%'}
                      alignItems={'flex-start'}
                      borderBottom={'1px solid'}
                      style={{
                        borderColor:
                          colorMode === 'light'
                            ? 'var(--light-dim)'
                            : 'var(--p-300)',
                      }}
                    >
                      <Text w={'25%'}>Change</Text>
                      <Text w={'75%'}>{selectedItem?.user_id}</Text>
                    </HStack>

                    <HStack
                      px={5}
                      pb={2}
                      w={'100%'}
                      alignItems={'flex-start'}
                      borderBottom={'1px solid'}
                      style={{
                        borderColor:
                          colorMode === 'light'
                            ? 'var(--light-dim)'
                            : 'var(--p-300)',
                      }}
                    >
                      <Text w={'25%'}>Cart List</Text>
                      <VStack w={'75%'}>
                        {itemsSkeleton.map((item, index) => {
                          if (index < 5) {
                            return (
                              <HStack
                                pr={2}
                                w={'100%'}
                                justifyContent={'space-between'}
                                alignItems={'flex-start'}
                              >
                                <VStack w={'50%'} alignItems={'flex-start'}>
                                  <Text>Item's name</Text>
                                  <Text mt={'0px !important'}>3000</Text>
                                </VStack>
                                <Text w={'10%'}>x2</Text>
                                <Text w={'40%'} textAlign={'end'}>
                                  Total price
                                </Text>
                              </HStack>
                            );
                          }
                        })}
                      </VStack>
                    </HStack>

                    <HStack
                      px={5}
                      pb={2}
                      w={'100%'}
                      alignItems={'flex-start'}
                      borderBottom={'1px solid'}
                      style={{
                        borderColor:
                          colorMode === 'light'
                            ? 'var(--light-dim)'
                            : 'var(--p-300)',
                      }}
                    >
                      <Text w={'25%'}>Note</Text>
                      <Text w={'75%'}>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s
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
                          colorMode === 'light'
                            ? 'var(--light-dim)'
                            : 'var(--p-300)',
                      }}
                    >
                      <Text w={'25%'}>Profit</Text>
                      <Text w={'75%'}>{selectedItem?.price}</Text>
                    </HStack>

                    <HStack
                      px={5}
                      pb={2}
                      w={'100%'}
                      alignItems={'flex-start'}
                      borderBottom={'1px solid'}
                      style={{
                        borderColor:
                          colorMode === 'light'
                            ? 'var(--light-dim)'
                            : 'var(--p-300)',
                      }}
                    >
                      <Text w={'25%'}>Created At</Text>
                      <Text w={'75%'}>{selectedItem?.UpdatedAt}</Text>
                    </HStack>

                    <HStack
                      px={5}
                      pb={2}
                      w={'100%'}
                      alignItems={'flex-start'}
                      borderBottom={'1px solid'}
                      style={{
                        borderColor:
                          colorMode === 'light'
                            ? 'var(--light-dim)'
                            : 'var(--p-300)',
                      }}
                    >
                      <Text w={'25%'}>Updated At</Text>
                      <Text w={'75%'}>{selectedItem?.UpdatedAt}</Text>
                    </HStack>
                  </VStack>
                ) : (
                  <VStack className="skeleton">
                    {itemsSkeleton.map(() => {
                      return (
                        <HStack w={'100%'} py={1}>
                          <Skeleton h={'24px'} />
                        </HStack>
                      );
                    })}
                  </VStack>
                )}
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
                      colorMode === 'light'
                        ? 'var(--light-dim)'
                        : 'var(--p-300)',
                  }}
                >
                  <ButtonGroup p={3} w={'100%'} isAttached>
                    <UpdateItem />
                    <DeleteItem />
                  </ButtonGroup>
                </HStack>
              )}
            </VStack>
          )}
        </HStack>
      </VStack>
    </HStack>
  );
}
