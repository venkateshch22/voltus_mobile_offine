import {configureStore} from '@reduxjs/toolkit';
import orgReducer from '../store/slices/orgSlice';
import userReducer from '../store/slices/userSlice';
import themeReducer from '../store/slices/themeSlice';
import appsReducer from '../store/slices/appsSlice';
import formsReducer from '../store/slices/formsSlice';

const store = configureStore({
  reducer: {
    org: orgReducer,
    user: userReducer,
    theme: themeReducer,
    apps: appsReducer,
    forms: formsReducer,
  },
});

export default store;
