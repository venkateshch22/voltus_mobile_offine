import {Pressable, TouchableOpacity, StyleSheet, View} from 'react-native';
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
  Portal,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';

const SubmittedReportsScreen = ({navigation, route}) => {
  const {formId} = route.params;
  const theme = useTheme();
  const [netorkStatus, setNetworkStatus] = useState();
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
        <Text style={{flex: 1}}>Submitted Reports</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            source="circle"
            size={12}
            color={netorkStatus ? '#008000' : '#bf0603'}
          />
          <Text variant="labelSmall" style={{paddingLeft: 3, paddingRight: 10}}>
            {netorkStatus ? 'Online' : 'Offlien'}
          </Text>
        </View>
      </View>
      <View
        style={{
          //   flex: 1,
          flexDirection: 'row',
          // gap: 30,
          justifyContent: 'space-between',
          marginHorizontal: 25,
          marginVertical: 20,
        }}>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => console.log('first')}>
          <Surface
            elevation={2}
            style={{
              backgroundColor: theme.colors.primary,
              width: 90,
              height: 35,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon source="sync" color={theme.colors.onPrimary} size={17} />
            <Text
              variant="bodyMedium"
              style={{
                textAlign: 'center',
                color: theme.colors.onPrimary,
                paddingLeft: 5,
              }}>
              Sync All
            </Text>
          </Surface>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.95}
          onPress={() => navigation.navigate('AddReport', {formId: formId})}>
          <Surface
            elevation={2}
            style={{
              backgroundColor: theme.colors.primary,
              width: 90,
              height: 35,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon source="plus" color={theme.colors.onPrimary} size={17} />
            <Text
              variant="bodyMedium"
              style={{
                textAlign: 'center',
                color: theme.colors.onPrimary,
                paddingLeft: 5,
              }}>
              DMR
            </Text>
          </Surface>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, alignItems: 'center', marginTop: '50%'}}>
        <View
          style={{
            width: 150,
            height: 150,
            backgroundColor: theme.colors.surfaceVariant,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 6,
          }}>
          <Icon source="text" color={theme.colors.secondary} size={100} />
        </View>
        <Text
          variant="titleMedium"
          style={{marginTop: 5, color: theme.colors.secondary}}>
          No Reports
        </Text>
      </View>
    </View>
  );
};

export default SubmittedReportsScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: '#93b1a7',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'flex-start',
  },
});
