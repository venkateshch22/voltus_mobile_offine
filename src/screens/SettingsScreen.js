import { StyleSheet, View,Image,TouchableOpacity } from 'react-native'
import {useState,useEffect} from 'react';
import {IconButton,Text,useTheme,Icon,Portal,Dialog,RadioButton,TouchableRipple,Button} from 'react-native-paper';
import {useDispatch,useSelector} from 'react-redux';
import {setTheme} from '../store/slices/themeSlice';
import {updateDataInThemeTable} from '../sqlite/insertOrUpdateDataInTables'



const SettingsScreen = () => {
  return (
    <View>
      <Text>SettingsScreen</Text>
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({})