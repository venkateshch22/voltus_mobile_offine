import {StyleSheet, View, Image} from 'react-native';
import React from 'react';
import {IconButton, Text, useTheme, TextInput} from 'react-native-paper';

const AppInfoScreen = ({navigation}) => {
  const theme = useTheme();

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
        <Text>App Info</Text>
      </View>
      <View style={{flex: 1}}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../assets/vbtwin-logo.png')}
          />
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text variant="titleMedium" style={{fontWeight: 500}}>
            VBtwin Offline
          </Text>
          <Text
            variant="labelMedium"
            style={{
              fontWeight: 100,
              marginTop: 2,
              color: theme.colors.tertiary,
            }}>
            Version {'1.0'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AppInfoScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: '#93b1a7',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 150,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});
