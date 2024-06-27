import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:{
           userId:"",
           firstName:"-",
           lastName:"-",
           email:"-",
           mobile:'-'
        }
    },
    reducers: {
        initUser : (state,action)=> {
            state.user = action.payload
        }
    }
});

export const {initUser} =userSlice.actions;

export default userSlice.reducer;