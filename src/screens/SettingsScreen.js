import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {useEffect, useState} from 'react';
import {
  IconButton,
  Text,
  useTheme,
  TextInput,
  Icon,
  Portal,
  Dialog,
  RadioButton,
  TouchableRipple,
  Button,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../store/slices/themeSlice';
import {updateDataInThemeTable} from '../sqlite/insertOrUpdateDataInTables';

const SettingsScreen = ({navigation}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const themeSelected = useSelector(state => state.theme.theme);
  const [visible, setIsVisible] = useState(false);
  const [checked, setChecked] = useState(themeSelected);
  useEffect(() => {
    setChecked(themeSelected);
  }, [themeSelected]);
  const hideDialog = () => {
    setIsVisible(false);
    setChecked(themeSelected);
  };
  const showDialog = () => {
    setIsVisible(true);
  };
  const setThemeHandler = () => {
    updateDataInThemeTable(1, checked);
    dispatch(setTheme(checked));
    setIsVisible(false);
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
        <Text>Settings</Text>
      </View>
      <View>
        <Text style={{paddingLeft: 10, marginVertical: 10}}>Display</Text>
        <TouchableRipple onPress={showDialog}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 15,
            }}>
            <Icon size={20} source="brightness-6" />
            <View style={{marginLeft: 10, marginVertical: 5}}>
              <Text variant="titleSmall">Theme</Text>
              <Text variant="bodySmall">{themeSelected}</Text>
            </View>
          </View>
        </TouchableRipple>
      </View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Choose Theme</Dialog.Title>
          <Dialog.Content>
            <TouchableRipple onPress={() => setChecked('System Default')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="System Default"
                  status={
                    checked === 'System Default' ? 'checked' : 'unchecked'
                  }
                />
                <Text>System Default</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => setChecked('Light')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="Light"
                  status={checked === 'Light' ? 'checked' : 'unchecked'}
                />
                <Text>Light</Text>
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => setChecked('Dark')}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <RadioButton
                  value="Dark"
                  status={checked === 'Dark' ? 'checked' : 'unchecked'}
                />
                <Text>Dark</Text>
              </View>
            </TouchableRipple>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button  mode="contained" onPress={setThemeHandler}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: '#93b1a7',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
