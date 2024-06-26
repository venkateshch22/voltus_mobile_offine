import {createSlice} from '@reduxjs/toolkit';

const orgSlice = createSlice({
    name:"orgDetails",
    initialState:{
        org:{
            orgUrl:'https://',
            orgId: '',
            orgName:'',
            orgImage:''
        }
    },
    reducers: {
        initOrg : (state,action)=> {
            state.org = action.payload
        }
    }
});

export const {initOrg} =orgSlice.actions;

export default orgSlice.reducer;