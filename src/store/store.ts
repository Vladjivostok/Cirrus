import { configureStore } from '@reduxjs/toolkit';

import authSlice from './redux/auth/authSlice';
import fileManagementSlice from './redux/fileManagement/files&FoldersSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    fileManage: fileManagementSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
