import SQLite from 'react-native-sqlite-storage';
import {constants} from '../constants/constants';

SQLite.enablePromise(true);

const openDatabase = () => {
  return SQLite.openDatabase({
    name: constants.SQLITE_DB_NAME,
  });
};

export const insertDataInThemeTable = async (themeId, theme) => {
  try {
    const db = await openDatabase();
    const result = await db.executeSql(
      'INSERT OR IGNORE INTO theme (themeId, theme) VALUES (?, ?);',
      [themeId, theme],
    );
    if (result && result.rowsAffected) {
      console.log(`Data is inserted into theme Table successfully`);
    } else {
      console.log('Data is not inserted into theme Table');
    }
  } catch (error) {
    console.log('Error in inserting data in theme table', error);
  }
};

export const updateDataInThemeTable = async (themeId, theme) => {
  try {
    const db = await openDatabase();
    const result = await db.executeSql(
      'UPDATE theme SET theme = ? WHERE themeId = ?;',
      [theme, themeId],
    );
    if (result && result.rowsAffected) {
      console.log(`Theme with themeId ${themeId} updated successfully`);
    } else {
      console.log(`No theme found with themeId ${themeId} to update`);
    }
  } catch (error) {
    console.log('Error in updating theme in table', error);
  }
};
