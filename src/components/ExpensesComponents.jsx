import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';
import { useAuthUser } from 'react-auth-kit';

// Chakra UI
import {
  useColorMode,
  Text,
  VStack,
  HStack,
  Icon,
  Modal,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

// MUI Icons
import SearchOffOutlinedIcon from '@mui/icons-material/SearchOffOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import '../css/vendereApp.css';
import { PrimaryButton } from './Buttons';
import { Skeleton } from './Skeleton';
import { ModalContent, ModalOverlay, ModalBody } from './Modals';

const ExpensesList = props => {
  const baseURL = 'http://localhost:8080';
  const { colorMode } = useColorMode();
  // const location = useLocation();
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

    const getItemsAPI = `${baseURL}/api/v1/bebans/get`;

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
    }, 1);
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
        const date = new Date(item.CreatedAt);
        const formattedDate = date.toLocaleDateString(undefined, dateOptions);
        return (
          formattedDate?.toLowerCase()?.includes(props.search?.toLowerCase()) ||
          item?.total?.toString()?.includes(props?.search) ||
          item.jenis?.toLowerCase()?.includes(props?.search?.toLowerCase())
        );
      });
    }

    if (isItemFound) {
      setItemFound(true);
    } else {
      setItemFound(false);
      props.setSelectedItem({});
    }
  }, [props.search, props.data, props.refreshs]);

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
          Expense Not Found
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
          className={colorMode === 'light' ? 'items onLight' : 'items onDark'}
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
            const date = new Date(item.CreatedAt);
            const formattedDate = date.toLocaleDateString(
              undefined,
              dateOptions
            );

            if (
              formattedDate
                ?.toLowerCase()
                ?.includes(props.search?.toLowerCase()) ||
              item?.total?.toString()?.includes(props?.search) ||
              item.jenis?.toLowerCase()?.includes(props?.search?.toLowerCase())
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
                  {/* Expense Date */}
                  <Text className="expensesID" display={'none'}>
                    {item?.ID}
                  </Text>
                  <Text ml={'0 !important'} w={'35%'} p={'4px 8px'}>
                    {formattedDate}
                  </Text>

                  {/* Expense Username */}
                  <VStack w={'45%'} alignItems={'flex-start'} pr={4}>
                    <Text fontWeight={'bold'}>
                      {item?.total?.toLocaleString('id-ID')}
                    </Text>
                    <Text mt={'4px !important'}>{item?.jenis}</Text>
                  </VStack>

                  {/* Expense Action */}
                  <VStack
                    w={'20%'}
                    className={'actionBtnSection'}
                    alignSelf={'center'}
                  >
                    {screenWidth <= 1000 ? (
                      <ExpenseDetailsModal
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

const ExpenseDetails = props => {
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
        <Text fontWeight={'bold'}>Expenses Details</Text>
      </HStack>

      <VStack
        id={'itemDetails'}
        className={colorMode === 'light' ? 'onLight' : 'onDark'}
        h={selectedItem.ID ? 'calc(100% - 96px)' : '100%'}
        w={'100%'}
        mt={'0px !important'}
        fontSize={'sm'}
        overflowY={'auto'}
      >
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
              Total
            </Text>
            <Text w={'calc(100% - 150px)'} fontWeight={'bold'}>
              {selectedItem?.total?.toLocaleString('id-ID')}
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
              Expense Type
            </Text>
            <Text w={'calc(100% - 150px)'}>{selectedItem?.jenis}</Text>
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
              Notes
            </Text>
            <Text
              w={'calc(100% - 150px)'}
              opacity={props?.selectedItem?.notes ? 1 : 0.5}
            >
              {props?.selectedItem?.notes || 'no notes'}
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

      {props.selectedItem.ID && screenWidth <= 1000 && (
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
        >
          <PrimaryButton label={'Got It'} w={'100%'} onClick={props.onClose} />
        </HStack>
      )}
    </VStack>
  );
};

const ExpenseDetailsModal = props => {
  // console.log(props);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

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
          h={screenWidth <= 1000 ? '90%' : ''}
          content={
            <>
              <ModalBody
                content={
                  <>
                    <ModalCloseButton borderRadius={50} />

                    <ExpenseDetails
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

export { ExpensesList, ExpenseDetails, ExpenseDetailsModal };
