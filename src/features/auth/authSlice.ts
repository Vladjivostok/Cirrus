import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../common/types';
import { LoginService } from '../../services/loginService';

type LoginAction = {
  payload: User;
  type: string;
};

export const login = createAsyncThunk('auth/login', async (userData: User, thunkAPI) => {
  try {
    return await LoginService.login(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

interface LoginState {
  user: User;
}

const initialState: LoginState = {
  user: { username: '', password: '' }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: LoginAction) => {
      state.user = action.payload;
    }
  }
});

export default authSlice.reducer;
