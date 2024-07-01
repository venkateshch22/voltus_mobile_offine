import {createSlice} from '@reduxjs/toolkit';

const formsSlice = createSlice({
  name: 'forms',
  initialState: {
    forms: []
  },
  reducers: {
    initForms: (state, action) => {
      state.forms = action.payload;
    },
  },
});

export const {initForms} = formsSlice.actions;

export default formsSlice.reducer;