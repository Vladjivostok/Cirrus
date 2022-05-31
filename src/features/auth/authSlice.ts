import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import loginService from '../../services/loginService';

import type { RootState } from '../../store/store';

// export const loginThunk = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
//   try {
//     return await loginService.login(userData);
//   } catch (error: any) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

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
