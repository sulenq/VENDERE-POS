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
} from '@chakra-ui/react';

// MUI Icons
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

// My Components
import '../css/vendereApp.css';
import ResponsiveNav from '../components/ResponsiveNav';
import { ItemsList } from '../components/Items';
import { SearchBox } from '../components/Inputs';
import Invoice from '../components/Invoice';
import { PrimaryButton } from '../components/Buttons';
import { ModalContent, ModalOverlay } from '../components/Modals';
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

  const dateOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
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

  const ScanItem = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
      <>
        <PrimaryButton
          label="Scan Barcode / QR Code"
          onClick={onOpen}
          w={'100%'}
        />

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent />
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
      p={screenWidth <= 1000 ? 0 : 4}
      alignItems={'center'}
      // backgroundImage={colorMode === 'light' ? `url(${bgDark})` : ''}
      // backgroundImage={`url(${bgDark})`}
    >
      <ResponsiveNav active={'Cashier'} />
      <VStack
        id="appContentWrapper"
        ml={'0px !important'}
        h={'100%'}
        style={{
          background:
            colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-400a)',
          borderRadius: screenWidth <= 1000 ? 0 : '12px',
          width: screenWidth <= 1000 ? '100%' : 'calc(100% - 200px)',
          padding: 8,
          height: '100%',
          alignItems: 'flex-start',
        }}
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
                paddingBottom: screenWidth <= 1000 ? '64px' : '',
                borderRadius: '12px',
                background: colorMode === 'light' ? 'white' : 'var(--p-400a)',
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
