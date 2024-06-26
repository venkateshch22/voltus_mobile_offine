import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {IconButton, Text, useTheme, TextInput} from 'react-native-paper';
import { useSelector } from 'react-redux';

const ProfileScreen = ({navigation}) => {
  const theme = useTheme();
  const userData = useSelector(state=>state.user.user);
  console.log(userData)
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
        <View style={{width:'90%',marginHorizontal:'auto'}}>
          <TextInput
          label='First Name'
          value={userData.firstName}
          editable={false}
          style={{marginVertical:10,paddingHorizontal:0}}
          underlineColor='#000'
          contentStyle={{backgroundColor:theme.colors.background}}
          />
          <TextInput
          label='Last Name'
          value={userData.lastName}
          editable={false}
          style={{marginVertical:10,paddingHorizontal:0}}
          underlineColor='#000'
          contentStyle={{backgroundColor:theme.colors.background}}
          />
          <TextInput
          label='Mobile Number'
          value={userData.mobile}
          editable={false}
          style={{marginVertical:10,paddingHorizontal:0}}
          underlineColor='#000'
          contentStyle={{backgroundColor:theme.colors.background}}
          />
          <TextInput
          label='Email'
          value={userData.email}
          editable={false}
          style={{marginVertical:10,paddingHorizontal:0}}
          underlineColor='#000'
          contentStyle={{backgroundColor:theme.colors.background}}
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

