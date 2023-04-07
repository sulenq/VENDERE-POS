import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

import { HStack, useColorMode, VStack, Text, Icon } from '@chakra-ui/react';

// MUI Icons
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

// My Component
import ResponsiveNav from '../components/ResponsiveNav';
import { SearchBox } from '../components/Inputs';
import { PrimaryButton, PrimaryButtonOutline } from '../components/Buttons';
import { ActionTopBar } from '../components/ActionTopBar';
import { Stat } from '../components/Data';
import { ModalContent, ModalFooter, ModalOverlay } from '../components/Modals';
import { Input, InputNumber } from '../components/Inputs';
import { Skeleton } from '../components/Skeleton';
import { DebtDetails, DebtsList } from '../components/DebtsComponents';

export default function Debts(props) {
  const { colorMode } = useColorMode();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
  });

  const dateOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  };

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
      const selectedItemId = document.querySelector(
        `.items > :nth-child(${index}) p`
      )?.textContent;
      // console.log(selectedItemId);

      selectedItem = data.find(item => {
        // console.log(item.ID);
        return item.ID == selectedItemId;
      });
    }

    if (selectedItem) {
      const transListElm = document.querySelectorAll('.items > div > p');
      transListElm.forEach((transID, index) => {
        if (transID.textContent == selectedItem.ID) {
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

  return (
    <HStack
      className="vendereApp"
      p={screenWidth <= 1000 ? 0 : 4}
      alignItems={'center'}
    >
      <ResponsiveNav active={'Support'} />

      <VStack
        id="appContentWrapper"
        ml={'0px !important'}
        h={'100%'}
        style={{
          background:
            colorMode === 'light' ? 'var(--light-dim)' : 'var(--p-400a)',
          borderRadius: screenWidth <= 1000 ? 0 : '12px',
          width: screenWidth <= 1000 ? '100%' : '100%',
          padding: 8,
          height: '100%',
          alignItems: 'flex-start',
        }}
      >
        <ActionTopBar />

        <HStack
          h={'calc(100% - 40px)'}
          w={'100%'}
          mt={'4px !important'}
          justifyContent={'center'}
        >
          <VStack w={'100%'} px={8}>
            <Text textAlign={'center'} fontSize={'5rem'} fontWeight={'bold'}>
              Support Page Coming Soon!
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
}
