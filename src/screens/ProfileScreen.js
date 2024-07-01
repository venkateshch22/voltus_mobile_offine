import {StyleSheet, View, Image} from 'react-native';
import React, {useEffect,useState} from 'react';
import {IconButton, Text, useTheme, TextInput} from 'react-native-paper';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUserDetailsByUserId} from '../sqlite/getDataFromTables';

const ProfileScreen = ({navigation}) => {
  const theme = useTheme();
  const [user, setUser] = useState({});
  const getUserDetails = async () => {
    const userId = await AsyncStorage.getItem('userId');
    if (userId) {
      const userDetails = await getUserDetailsByUserId(userId);
      setUser(userDetails)
    }
  };
  useEffect(() => {
    getUserDetails();
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
        <Text>Profile</Text>
      </View>
      <View style={{flex: 1}}>
        <View style={{width: '90%', marginHorizontal: 'auto'}}>
          <TextInput
            label="First Name"
            value={user.firstName}
            editable={false}
            style={{marginVertical: 10, paddingHorizontal: 0}}
            underlineColor="#000"
            contentStyle={{backgroundColor: theme.colors.background}}
          />
          <TextInput
            label="Last Name"
            value={user.lastName}
            editable={false}
            style={{marginVertical: 10, paddingHorizontal: 0}}
            underlineColor="#000"
            contentStyle={{backgroundColor: theme.colors.background}}
          />
          <TextInput
            label="Mobile Number"
            value={user.mobile}
            editable={false}
            style={{marginVertical: 10, paddingHorizontal: 0}}
            underlineColor="#000"
            contentStyle={{backgroundColor: theme.colors.background}}
          />
          <TextInput
            label="Email"
            value={user.email}
            editable={false}
            style={{marginVertical: 10, paddingHorizontal: 0}}
            underlineColor="#000"
            contentStyle={{backgroundColor: theme.colors.background}}
          />
        </View>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: '#93b1a7',
    flexDirection: 'row',
    alignItems: 'center',
  },
  // imageContainer: {
  //   alignItems: 'center',
  //   marginTop: 150,
  //   marginBottom: 10,
  // },
  // image: {
  //   width: 100,
  //   height: 100,
  // },
});
