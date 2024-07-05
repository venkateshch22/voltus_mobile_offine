import {StyleSheet, View, TouchableOpacity, Animated} from 'react-native';
import {useState, useEffect, useRef} from 'react';
import moment from 'moment';
import {Text, IconButton, Icon, useTheme} from 'react-native-paper';

const AnimatedIcon = Animated.createAnimatedComponent(IconButton);

const Record = ({response, onDeleteRecord}) => {
  const theme = useTheme();
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
  const syncReportHandler = () => { 
    
    setIsSyncing(true)
   }

   const deleteReportHandler = (id) => { 
    onDeleteRecord(id)
    }
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ReportView', {
          formId: response.formId,
          responseId: response.responseId,
        })
      }
      activeOpacity={0.8}
      key={response.responseId}>
      <View
        style={{
          height: 50,
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: 5,
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 10,
          marginBottom: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            source="calendar-today"
            size={25}
            color={theme.colors.onSurfaceVariant}
          />
          <Text
            variant="labelLarge"
            style={{
              paddingLeft: 5,
              color: theme.colors.onSurfaceVariant,
            }}>
            {moment(response.createdTime).format('Do MMMM YYYY, h:mm:ss a')}
          </Text>
        </View>

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {isSyncing ? (
            <AnimatedIcon
              icon="sync"
              iconColor={theme.colors.onSurfaceVariant}
              size={25}
              
              style={{transform: [{rotate}],margin:0}}
            />
          ) : (
            <IconButton
              icon={response.statusId === "0" ? 'sync' : 'cached'}
              iconColor={theme.colors.onSurfaceVariant}
              size={25}
              onPress={() => syncReportHandler()}
              style={{margin: 0}}
              animated={true}
            />
          )}
          <IconButton
            icon="delete-outline"
            iconColor={theme.colors.onSurfaceVariant}
            size={25}
            onPress={() => deleteReportHandler(response.responseId)}
            style={{margin: 0}}
            animated={true}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Record;

const styles = StyleSheet.create({});
