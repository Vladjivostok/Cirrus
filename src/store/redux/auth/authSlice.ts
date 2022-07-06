import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AuthnService } from '../../../services/authnService';
import { User, ReduxUser } from '../../../common/types';

import LocalStorageService from '../../../services/localStorageService';

type userDataProps = {
  email: string;
  id: number | null;
  roles: [];
  username: string;
} | null;

interface LoginState {
  user: ReduxUser;
  isError: boolean;
  isLoading: boolean;
  message: string;
  userData: userDataProps;
}

const initialState: LoginState = {
  user: null,
  userData: { username: '', email: '', id: null, roles: [] },
  isLoading: false,
  isError: false,
  message: ''
};

export const login = createAsyncThunk('auth/login', async (userData: User, thunkAPI) => {
  try {
    const token = await AuthnService.login(userData);

    LocalStorageService.setItem({ key: 'user', value: JSON.stringify(token) });

    return token;
  } catch (error) {
    let errCode = '';

    if (error instanceof AxiosError) {
      errCode = error.response?.data.message;
    }
    return thunkAPI.rejectWithValue(errCode);
  }
});

export const getLocalUser = createAsyncThunk('auth/getUser', async (_, thunkAPI) => {
  try {
    const response = AuthnService.getUser();

    return response;
  } catch (error) {
    let errCode = '';

    if (error instanceof AxiosError) {
      errCode = error.response?.data.message;
    }
    return thunkAPI.rejectWithValue(errCode);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.message = '';
    },

    updateUser: (state, action) => {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message += action.payload;
      })

      .addCase(getLocalUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLocalUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.userData = action.payload;
      })

      .addCase(getLocalUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.userData = null;
        state.message += action.payload;
      });
  }
});

export const { reset, updateUser } = authSlice.actions;

export default authSlice.reducer;
