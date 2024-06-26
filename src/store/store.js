import {configureStore} from '@reduxjs/toolkit';
import orgReducer from '..store/slices/orgSlice';
import userReducer from '..store/slices/userSlice';
import themeReducer from '..store/slices/themeSlice';

const store = configureStore({
    reducer: {
        org: orgReducer,
        user: userReducer,
        theme: themeReducer
    }
})

export default store;