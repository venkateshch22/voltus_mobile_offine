import SQLite from 'react-native-sqlite-storage';
import {constants} from '../constants/constants';

SQLite.enablePromise(true);

const openDatabase = () => {
  return SQLite.openDatabase({
    name: constants.SQLITE_DB_NAME,
  });
};

export const createThemeTable = async () => {
  try {
    const db = await openDatabase();
    await db.executeSql(
      'CREATE TABLE IF NOT EXISTS theme (themeId INT PRIMARY KEY NOT NULL, theme TEXT NOT NULL)',
      [],
    );
    console.log('THEME table created successfully');
  } catch (error) {
    console.log("Error in creating THEME table",error)
  }
};

export const createOrgTable = async () => {
    try {
      const db = await openDatabase();
      await db.executeSql(
        'CREATE TABLE IF NOT EXISTS orgs (orgId TEXT PRIMARY KEY NOT NULL, orgName TEXT NOT NULL, orgImage TEXT ,orgUrl TEXT NOT NULL)',
        [],
      );
      console.log('ORG table created successfully');
    } catch (error) {
      console.log("Error in creating ORG table",error)
    }
  };

  export const createUsersTable = async () => {
    try {
      const db = await openDatabase();
      await db.executeSql(
        'CREATE TABLE IF NOT EXISTS users (userId TEXT PRIMARY KEY NOT NULL, firstName TEXT, lastName TEXT ,email TEXT NOT NULL, password TEXT NOT NULL, mobile TEXT)',
        [],
      );
      console.log('USERS table created successfully');
    } catch (error) {
      console.log("Error in creating USERS table",error)
    }
  };

  export const createAppsTable = async () => {
    try {
      const db = await openDatabase();
      await db.executeSql(
        'CREATE TABLE IF NOT EXISTS apps (appId TEXT PRIMARY KEY NOT NULL, appName TEXT, appDescription TEXT )',
        [],
      );
      console.log('APPS table created successfully');
    } catch (error) {
      console.log("Error in creating APPS table",error)
    }
  };

  // export const createUserOrgXrefTable = async () => {
  //   try {
  //     const db = await openDatabase();
  //     await db.executeSql(
  //       'CREATE TABLE IF NOT EXISTS userOrgXref (userId TEXT , orgId TEXT, appId TEXT )',
  //       [],
  //     );
  //     console.log('userOrgXref table created successfully');
  //   } catch (error) {
  //     console.log("Error in creating userOrgXref table",error)
  //   }
  // };
  export const createUserOrgXrefTable = async () => {
    try {
      const db = await openDatabase();
      await db.executeSql(
        `CREATE TABLE IF NOT EXISTS userOrgXref (
           userId TEXT,
           orgId TEXT,
           appId TEXT,
           PRIMARY KEY (userId, orgId, appId),
           FOREIGN KEY (userId) REFERENCES users(userId),
           FOREIGN KEY (orgId) REFERENCES orgs(orgId),
           FOREIGN KEY (appId) REFERENCES apps(appId)
         );`,
        [],
      );
      console.log('userOrgXref table created successfully');
    } catch (error) {
      console.error('Error in creating userOrgXref table', error);
    }
  };


  export const createFormsTable = async () => {
    try {
      const db = await openDatabase();
      await db.executeSql(
        'CREATE TABLE IF NOT EXISTS forms (formId TEXT PRIMARY KEY NOT NULL, appId TEXT NOT NULL, formName TEXT, formJson TEXT NOT NULL, themeJson TEXT)',
        [],
      );
      console.log('FORMS table created successfully');
    } catch (error) {
      console.log("Error in creating FORMS table",error)
    }
  };

  export const createResponsesTable = async () => {
    try {
      const db = await openDatabase();
      await db.executeSql(
        'CREATE TABLE IF NOT EXISTS responses (responseId TEXT PRIMARY KEY NOT NULL, formId TEXT NOT NULL, responseJson TEXT, createdTime TEXT NOT NULL, statusId INT)',
        [],
      );
      console.log('RESPONSES table created successfully');
    } catch (error) {
      console.log("Error in creating RESPONSES table",error)
    }
  };