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
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
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
import { ItemsList, ItemDetails } from '../components/Items';

export default function ManageItems(props) {
  const baseURL = 'http://localhost:8080';

  const toast = useToast();

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

  const dateOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

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
          label={'Add New Product'}
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
                  {/* <Alert
                    borderRadius={'8px'}
                    status="info"
                    variant={'left-accent'}
                  >
                    <AlertIcon alignSelf={'flex-start'} />
                    Page will be refreshed after you add new item.
                  </Alert> */}

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
              width: screenWidth <= 1000 ? '100%' : '50%',
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
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              search={search}
              refresh={refresh}
              setRefresh={setRefresh}
            />

            <HStack w={'100%'} px={3} mt={'0px !important'} pt={3}>
              <AddItem />
            </HStack>
          </VStack>

          {/* Item Details */}
          {screenWidth <= 1000 ? null : (
            <ItemDetails
              selectedItem={selectedItem}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}
        </HStack>
      </VStack>
    </HStack>
  );
}
