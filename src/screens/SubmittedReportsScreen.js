import {
  Pressable,
  TouchableOpacity,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import {useState, useEffect, useRef} from 'react';
import {Text, useTheme, Surface, IconButton, Icon} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {getResponsesByFormId} from '../sqlite/getDataFromTables';
import moment from 'moment';
import {deleteResponseById} from '../sqlite/deleteDataFromTables';
import {ScrollView} from 'react-native';
import Record from '../components/Record';
import toastMessage from '../commonFunctions/toastMessage';

const AnimatedIcon = Animated.createAnimatedComponent(IconButton);

const SubmittedReportsScreen = ({navigation, route}) => {
  const {formId} = route.params;
  const theme = useTheme();
  const [netorkStatus, setNetworkStatus] = useState();
  const [responses, setResponses] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSyncing) {
      Animated.loop(
        Animated.timing(rotation, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotation.setValue(0);
    }
  }, [isSyncing]);

  const rotate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-360deg'],
  });

  const checkNetworkStatus = () => {
    NetInfo.fetch().then(state => {
      setNetworkStatus(state.isConnected);
    });
  };

  const deleteReportHandler = async id => {
    await deleteResponseById(id);
    setResponses(prev => prev.filter(response => response.responseId !== id));
    toastMessage('Report deleted successfully..!!')
  };

  const getResponsesHandler = async () => {
    const result = await getResponsesByFormId(formId);
    setResponses(
      result.sort((a, b) => b.createdTime.localeCompare(a.createdTime)),
    );
  };

  useEffect(() => {
    const statusIntervalId = setInterval(checkNetworkStatus, 100);
    return () => {
      clearInterval(statusIntervalId);
    };
  }, []);

  useEffect(() => {
    getResponsesHandler();
  }, [route.params?.responseId]);

  useEffect(() => {
    getResponsesHandler();
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
            {netorkStatus ? 'Online' : 'Offline'}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 25,
          marginVertical: 20,
        }}>
        {/* <TouchableOpacity
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
        </TouchableOpacity> */}
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
              Add
            </Text>
          </Surface>
        </TouchableOpacity>
      </View>
      {!responses?.length > 0 && (
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
      )}
      <ScrollView decelerationRate="fast">
        {responses?.length > 0 &&
          responses.map(response => (
            <Record response={response} onDeleteRecord={deleteReportHandler} />
          ))}
      </ScrollView>
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
