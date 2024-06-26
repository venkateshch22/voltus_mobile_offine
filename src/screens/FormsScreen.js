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
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';

const FormsScreen = ({navigation}) => {
  const {logout} = useAuth();
  const theme = useTheme();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const orgData = useSelector(state => state.org.org);

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
  const logoutHandler = () => {
    logout();
  };
  return (
    <View style={{flex: 1, backgroundColor: theme.colors.background}}>
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: theme.colors.primaryContainer,
          elevation: 3,
        }}>
        <IconButton
          icon="arrow-left"
          size={25}
          onPress={() => navigation.goBack()}
        />
        <Text>Forms</Text>
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
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => navigation.navigate('SubmittedReports')}>
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
              DMR
            </Text>
          </Surface>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormsScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: '#93b1a7',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
});
