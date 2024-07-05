import SQLite from 'react-native-sqlite-storage';
import {constants} from '../constants/constants';

SQLite.enablePromise(true);

const openDatabase = () => {
  return SQLite.openDatabase({
    name: constants.SQLITE_DB_NAME,
  });
};

export const deleteResponseById = async responseId => {
  try {
    const db = await openDatabase();
    await db.executeSql(
      `DELETE FROM responses WHERE responseId = ?`,
      [responseId],
    );
    // if (result.rowsAffected > 0) {
    //   console.log('Record deleted successfully from the response table');
    // } else {
    //   console.log('No record found with the given ID');
    // }
  } catch (error) {
    console.log(`Error in deleteing data from the reponse table`, error);
  }
};
