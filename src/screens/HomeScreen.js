import {
  Pressable,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {useState, useEffect} from 'react';
import {useAuth} from '../context/AuthContext';
import {
  Button,
  Text,
  Menu,
  Card,
  useTheme,
  Surface,
  IconButton,
  Icon,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteTable} from '../sqlite/deleteTables';
import {
  getDataFromOrgTableByOrgId,
  getUserAppsFromTables,
} from '../sqlite/getDataFromTables';
import {initOrg} from '../store/slices/orgSlice';

const HomeScreen = ({navigation}) => {
  const {logout} = useAuth();
  const theme = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [orgData, setOrgData] = useState({});
  const [apps, setApps] = useState([]);
  const dispatch = useDispatch();

  const getDataFromLocalDb = async () => {
    const orgId = await AsyncStorage.getItem('orgId');
    const userId = await AsyncStorage.getItem('userId');
    if (orgId && userId) {
      const orgData = await getDataFromOrgTableByOrgId(orgId);
      setOrgData(orgData);
      const userApps = await getUserAppsFromTables(userId, orgId);
      setApps(userApps);
    } else {
      logout();
    }
  };

  useEffect(() => {
    getDataFromLocalDb();
  }, []);

  const openMenu = () => setShowProfileMenu(true);
  const closeMenu = () => setShowProfileMenu(false);
  const profileScreenHandler = () => {
    closeMenu();
    navigation.navigate('Profile');
  };
  const settingsScreenHandler = () => {
    closeMenu();
    navigation.navigate('Settings');
  };
  const appInfoScreenHandler = () => {
    closeMenu();
    navigation.navigate('AppInfo');
  };
  const logoutHandler = async () => {
    logout();
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('orgId');
    dispatch(
      initOrg({
        orgUrl: 'https://',
        orgId: '',
        orgName: '',
        orgImage: '',
      }),
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: theme.colors.primaryContainer,
          elevation: 3,
        }}>
        <Image
          style={styles.image}
          source={{
            uri: orgData?.orgImage
              ? orgData?.orgImage
              : 'https://placehold.co/100x100',
          }}
        />
        <View style={{paddingLeft: 8}}>
          <Text>{orgData?.orgName ? orgData?.orgName : 'Home'}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Menu
            contentStyle={{borderRadius: 5}}
            visible={showProfileMenu}
            onDismiss={closeMenu}
            anchorPosition="bottom"
            statusBarHeight={-3}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={20}
                onPress={() => openMenu()}
              />
            }>
            <Menu.Item
              leadingIcon="account-circle-outline"
              onPress={() => {
                profileScreenHandler();
              }}
              title="My Profile"
            />
            <Menu.Item
              leadingIcon="cog-outline"
              onPress={() => {
                settingsScreenHandler();
              }}
              title="Settings"
            />
            <Menu.Item
              leadingIcon="information-outline"
              onPress={() => {
                appInfoScreenHandler();
              }}
              title="App Info"
            />
            <Menu.Item
              leadingIcon="logout"
              onPress={() => {
                logoutHandler();
              }}
              title="Logout"
            />
          </Menu>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          gap: 30,
          justifyContent: 'flex-start',
          margin: 25,
          flexWrap: 'wrap',
        }}>
        {apps?.length > 0 &&
          apps?.map(app => (
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={() => navigation.navigate('Forms', {appId: app.appId})}
              key={app.appId}>
              <Surface
                elevation={2}
                style={{
                  backgroundColor: theme.colors.primary,
                  width: 100,
                  height: 100,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  variant="bodyMedium"
                  style={{textAlign: 'center', color: theme.colors.onPrimary}}>
                  {app.appName}
                </Text>
              </Surface>
            </TouchableOpacity>
          ))}
        {apps?.length === 0 && (
          <View style={{flex: 1, marginTop: '70%', alignItems: 'center'}}>
            <View
              style={{
                width: 150,
                height: 150,
                borderRadius: 6,
                backgroundColor: '#eaeaea',
                backgroundColor: theme.colors.surfaceVariant,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon source="apps" color={theme.colors.secondary} size={100} />
            </View>
            <Text
              variant="titleMedium"
              style={{marginTop: 5, color: theme.colors.secondary}}>
              No Apps
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: '#93b1a7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 30,
  },
});
