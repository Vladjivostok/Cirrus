import { createSlice, createAsyncThunk, createReducer } from '@reduxjs/toolkit';
import { User } from '../../../common/types';
import { LoginService } from '../../../services/loginService';

// interface LoginAction {
//   payload: User;
//   type: string;
// }

interface LoginState {
  user: object | null;
  // user: User | null
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: unknown;
}

const initialState: LoginState = {
  user: { username: '', password: '' },
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const login = createAsyncThunk('auth/login', async (userData: any, thunkAPI) => {
  try {
    return await LoginService.login(userData);
  } catch (error) {
    console.error(error);

    return thunkAPI.rejectWithValue(error);
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
        state.message = action.payload;
        state.user = null;
      });
  }
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
