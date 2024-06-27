import SQLite from 'react-native-sqlite-storage';
import {constants} from '../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

SQLite.enablePromise();

const openDatabase = () => {
  return SQLite.openDatabase({
    name: constants.SQLITE_DB_NAME,
  });
};


export const deleteTable = async (tableName) => {
    try {
      const db = await openDatabase();
      await db.executeSql(
        `DROP TABLE IF EXISTS ${tableName}`,
        [],
      );
      console.log(`${tableName} table deleted successfully`);
      await AsyncStorage.setItem('orgId',"");
    } catch (error) {
      console.log(`Error in creating ${tableName} table`,error)
    }
  };