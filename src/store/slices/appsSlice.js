import {createSlice} from '@reduxjs/toolkit';

const appsSlice = createSlice({
  name: 'apps',
  initialState: {
    apps: []
  },
  reducers: {
    initApps: (state, action) => {
      state.apps = action.payload;
    },
  },
});

export const {initApps} = appsSlice.actions;

export default appsSlice.reducer;