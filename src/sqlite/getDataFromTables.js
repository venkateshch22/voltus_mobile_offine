import SQLite from 'react-native-sqlite-storage';
import {constants} from '../constants/constants';

SQLite.enablePromise(true);

const openDatabase = () => {
  return SQLite.openDatabase({
    name: constants.SQLITE_DB_NAME,
  });
};

export const getDataFromThemeTableById = async (themeId) => {
  try {
    const db = await openDatabase();
    const result = await db.executeSql(
        'SELECT * FROM theme WHERE themeId = ?;',
        [themeId]
      );
      console.log("11212",result[0].rows.item(0))
    if (result && result[0].rows.length > 0) {
        console.log(`Theme for themeId ${themeId}:`, result[0].rows.item(0));
      return result[0].rows.item(0);
    } else {
        console.log(`No theme found with themeId ${themeId}`);
      return null;
    }
  } catch (error) {
    console.log('Error in selecting theme from table', error);
  }
};