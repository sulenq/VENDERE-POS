import { useState, useEffect } from 'react';
import { useSignOut } from 'react-auth-kit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Chakra UI
import { VStack, useToast, Icon, Text, Spinner } from '@chakra-ui/react';

// MUI Icons
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';

export default function RequireRoleAuth(props) {
  const baseURL = 'http://localhost:8080';

  const logout = useSignOut();

  const navigate = useNavigate();

  const [done, setDone] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState('');

  const toast = useToast();

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
  });

  console.log('Validating user...');

  //*Simulasi Loading
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
        console.log(r);
        if (r.status === 200 && r.data.data.message === 'token benar') {
          console.log(r.data.data.role);
          setIsAuth(true);
          setRole(r.data.data.role);
          setDone(true);
        }
      })
      .catch(err => {
        console.log(err);
        logout();
        navigate(props.loginPath);
      });
  }, 1000);
  //*Simulasi Loading

  if (done) {
    if (isAuth) {
      if (props.restriction === role) {
        return props.element;
      } else {
        switch (role) {
          case 'admin':
            navigate('/vendere-app');
            break;
          case 'cashier':
            navigate('/vendere-app/cashier');
        }
      }
    } else {
      navigate(props.loginPath);
    }
  } else {
    return (
      <VStack
        style={{
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
