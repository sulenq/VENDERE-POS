import { useState, useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';
import Cookies from 'js-cookie';
import axios from 'axios';

// Chakra UI
import {
  useColorMode,
  HStack,
  VStack,
  Icon,
  Text,
  Modal,
  useDisclosure,
  ModalHeader,
  Alert,
  AlertDescription,
  AlertIcon,
  ModalCloseButton,
} from '@chakra-ui/react';

// MUI Icons
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';

// My Components
import '../css/vendereApp.css';
import ResponsiveNav from '../components/ResponsiveNav';
import { ItemsList } from '../components/Items';
import { SearchBox } from '../components/Inputs';
import Invoice from '../components/Invoice';
import { PrimaryButton } from '../components/Buttons';
import { ModalBody, ModalContent, ModalOverlay } from '../components/Modals';
import { ActionTopBar } from '../components/ActionTopBar';

export default function Cashier({
  total,
  setTotal,
  cartList,
  setCartList,
  addItemToCartList,
}) {
  const { colorMode } = useColorMode();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  document.documentElement.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!screenWidth <= 1000) {
        // const addItemBtn = document.querySelector('#addItemBtn');
        // addItemBtn.click();

        const itemSearchBox = document.querySelector('#itemSearchBox');

        itemSearchBox.focus();
      }
    }
  });

  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [itemIndex, setItemIndex] = useState(1);
  const [itemsLength, setItemsLength] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [refresh, setRefresh] = useState(true);

  const [barcode, setBarcode] = useState('no code scanned');

  const dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

  const baseURL = 'http://localhost:8080';
  const [loading, setLoading] = useState(false);
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
            setData(r.data.data);
          } else {
            setData([]);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(setLoading(false));
    }, 1);
  }, [refresh]);

  function selectItem({ item, index }) {
    let selectedItem;
    const items = document.querySelectorAll('.items > div');

    if (item) {
      selectedItem = item;
    } else {
      // selectedItem = data[index - 1];
      const selectedItemKey = document.querySelector(
        `.items > :nth-child(${index}) .itemID`
      )?.textContent;

      selectedItem = data.find(item => {
        return item.ID == selectedItemKey;
      });
    }

    if (selectedItem) {
      const itemsKeyElm = document.querySelectorAll('.items > div > .itemID');

      itemsKeyElm.forEach((itemKeyElm, index) => {
        if (itemKeyElm.textContent == selectedItem.ID) {
          setItemIndex(index + 1);
        }
      });

      function selectedItemStruct(selectedItem) {
        const CreatedAt = new Date(selectedItem.CreatedAt);

        const UpdatedAt = new Date(selectedItem.UpdatedAt);

        const DeletedAt = new Date(selectedItem.DeletedAt);

        const formattedCreatedAt = CreatedAt.toLocaleDateString(
          'id-ID',
          dateOptions
        );

        const formattedUpdatedAt = UpdatedAt.toLocaleDateString(
          'id-ID',
          dateOptions
        );

        const formattedDeletedAt = DeletedAt.toLocaleDateString(
          'id-ID',
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

  const ScanItem = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <PrimaryButton
          label="Scan Barcode / QR Code"
          onClick={onOpen}
          w={'100%'}
        />

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent
            content={
              <>
                <ModalCloseButton borderRadius={50} />
                <ModalHeader px={4}>
                  <HStack>
                    <Icon as={CropFreeOutlinedIcon} />
                    <Text>Scanning</Text>
                  </HStack>
                </ModalHeader>

                <ModalBody
                  content={
                    <>
                      <VStack>
                        <Alert borderRadius={8}>
                          <AlertIcon
                            mt={'2px !important'}
                            alignSelf={'flex-start'}
                          />
                          <AlertDescription>
                            Use your scanner hardware, scanned code below
                          </AlertDescription>
                        </Alert>
                        <HStack fontSize={'x-large'} py={3}>
                          <Text opacity={0.5}>Code : </Text>
                          <Text>{barcode}</Text>
                        </HStack>
                      </VStack>
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

  // Ctrl to checkout
  // document.documentElement.addEventListener('keydown', e => {
  //   if (e.ctrlKey) {
  //     const checkoutConfirmationBtn = document.querySelector(
  //       '#checkoutConfirmationBtn'
  //     );
  //     checkoutConfirmationBtn.click();
  //   }
  // });

  return (
    <HStack
      className="vendereApp"
      alignItems={'center'}
      justifyContent={'flex-end'}
    >
      <ResponsiveNav active={'Cashier'} />
      <VStack
        id="appContentWrapper"
        w={screenWidth <= 1000 ? '100%' : 'calc(100% - 90px)'}
        bg={colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-400a)'}
        h={'100%'}
        ml={'0px !important'}
        p={2}
        alignItems={'flex-start'}
      >
        <ActionTopBar />

        <HStack h={'calc(100% - 40px)'} w={'100%'} mt={'4px !important'}>
          {screenWidth <= 1000 ? (
            ''
          ) : (
            <VStack
              style={{
                width: '50%',
                height: '100%',
                overflowY: 'auto',
                paddingBottom: screenWidth <= 1000 ? '66px' : '',
                borderRadius: '20px',
                background:
                  colorMode === 'light' ? 'var(--p-50)' : 'var(--p-400a)',
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
                loading={loading}
                setData={setData}
                selectedItem={selectedItem}
                setItemIndex={setItemIndex}
                selectItem={selectItem}
                setSelectedItem={setSelectedItem}
                search={search}
                addItemToCartList={addItemToCartList}
                refresh={refresh}
              />

              <HStack w={'100%'} px={3} mt={'0px !important'} pt={3}>
                <ScanItem />
              </HStack>
            </VStack>
          )}
          <Invoice
            data={data}
            setData={setData}
            selectedItem={selectedItem}
            itemsLength={itemsLength}
            setItemsLength={setItemsLength}
            itemIndex={itemIndex}
            setItemIndex={setItemIndex}
            selectItem={selectItem}
            setSelectedItem={setSelectedItem}
            search={search}
            refresh={refresh}
            total={total}
            setTotal={setTotal}
            cartList={cartList}
            setCartList={setCartList}
            setSearch={setSearch}
            addItemToCartList={addItemToCartList}
            ScanItem={<ScanItem />}
          />
        </HStack>
      </VStack>
    </HStack>
  );
}
