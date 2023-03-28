import { useState, useEffect } from 'react';

import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  HStack,
  useColorMode,
  VStack,
  Text,
  Button,
  Icon,
} from '@chakra-ui/react';

// MUI Icons
import { SummarizeOutlined } from '@mui/icons-material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// My Component
import ResponsiveNav from '../components/ResponsiveNav';
import { SearchBox } from '../components/Inputs';
import { ActionTopBar } from '../components/ActionTopBar';
import { ReportDetails, ReportsList } from '../components/ReportsComponents';

export default function Reports(props) {
  const { colorMode } = useColorMode();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
  });

  const dateOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const [data, setData] = useState([]);
  const [reportType, setReportType] = useState('Monthly');
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
      const selectedItemPeriod = document.querySelector(
        `.items > :nth-child(${index}) p`
      )?.textContent;
      // console.log(selectedItemPeriod);

      selectedItem = data.find(item => {
        // console.log(item.period, selectedItemPeriod);
        return item.period == selectedItemPeriod;
      });
    }

    if (selectedItem) {
      const listElm = document.querySelectorAll('.items > div > p');
      listElm.forEach((key, index) => {
        if (key.textContent == selectedItem.period) {
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
      // console.log(selectedItemToSet);
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
      <ResponsiveNav active={'Reports'} />

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
          {/* Reportss Section */}
          <VStack
            style={{
              width: screenWidth <= 1000 ? '100%' : '50%',
              height: '100%',
              overflowY: 'auto',
              paddingBottom: screenWidth <= 1000 ? '66px' : '',
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
                <Icon as={SummarizeOutlined} />
                <Text fontWeight={'bold'}>All Reports</Text>
              </HStack>
              <Menu>
                <MenuButton
                  as={Button}
                  size={'sm'}
                  pr={1}
                  rightIcon={<ArrowDropDownIcon />}
                  variant={'ghost'}
                  _hover={{
                    background:
                      colorMode === 'light'
                        ? 'var(--light-dim)'
                        : 'var(--p-300)',
                  }}
                  _active={{
                    background:
                      colorMode === 'light' ? 'var(--p-75)' : 'var(--p-350)',
                  }}
                >
                  {reportType}
                </MenuButton>

                <MenuList
                  zIndex={99}
                  bg={colorMode === 'light' ? 'var(--p-50)' : 'var(--p-400)'}
                >
                  <MenuItem
                    bg={'transparent'}
                    _hover={{
                      background:
                        colorMode === 'light'
                          ? 'var(--light-dim)'
                          : 'var(--p-300)',
                    }}
                    onClick={() => {
                      setReportType('Monthly');
                    }}
                  >
                    Mothly
                  </MenuItem>
                  <MenuItem
                    bg={'transparent'}
                    _hover={{
                      background:
                        colorMode === 'light'
                          ? 'var(--light-dim)'
                          : 'var(--p-300)',
                    }}
                    onClick={() => {
                      setReportType('Yearly');
                    }}
                  >
                    Yearly
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>

            {/* Search Box */}
            <HStack px={3} w={'100%'}>
              <SearchBox
                placeholder={'Search report by period'}
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
                PERIOD
              </Text>
              <Text fontWeight={'bold'} w={'50%'}>
                SUMMARY
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
            <ReportsList
              reportType={reportType}
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
          </VStack>

          {/* Trans Details Section*/}
          {screenWidth <= 1000 ? null : (
            <ReportDetails
              reportType={reportType}
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
