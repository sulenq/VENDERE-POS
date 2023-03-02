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
import { ItemsList } from '../components/Items';

export default function ManageItems(props) {
  const baseURL = 'http://localhost:8080';

  const toast = useToast();

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

  const [data, setData] = useState([]);

  const [search, setSearch] = useState('');

  const [itemIndex, setItemIndex] = useState(1);

  const [itemsLength, setItemsLength] = useState(0);

  const [selectedItem, setSelectedItem] = useState({});

  const [refresh, setRefresh] = useState(true);

  function selectItem({ item, index }) {
    let selectedItem;

    if (item) {
      selectedItem = item;
    } else {
      const selectedItemCode = document.querySelector(
        `.items > :nth-child(${index}) p`
      )?.textContent;

      selectedItem = data.find(item => {
        return item.code === selectedItemCode;
      });
    }

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

  //* Add Item Section
  const AddItem = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [registerData, setRegisterData] = useState({
      code: '',
      name: '',
      stock: 1,
      modal: 1,
      price: 1,
    });
    const [isLoading, setIsLoading] = useState(false);

    function onAddNewItem(e) {
      e.preventDefault();

      const token = Cookies.get('_auth');

      console.log('Adding new item...');

      setIsLoading(true);

      const createProductAPI = new URL(`${baseURL}/api/v1/products/create`);

      function createProduct() {
        axios
          .post(createProductAPI, registerData, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(r => {
            console.log(r);
            setRegisterData({
              ucode: '',
              name: '',
              stock: 1,
              modal: 1,
              price: 1,
            });
            onClose();
            if (r.status === 201) {
              toast({
                position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
                title: 'New item(s) registered',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            }
            setRefresh(!refresh);
          })
          .catch(err => {
            console.log(err);
            if (err) {
              toast({
                position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
                title: 'Sorry, fail add new item.',
                description: err.response.data.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            }
          })
          .finally(setIsLoading(false));
      }

      createProduct();
    }

    return (
      <>
        <PrimaryButton
          w={'100%'}
          label={'Add New Item'}
          onClick={onOpen}
          // mr={'-8px !important'}
        />

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />

          <ModalContent
            content={
              <>
                <ModalHeader>
                  <HStack>
                    <Icon as={Inventory2OutlinedIcon} fontSize={'xx-large'} />
                    <Text>Add New Item</Text>
                  </HStack>
                </ModalHeader>

                <ModalBody pb={6}>
                  <Alert
                    borderRadius={'8px'}
                    status="info"
                    variant={'left-accent'}
                  >
                    <AlertIcon alignSelf={'flex-start'} />
                    Page will be refreshed after you add new item.
                  </Alert>

                  <form id="addNewItemForm">
                    <FormControl mt={4} isRequired>
                      <FormLabel>Item's Code</FormLabel>
                      <Input
                        placeholder="e.g 089696010947 or ndog123"
                        value={registerData.code}
                        onChange={e => {
                          setRegisterData({
                            ...registerData,
                            code: e.target.value,
                          });
                        }}
                      />
                    </FormControl>

                    <FormControl mt={4} isRequired>
                      <FormLabel>Item's Name</FormLabel>
                      <Input
                        placeholder="e.g Telur 1kg"
                        value={registerData.name}
                        onChange={e => {
                          setRegisterData({
                            ...registerData,
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
                        value={registerData.stock}
                        onChange={e => {
                          if (parseInt(e.target.value) > 1) {
                            setRegisterData({
                              ...registerData,
                              stock: parseInt(e.target.value),
                            });
                          } else {
                            setRegisterData({
                              ...registerData,
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
                        value={registerData.modal}
                        onChange={e => {
                          if (parseInt(e.target.value) > 1) {
                            setRegisterData({
                              ...registerData,
                              modal: parseInt(e.target.value),
                            });
                          } else {
                            setRegisterData({
                              ...registerData,
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
                        value={registerData.price}
                        onChange={e => {
                          if (parseInt(e.target.value) > 1) {
                            setRegisterData({
                              ...registerData,
                              price: parseInt(e.target.value),
                            });
                          } else {
                            setRegisterData({
                              ...registerData,
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
                          label={'Add New Item'}
                          onClick={onAddNewItem}
                          isLoading={isLoading}
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
            setRefresh(!refresh);
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
                      as={DriveFileRenameOutlineOutlinedIcon}
                      fontSize={'xx-large'}
                    />
                    <Text>Update Item</Text>
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
              console.log(r);
              toast({
                position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
                title: 'Item Deleted',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            }
            setRefresh(!refresh);
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
                  <HStack w={'100%'}>
                    <Text w={'50px'}>Code</Text>
                    <Text fontWeight={'bold'}>{selectedItem.code}</Text>
                  </HStack>
                  <HStack w={'100%'}>
                    <Text w={'50px'}>Name</Text>
                    <Text fontWeight={'bold'}>{selectedItem.name}</Text>
                  </HStack>
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
  const itemDetailsSkeleton = ['', '', '', '', '', '', '', ''];

  return (
    <HStack
      className="vendereApp"
      p={screenWidth <= 1000 ? 0 : 4}
      alignItems={'center'}
    >
      <ResponsiveNav active={'ManageItems'} setItems={props.setItems} />

      <VStack
        id="appContentWrapper"
        ml={'0px !important'}
        h={'100%'}
        style={{
          background:
            colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-400)',
          borderRadius: screenWidth <= 1000 ? 0 : '12px',
          width: screenWidth <= 1000 ? '100%' : 'calc(100% - 200px)',
          paddingTop: 6,
          padding: 8,
          height: '100%',
          alignItems: 'flex-start',
        }}
      >
        <ActionTopBar />

        <HStack h={'calc(100% - 40px)'} w={'100%'} mt={'4px !important'}>
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
            {/* Title */}
            <HStack
              alignSelf={'flex-start'}
              px={3}
              w={'100%'}
              justifyContent={'space-between'}
              mb={1}
            >
              <HStack opacity={0.5}>
                <Icon as={Inventory2OutlinedIcon} />
                <Text fontWeight={'bold'}>All Products</Text>
              </HStack>
            </HStack>

            {/* Search Box */}
            <HStack px={3} w={'100%'}>
              <SearchBox
                data={data}
                placeholder={'Search product by name or code'}
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
            <ItemsList
              data={data}
              setData={setData}
              setItemIndex={setItemIndex}
              selectItem={selectItem}
              setSelectedItem={setSelectedItem}
              search={search}
              refresh={refresh}
            />

            <HStack w={'100%'} px={3} mt={'0px !important'} pt={3}>
              <AddItem />
            </HStack>
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
              <Text fontWeight={'bold'}>Product Details</Text>
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
              <VStack w={'100%'}>
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
                  <Text>{selectedItem?.modal?.toLocaleString()}</Text>
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
                  <Text>{selectedItem?.price?.toLocaleString()}</Text>
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
                  <Text>{selectedItem?.stock?.toLocaleString()}</Text>
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
                  <UpdateItem />
                  <DeleteItem />
                </ButtonGroup>
              </HStack>
            )}
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
}
