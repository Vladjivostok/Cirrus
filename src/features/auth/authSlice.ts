import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../../store/store';

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.isLoggedIn = false;
    }
  }
});

export const { login, logout } = authSlice.actions;

export const loginStatus = (state: RootState) => state.auth.isLoggedIn;

export default authSlice.reducer;
