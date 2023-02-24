import { useSignOut } from 'react-auth-kit';

export const ValidateUser = () => {
  const logout = useSignOut();

  console.log('Validating user...');

  //!Simulasi Loading
  setTimeout(() => {
    const authValidationAPI = new URL(`${baseURL}/api/v1/users/checker`);
    const authToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('_auth='));
    const authTokenValue = authToken?.split('=')[1];

    let data = {
      token_input: authTokenValue,
    };

    console.log(authTokenValue);

    axios
      .post(authValidationAPI, data, {
        headers: { Authorization: `Bearer ${authTokenValue}` },
      })
      .then(r => {
        console.log(r);
        toast({
          position: screenWidth <= 1000 ? 'top-center' : 'bottom-right',
          title: `Validated as ${r.data.data.role}`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        if (r.data.data.role === 'admin') {
          navigate('/vendere-app');
        } else if (r.data.data.role) {
          navigate('/vendere-app/cashier');
        }
      })
      .catch(err => {
        console.log(err);
        logout();
      });
  }, 5000);
  //!Simulasi Loading

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
};
