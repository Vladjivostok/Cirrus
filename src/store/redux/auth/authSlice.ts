import { createSlice, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { User } from '../../../common/types';
import { LoginService } from '../../../services/loginService';

interface LoginState {
  user: object | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: LoginState = {
  user: { username: '', password: '' },
  isSuccess: false,
  isLoading: false,
  isError: false,
  message: ''
};

export const login = createAsyncThunk('auth/login', async (userData: User, thunkAPI) => {
  try {
    const token = await LoginService.login(userData);

    localStorage.setItem('user:', JSON.stringify(token));
    return token;
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
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.user = null;
        state.message += action.payload;
      });
  }
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
