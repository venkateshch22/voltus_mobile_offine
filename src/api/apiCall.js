import axios from 'axios';
import {constants} from '../constants/constants';
import {VLS_API_URL} from "@env";

export const getOrgDetailsApi = async (org, domain) => {
  try {
    const response = await axios.post(`${VLS_API_URL}/checkorgexistsapi`, {
      platform_domain: domain,
      org_code: org,
    });
    return response.data.result;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const loginApi = async (orgId, email, password) => {
  try {
    const response = await axios.post(`${VLS_API_URL}/loginApi`, {
      orgId: orgId,
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getOfflineAppsApi = async (orgId, userId) => {
  try {
    const response = await axios.post(`${VLS_API_URL}/getOfflineApps`, {
      orgId: orgId,
      userId: userId,
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const getOfflineAppFormsApi = async (apps) => {
  const formPromises = async(app) => { 
    return axios.post(`${VLS_API_URL}/offlineAppFormData`, {
        orgId: app.orgId,
        appId: app.appId,
        userId: app.userId,
      })
   }
   const responses = await Promise.all(apps.map(async(app)=>await formPromises(app)));
   return responses[0].data

};
