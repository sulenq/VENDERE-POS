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
    }, 1);
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
                      <Text w={'80px'}>ID</Text>
                      <Text fontWeight={'bold'}>{props?.selectedItem?.ID}</Text>
                    </HStack>
                    <HStack w={'100%'}>
                      <Text w={'80px'}>Username</Text>
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

export { EmployeeDetails, EmployeesList };
