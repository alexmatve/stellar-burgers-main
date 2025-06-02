import { loginUserApi, logoutApi, registerUserApi, TLoginData, TRegisterData, updateUserApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { clearTokens, storeTokens } from '../../utils/auth';

type TUserState = {
  user: TUser;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string;
};

export const initialState: TUserState = {
  user: {
    name: '',
    email: ''
  },
  isAuthenticated: false,
  isLoading: false,
  error: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = '';
    },
    loginSuccess(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.user = {
        name: '',
        email: ''
      };
      state.isAuthenticated = false;
    },
    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Ошибка при регистрации';
      })
      .addCase(loginUser.pending, (state, action) => {
        state.error = 'undefined';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = 'undefined';
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = 'Ошибка при аутентификации';
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = {
          email: '',
          name: ''
        };
      });
  }
});

export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('user/registerUser', async (data, { rejectWithValue }) => {
  try {
    const res = await registerUserApi(data);
    return res.user;
  } catch (err: any) {
    return rejectWithValue(err.message || 'Ошибка при регистрации');
  }
});


export const loginUser = createAsyncThunk<TUser, TLoginData>(
  'user/login',
  async (data, { rejectWithValue }) => {
    const response = await loginUserApi(data);

    if (!response?.success) {
      return rejectWithValue(response);
    }

    const { user, refreshToken, accessToken } = response;

    storeTokens(refreshToken, accessToken);

    return user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_, { rejectWithValue }) => {
    const response = await logoutApi();

    if (!response?.success) {
      return rejectWithValue(response);
    }
    clearTokens();
  }
);

export const updateUser = createAsyncThunk<TUser, Partial<TRegisterData>>(
  'user/update',
  async (data, { rejectWithValue }) => {
    const response = await updateUserApi(data);

    if (!response?.success) {
      return rejectWithValue(response);
    }

    return response.user;
  }
);

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setUser
} = userSlice.actions;

export default userSlice.reducer;
