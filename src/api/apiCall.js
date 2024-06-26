import axios from 'axios';
import {constants} from '../constants.constants';

export const getOrgDetailsApi = async(org,domain) => { 
    const url = constants.VLS_API_URL;
    try{
        const response = await axios.post(url,{platform_domain:domain,org_code:org});
        return response.data.result
    }catch(error){
        console.log(error);
        return error
    }
}  

export const loginApi = async(orgId,email, password) => { 
    const url = constants.VLS_API_URL;
    try{
        const response = await axios.post(url,{orgId:orgId, email:email, password:password});
        return response.data
    }catch(error){
        console.log(error.message);
        return error
    }
}

export const getOfflineAppsApi = async(orgId, userId) => { 
    const url = constants.VLS_API_URL;
    try{
        const response = await axios.post(url,{orgId:orgId, userId:userId});
        return response.data
    }catch(error){
        console.log(error.message);
        return error
    }
}