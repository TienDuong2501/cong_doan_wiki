import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'models/user';
import { ErrorResponse } from 'models';
import { toast } from 'react-toastify';

export interface LoginPayload {
    username: string,
    password: string,
    login_type?: string,
}

export interface SignupPayload {
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string,
  password_confirmation: string,
}

export interface AuthState {
  isAuthenticated: boolean;
  loading?: boolean;
  currentUser?: User;
  errors?: ErrorResponse
}

const initialState: AuthState = {
  isAuthenticated: false,
  loading: false,
  currentUser: undefined,
  errors: {
    data: {},
    status: undefined
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.loading = true;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.isAuthenticated = true;
      state.loading = false;
      state.errors = {
        data: {},
        status: undefined
      };
      state.currentUser = action.payload;
      toast.success('Sign in successfully!');
    },
    loginFailed(state, action: PayloadAction<ErrorResponse>) {
      let errors = action.payload
      state.loading = false;
      state.errors = errors;
      switch (errors?.status) {
        case 400:
          break
        case 401:
          toast.error(errors?.data?.message);
          break
        case 403:
          break
        case 404:
          toast.error(errors?.data?.message);
          break
        default:
          break
      }
    },
    signup(state,action: PayloadAction<SignupPayload>) {
      state.loading = true
    },
    signupSuccess(state, action: PayloadAction<string>) {
      state.errors = {
        data: {},
        status: undefined
      };
      state.loading = false;
      toast.success('Sign up successfully!');
    },
    signupFailed(state, action: PayloadAction<ErrorResponse>) {
      let errors = action.payload
      state.loading = false;
      state.errors = errors;
      switch (errors?.status) {
        case 400:
          toast.error(errors?.data?.message);
          break
        case 401:
          break
        case 403:
          break
        case 404:
          toast.error(errors?.data?.message);
          break
        default:
          break
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = undefined;
    },
    resetErrors(state) {
      state.errors = {
        data: {},
        status: undefined
      };
    }
  },
});

// Actions
export const authActions = authSlice.actions;

// Selectors
export const selectisAuthenticated = (state: any) => state.auth.isAuthenticated;
export const selectIsLoading = (state: any) => state.auth.loading;
export const selectErrors = (state: any) => state.auth.errors;

// Reducer
const authReducer = authSlice.reducer;
export default authReducer;
