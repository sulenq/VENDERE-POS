import { useState, useEffect } from 'react';
import { useSignOut } from 'react-auth-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

// Chakra UI
import {
  VStack,
  useToast,
  Icon,
  Text,
  Spinner,
  useColorMode,
} from '@chakra-ui/react';

// MUI Icons
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

export default function RequireRoleAuth(props) {
  const baseURL = 'http://localhost:8080';

  props.setToken(Cookies.get('_auth'));

  const logout = useSignOut();

  const navigate = useNavigate();

  const [auth, setIsAuth] = useState();

  const toast = useToast();

  const { colorMode } = useColorMode();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  //*Simulasi Loading
  useEffect(() => {
    console.log('Validating user...');
    setTimeout(() => {
      const authValidationAPI = new URL(`${baseURL}/api/v1/users/checker`);
      const authToken = document.cookie
        .split('; ')
        .find(val => val.startsWith('_auth='));
      const authTokenValue = authToken?.split('=')[1];

      let reqBody = {
        token_input: authTokenValue,
      };
      // console.log(authTokenValue);

      axios
        .post(authValidationAPI, reqBody, {
          headers: { Authorization: `Bearer ${authTokenValue}` },
        })
        .then(r => {
          // console.log(r.data.data);
          if (r.status === 200 && r.data.data.message === 'token benar') {
            setIsAuth(r.data.data);
            toast({
              position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
              title: `Validated as ${r.data.data.role}`,
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .catch(err => {
          console.log(err);
          logout();
          navigate(props.loginPath);
        });
    }, 1000);
  }, []);
  //*Simulasi Loading

  if (auth) {
    if (auth.message === 'token benar') {
      if (props.restriction === auth.role) {
        return props.element;
      } else {
        switch (auth.role) {
          case 'admin':
            navigate('/vendere-app');
            break;
          case 'cashier':
            navigate('/vendere-app/cashier');
            break;
        }
      }
    } else {
      navigate(props.loginPath);
    }
  } else {
    return (
      <VStack
        style={{
          background: colorMode === 'light' ? 'var(--p-50)' : 'var(--p-450)',
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          paddingBottom: screenWidth <= 1000 ? 20 : 0,
        }}
      >
        <Icon
          as={AdminPanelSettingsOutlinedIcon}
          style={{
            fontSize: '20rem',
            opacity: '0.03',
            position: 'absolute',
          }}
        />
        <Spinner />
        <Text fontSize={'xl'} fontWeight={'bold'}>
          Validating user...
        </Text>
        <Text style={{ width: '70%', textAlign: 'center' }}>
          The page that you are trying to access need a permission, so we are
          validating your authorization.
        </Text>
      </VStack>
    );
  }
}
