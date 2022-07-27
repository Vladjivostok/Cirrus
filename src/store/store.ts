import { configureStore } from '@reduxjs/toolkit';

import authSlice from './redux/auth/authSlice';
import fileManagementSlice from './redux/fileManagement/fileManagemantSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    fileManage: fileManagementSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['fileManage/getFiles/fulfilled'],
        ignoredPaths: ['fileManage.organizationFiles']
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
