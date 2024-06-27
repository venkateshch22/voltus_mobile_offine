import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useState, useEffect} from 'react';
import {useAuth} from '../context/AuthContext';
import {
  Button,
  IconButton,
  Portal,
  Dialog,
  Tooltip,
  Icon,
  TextInput,
  Text,
  useTheme,
  Snackbar,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getOrgDetailsApi, loginApi, getOfflineAppsApi} from '../api/apiCall';
import {initOrg} from '../store/slices/orgSlice';
import {initUser} from '../store/slices/userSlice';
import {initApps} from '../store/slices/appsSlice';
import {
  insertDataInAppsTable,
  insertDataInOrgTable,
  insertDataInUsersTable,
} from '../sqlite/insertOrUpdateDataInTables';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import {
  getDataFromOrgTableByOrgUrl,
  getUserDetailsFromUsersTable,
} from '../sqlite/getDataFromTables';
import toastMessage from '../commonFunctions/toastMessage';

const LoginScreen = ({navigation}) => {
  const org = useSelector(state => state.org.org);
  const redApps = useSelector(state=> state.apps.apps);
  console.log(redApps)
  console.log('loginscreen===>', org);
  const {login, isAuthenticated} = useAuth();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [orgUrl, setOrgUrl] = useState(org.orgUrl);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [orgSettingsErrorMessage, setOrgSettingsErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [networkStatus, setNetworkStatus] = useState();
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const theme = useTheme();
  const dispatch = useDispatch();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    setOrgUrl(org.orgUrl);
  }, [org]);

  useEffect(()=>{
    console.log(redApps)
  },[redApps])

  const checkNetworkStatus = () => {
    NetInfo.fetch().then(state => {
      setNetworkStatus(state.isConnected);
    });
  };

  useEffect(() => {
    const statusIntervalId = setInterval(checkNetworkStatus, 100);
    return () => {
      clearInterval(statusIntervalId);
    };
  }, []);

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setOrgUrl(org.orgUrl);
    setOrgSettingsErrorMessage('');
    setVisible(false);
  };

  const checkIsEmail = () => {
    if (emailPattern.test(email)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const emailHandler = text => {
    setLoginErrorMessage('');
    setEmail(text);
    if (emailPattern.test(text)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };
  const passwordHandler = text => {
    setLoginErrorMessage('');
    setPassword(text);
    if (password.length > 0) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };
  const passwordFieldOnBlurHandler = () => {
    setShowPassword(false);
    if (password.length > 0) {
      setIsPasswordValid(false);
    }
  };
  const orgHandler = text => {
    setOrgSettingsErrorMessage('');
    if (text.includes('https://')) {
      setOrgUrl(text);
    } else {
      // setOrgUrl('https://)
    }
  };

  const loginHandler = async () => {
    if (password.length === 0 || email.length === 0) {
      if (password.length === 0) {
        setIsPasswordValid(false);
      }
      if (email.length === 0) {
        setIsValidEmail(false);
      }
      return;
    } else {
      if (networkStatus) {
        // check with API
        try {
          const response = await loginApi(org.orgId, email, password);
          console.log('user login API', response);
          if (response.status === 200) {
            const userDetails = JSON.parse(JSON.stringify(response.result));
            console.log("userDetails")
            insertDataInUsersTable(
              userDetails.userId,
              userDetails.firstName,
              userDetails.lastName,
              userDetails.email,
              userDetails.password,
              userDetails.mobile,
            );
            dispatch(
              initUser({
                userId: userDetails.userId,
                firstName: userDetails.firstName ? userDetails.firstName : '-',
                lastName: userDetails.lastName ? userDetails.lastName : '-',
                email: userDetails.email,
                mobile: userDetails.mobile ? userDetails.mobile : '-',
              }),
            );
            await AsyncStorage.setItem('userId', userDetails.userId);
            const appApiResponse = await getOfflineAppsApi(
              org.orgId,
              userDetails.userId,
            );
            console.log('offline apps api response', appApiResponse);
            if (appApiResponse.status === 200) {
              const apps = appApiResponse.result
                .map(app => ({appId: app.appId, appName: app.appName, appDescription: app.appDescription}))
                .filter(app => app.appId !== null);
              // store in apps table
              insertDataInAppsTable(apps);
              console.log(apps)
              // store in redux
              dispatch(initApps(apps))
              login()
              // store in xref
            } else if (appApiResponse.status === 400) {
            }
            toastMessage('Welcome..!!');
          } else if (
            response.status === 400 &&
            response.statusMessage === 'Invalid email or password'
          ) {
            setLoginErrorMessage(response.statusMessage);
          }
        } catch (error) {
          console.log('less', error);
        }
      } else {
        // check for local db
        toastMessage('offline login');
      }
    }
  };
  const saveOrgDetailsHandler = async () => {
    const hostName = orgUrl?.slice(8);
    if (hostName.length > 0) {
      const subDomain = hostName.split('.')[0];
      const index = hostName.indexOf('.');
      if (index !== -1) {
        const domain = hostName.slice(index + 1);
        if (domain.length > 0) {
          setOrgSettingsErrorMessage('');
          // call the api
          try {
            setIsLoading(true);
            if (networkStatus) {
              const response = await getOrgDetailsApi(subDomain, domain);
              console.log(response);
              if (response.status_code === 200) {
                console.log('save the org details');
                const org = {
                  orgUrl: orgUrl,
                  orgId: response.org_vwid,
                  orgName: response.org_name,
                  orgImage: response.org_image,
                };
                dispatch(initOrg(org));
                insertDataInOrgTable(
                  org.orgId,
                  org.orgName,
                  org.orgImage,
                  orgUrl,
                );
                await AsyncStorage.setItem('orgId', org.orgId);
                setVisible(false);
              }
            } else {
              // offline
              const orgData = await getDataFromOrgTableByOrgUrl(orgUrl);
              if (orgData) {
                dispatch(initOrg(orgData));
                await AsyncStorage.setItem('orgId', orgData.orgId);
                setVisible(false);
              } else {
                toastMessage("You're offline, Please connect to Internet");
              }
            }
            setIsLoading(false);
          } catch (error) {
            console.log('error', error);
            setIsLoading(false);
          }
        } else {
          setOrgSettingsErrorMessage('invalid');
        }
      } else {
        setOrgSettingsErrorMessage('invalid');
      }
    } else {
      setOrgSettingsErrorMessage('invalid');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1, backgroundColor: theme.colors.background}}>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>Org Settings</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="org"
                mode="outlined"
                value={orgUrl}
                onChangeText={text => orgHandler(text)}
                style={styles.input}
                error={Boolean(orgSettingsErrorMessage)}
              />
              {orgSettingsErrorMessage && (
                <Text
                  variant="labelSmall"
                  style={{color: theme.colors.error, paddingLeft: 0}}>
                  {orgSettingsErrorMessage}
                </Text>
              )}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideDialog}>Cancel</Button>
              <Button
                mode="contained"
                onPress={saveOrgDetailsHandler}
                loading={isLoading}
                disabled={isLoading}
                contentStyle={{flexDirection: 'row-reverse'}}>
                Save
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 20,
            }}>
            <Icon
              source="circle"
              color={networkStatus ? '#008000' : '#bf0603'}
              size={15}
            />
            <Text variant="labelSmall" style={{paddingLeft: 3}}>
              {networkStatus ? 'Online' : 'Offline'}
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <Tooltip title="Org Settings">
              <IconButton
                icon="cog"
                iconColor={theme.colors.primary}
                size={25}
                onPress={showDialog}
              />
            </Tooltip>
          </View>
        </View>
        <View style={{marginHorizontal: 'auto', width: '80%'}}>
          <View style={styles.imageContainer}>
            {Boolean(org.orgImage) ? (
              <Image
                style={styles.image}
                source={{
                  uri: org.orgImage
                    ? org.orgImage
                    : 'https://placehold.co/100x100',
                }}
              />
            ) : (
              <View
                style={{
                  ...styles.image,
                  backgroundColor: '#eaeaea',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon source="domain" size={50} />
              </View>
            )}
            {org.orgName && (
              <Text variant="titleMedium" style={{marginTop: 5}}>
                {org.orgName}
              </Text>
            )}
            {
              <View>
                <Text
                  variant="labelMedium"
                  style={{textAlign: 'center', color: theme.colors.error}}>
                  {loginErrorMessage}
                </Text>
              </View>
            }
          </View>
          <TextInput
            label="Email"
            mode="outlined"
            value={email}
            onChangeText={text => emailHandler(text)}
            autoCapitalize="none"
            style={styles.input}
            outlineStyle={{borderRadius: 5}}
            error={!isValidEmail}
            onBlur={checkIsEmail}
          />
          {!isValidEmail && email.length > 0 && (
            <Text
              variant="labelSmall"
              style={{color: theme.colors.error, paddingLeft: 5}}>
              *Invalid email
            </Text>
          )}
          <View style={{justifyContent: 'center'}}>
            <TextInput
              label="Password"
              mode="outlined"
              value={password}
              onChangeText={text => passwordHandler(text)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              style={styles.input}
              outlineStyle={{borderRadius: 5}}
              error={!isPasswordValid}
              onBlur={passwordFieldOnBlurHandler}
            />
            <IconButton
              icon={showPassword ? 'eye' : 'eye-off'}
              style={{position: 'absolute', right: 0, top: 22}}
              size={20}
              onPress={() => setShowPassword(!showPassword)}
            />
          </View>

          {!isPasswordValid && (
            <Text
              variant="labelSmall"
              style={{color: theme.colors.error, paddingLeft: 5}}>
              *required
            </Text>
          )}
          <Button
            mode="contained"
            onPress={loginHandler}
            style={styles.button}
            labelStyle={{fontSize: 16}}
            loading={isLoginLoading}
            disabled={isLoginLoading}>
            Login
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginTop: '20%',
    marginBottom: '15%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  input: {
    marginTop: 15,
  },
  button: {
    marginVertical: 10,
    height: 50,
    justifyContent: 'center',
    marginTop: 15,
  },
});
