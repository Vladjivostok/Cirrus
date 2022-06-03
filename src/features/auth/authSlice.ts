import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../common/types';
import { LoginService } from '../../services/loginService';

interface LoginAction {
  payload: User;
  type: string;
}

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
    myReducer: (state, action: LoginAction) => {
      state.user = action.payload;
      LoginService.login(action.payload);
    }
  }
});

export const { myReducer } = authSlice.actions;

export default authSlice.reducer;
