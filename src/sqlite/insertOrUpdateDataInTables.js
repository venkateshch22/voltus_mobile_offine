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
    if (result && result[0].rowsAffected) {
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
    if (result && result[0].rowsAffected) {
      console.log(`Theme with themeId ${themeId} updated successfully`);
    } else {
      console.log(`No theme found with themeId ${themeId} to update`);
    }
  } catch (error) {
    console.log('Error in updating theme in table', error);
  }
};

export const insertDataInOrgTable = async (
  orgId,
  orgName,
  orgImage,
  orgUrl,
) => {
  try {
    const db = await openDatabase();
    const result = await db.executeSql(
      'INSERT OR IGNORE INTO orgs (orgId, orgName, orgImage, orgUrl) VALUES (?, ?, ?, ?);',
      [orgId, orgName, orgImage, orgUrl],
    );
    if (result && result[0].rowsAffected) {
      console.log(`Data is inserted into orgs Table successfully`);
    } else {
      console.log('Data is not inserted into orgs Table');
    }
  } catch (error) {
    console.log('Error in inserting data in orgs table', error);
  }
};

export const insertDataInUsersTable = async (
  userId,
  firstName,
  lastName,
  email,
  password,
  mobile,
) => {
  try {
    const db = await openDatabase();
    const result = await db.executeSql(
      'INSERT OR IGNORE INTO users (userId, firstName, lastName, email, password, mobile) VALUES (?, ?, ?, ?, ?, ?);',
      [userId, firstName, lastName, email, password, mobile],
    );
    console.log(result);
    if (result && result[0].rowsAffected) {
      console.log(`Data is inserted into users Table successfully`);
    } else {
      console.log('Data is not inserted into users Table');
    }
  } catch (error) {
    console.log('Error in inserting data in users table', error);
  }
};

export const insertDataInAppsTable = async apps => {
  try {
    const db = await openDatabase();
    const appPromise = async app => {
      return db.executeSql(
        'INSERT OR IGNORE INTO apps (appId, appName, appDescription) VALUES (?, ?, ?);',
        [app.appId, app.appName, app.appDescription],
      );
    };
    const responses = await Promise.all(apps.map(async (app)=> await appPromise(app)))
    console.log("apps",responses)
  } catch (error) {
    console.log('Error in inserting data in users table', error);
  }
};

export const insertDataInUserOrgXrefTable = async apps => {
  try {
    const db = await openDatabase();
    const appPromise = async app => {
      return db.executeSql(
        'INSERT OR IGNORE INTO userOrgXref (userId, orgId, appId) VALUES (?, ?, ?);',
        [app.userId, app.orgId, app.appId],
      );
    };
    const responses = await Promise.all(apps.map(async (app)=> await appPromise(app)))
    console.log("userOrgXref insertion data",responses)
  } catch (error) {
    console.log('Error in inserting data in users table', error);
  }
};

export const insertDataInFormsTable = async forms => {
  console.log("454545",forms)
  try {
    const db = await openDatabase();
    const formPromise = async form => {
      return db.executeSql(
        'INSERT OR IGNORE INTO forms (formId, appId, formName, formJson, themeJson) VALUES (?, ?, ?, ?, ?);',
        [form.formId, form.appId, form.formName, JSON.stringify(form.formJson),  JSON.stringify(form.themeJson)],
      );
    };
    const responses = await Promise.all(forms.map(async (form)=> await formPromise(form)))
    console.log("forms",responses)
  } catch (error) {
    console.log('Error in inserting data in users table', error);
  }
};
