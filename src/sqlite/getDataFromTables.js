import SQLite from 'react-native-sqlite-storage';
import {constants} from '../constants/constants';

SQLite.enablePromise(true);

const openDatabase = async() => {
  return SQLite.openDatabase({
    name: constants.SQLITE_DB_NAME,
  });
};

export const getDataFromThemeTableById = async themeId => {
  try {
    const db = await openDatabase();
    const result = await db.executeSql(
      'SELECT * FROM theme WHERE themeId = ?;',
      [themeId],
    );
    console.log('11212', result[0].rows.item(0));
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

export const getDataFromOrgTableByOrgId = async orgId => {
  try {
    const db = await openDatabase();
    const result = await db.executeSql('SELECT * FROM orgs WHERE orgId = ?;', [
      orgId,
    ]);
    console.log('11212', result);
    if (result && result[0].rows.length > 0) {
      console.log(`Org for orgId ${orgId}:`, result[0].rows.item(0));
      return result[0].rows.item(0);
    } else {
      console.log(`No org found with orgId ${orgId}`);
      return null;
    }
  } catch (error) {
    console.log('Error in selecting org from table', error);
  }
};

export const getUserAppsFromTables = async (userId, orgId) => {
  try {
    const db = await openDatabase();
    const result = await db.executeSql(
      'SELECT * FROM userOrgXref WHERE orgId = ? AND userId = ?;',
      [orgId, userId],
    );
    if (result && result[0].rows.length > 0) {
      let appsRef = [];
      for (let i = 0; i < result[0].rows.length; i++) {
        appsRef.push(result[0].rows.item(i));
      }
      if (appsRef.length > 0) {
        const appPromise = async app => {
          return db.executeSql('SELECT * from apps where appId = ?', [
            app['appId'],
          ]);
        };
        const [[appsResponse]] = await Promise.all(
          appsRef.map(async app => await appPromise(app)),
        );
        const apps = [];
        for (let i = 0; i < appsResponse.rows.length; i++) {
          apps.push(appsResponse.rows.item(i));
        }
        return apps;
      } else {
        return [];
      }
    } else {
      return null;
    }
  } catch (error) {
    console.log('Error', error);
  }
};

export const getFormsFromTablesByAppId = async appId => {
  try {
    const db = await openDatabase();
    const [result] = await db.executeSql(
      'SELECT * FROM forms WHERE appId = ?;',
      [appId],
    );
    if (result && result.rows.length > 0) {
      const forms = [];
      for (let i = 0; i < result.rows.length; i++) {
        forms.push(result.rows.item(i));
      }
      return forms;
    } else {
      return [];
    }
  } catch (error) {
    console.log('error',error);
  }
};

export const getUserDetailsByUserId = async userId => {
  try {
    const db = await openDatabase();
    const [result] = await db.executeSql(
      'SELECT * FROM users WHERE userId = ?;',
      [userId],
    );
    if (result && result.rows.length > 0) {
      return result.rows.item(0);
    } else {
      return {};
    }
  } catch (error) {
    console.log('error');
  }
};

export const getResponsesByFormId = async formId => {
  console.log("getting reponsees",formId)

  try {
    const db = await openDatabase();
    console.log(db.openError())
    console.log(db.openSuccess())
   
    const result = await db.executeSql(
      'SELECT * FROM responses WHERE formId = ?;',
      [formId],
    );
    console.log("1111",result)
    if (result && result[0].rows.length > 0) {
      let responses = [];
      for (let i = 0; i < result[0].rows.length; i++) {
        responses.push(result[0].rows.item(i));
      }
      return responses;
    } else {
      return [];
    }
  } catch (error) {
    console.log('error',error);
  }
};

export const getResponseById = async responseId => {
  try {
    const db = await openDatabase();
    const [result] = await db.executeSql(
      'SELECT * FROM responses WHERE responseId = ?;',
      [responseId],
    );
    if (result && result.rows.length > 0) {
      return result.rows.item(0);
    } else {
      return {};
    }
  } catch (error) {
    console.log('error');
  }
};
