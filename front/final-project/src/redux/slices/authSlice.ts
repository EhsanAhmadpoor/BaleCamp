import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  userId: string | null;
  loading: boolean;
  error: string | null;
  successfulSignUp: boolean,
  name: string,
  verified: boolean,
  email: string,
  role: string,
}

const initialState: AuthState = {
  userId: null as string | null,
  loading: false,
  error: null,
  successfulSignUp: false,
  name: "",
  verified: false,
  email: "",
  role: "Normal"
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<{ email: string; password: string }>) => {
      state.loading = true;
      console.log(action)
    },
    loginSuccess: (state, action: PayloadAction<{ userId: string, name: string, verified: boolean, email: string, role: string, password: string }>) => {
      state.userId = action.payload.userId;
      state.loading = false;
      state.error = null;
      state.name = action.payload.name;
      state.verified = action.payload.verified;
      state.email = action.payload.email;
      state.role = action.payload.role;
      localStorage.setItem('userId', state.userId)
      localStorage.setItem('role', state.role)
      localStorage.setItem('name', state.name)
      localStorage.setItem('email', state.email)
      localStorage.setItem('password', state.email)
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUpRequest: (state, action: PayloadAction<{ email: string; name: string; password: string }>) => {
      state.loading = true;
      console.log(action)
    },
    signUpSuccess: (state) => {
      state.loading = false;
      state.error = null;
      state.successfulSignUp = true
    },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSuccessfulSignUp(state) {
      state.successfulSignUp = false
    },
    logout: (state) => {
      state.email = ""
      state.name = ""
      state.role = ""
      state.successfulSignUp = false
      state.userId = ""
      state.verified = false
      localStorage.removeItem('name')
      localStorage.removeItem('role')
      localStorage.removeItem('email')
      localStorage.removeItem('userId')
    }
  },
});

export const { logout, deleteSuccessfulSignUp, loginRequest, loginSuccess, loginFailure, signUpRequest, signUpSuccess, signUpFailure } =
  authSlice.actions;

export default authSlice.reducer;
