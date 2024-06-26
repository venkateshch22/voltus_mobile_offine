import {StyleSheet, Text, View,useColorScheme} from 'react-native';
import {useState, useEffect} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {AuthProvider} from './src/context/AuthContext';
import {useDispatch, useSelector} from 'react-redux';
import {PaperProvider} from 'react-native-paper';
import {darkTheme, lightTheme} from './src/constants/theme';
import {setTheme} from './src/store/slices/themeSlice';
import {getDataFromThemeTableById} from './src/sqlite/getDataFromTables';

const App = () => {
  const themeSelected = useSelector(state => state.theme.theme);
  const dispatch = useDispatch();
  const setThemeToRedux = async () => {
    try {
      const themeData = await getDataFromThemeTableById(1);
      dispatch(setTheme(themeData.theme));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setThemeToRedux();
  }, []);
  const colorScheme = useColorScheme();
  let theme;
  if (themeSelected === 'System Default') {
    theme =
      colorScheme === 'dark'
        ? {...darkTheme, roundness: 1, colors: {...darkTheme.colors}}
        : {...lightTheme, roundness: 1, colors: {...lightTheme.colors}};
  } else if (themeSelected === 'Light') {
    theme = {...lightTheme, roundness: 1, colors: {...lightTheme.colors}};
  } else if (themeSelected === 'Dark') {
    theme = {...darkTheme, roundness: 1, colors: {...darkTheme.colors}};
  }
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </PaperProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
