import {StyleSheet, Text, View} from 'react-native';
import {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useAuth} from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {initOrg} from '../store/slices/orgSlice';
import LoginScreen from '../screens/LoginScreen';
import AddReportScreen from '../screens/AddReportScreen';
import AppInfoScreen from '../screens/AppInfoScreen';
import FormsScreen from '../screens/FormsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SubmittedReportsScreen from '../screens/SubmittedReportsScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {getDataFromOrgTableByOrgId} from '../sqlite/getDataFromTables'
import {createAppsTable, createOrgTable, createUsersTable} from '../sqlite/createTables';
import { deleteTable } from '../sqlite/deleteTables';

const ProtectedScreens = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Forms"
        component={FormsScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="SubmittedReports"
        component={SubmittedReportsScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AddReport"
        component={AddReportScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="AppInfo"
        component={AppInfoScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const {isAuthenticated} = useAuth();
  const dispatch = useDispatch();
  const getOrgDataFromDb = async () => {
    try {
      const orgId = await AsyncStorage.getItem('orgId');
      if (orgId) {
        console.log("getttt===>",orgId)
        const orgData = await getDataFromOrgTableByOrgId(orgId);
        dispatch(initOrg(orgData));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // create all sqlite tables
    createOrgTable();
    // deleteTable('orgs')
    createUsersTable();
    createAppsTable();

    getOrgDataFromDb();
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated && (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{headerShown: false}}
          />
        )}
        {isAuthenticated && (
          <Stack.Screen
            name="Protected"
            component={ProtectedScreens}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
