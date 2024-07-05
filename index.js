import {AppRegistry} from 'react-native';
import {useEffect} from 'react';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/store/store';
import {createThemeTable} from './src/sqlite/createTables';
import {insertDataInThemeTable} from './src/sqlite/insertOrUpdateDataInTables';
import {AuthProvider} from './src/context/AuthContext';
import 'react-native-get-random-values'

export default function Main() {
  useEffect(() => {
    createThemeTable();
    insertDataInThemeTable(1, 'System Default');
  }, []);
  return (
    <Provider store={store}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
