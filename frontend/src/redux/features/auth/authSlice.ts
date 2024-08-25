import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export type UserProps = {
  email: string;
  userId: string;
  role: string;
  iat: Date;
  exp: Date;
};

type AuthStateProps = {
  user: null | UserProps;
  token: null | string;
};

const initialState: AuthStateProps = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Set user at local storage after login
    setUser: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
    },
    // Logout user
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const useCurrentToken = (state: RootState) => state.auth.token;
export const getCurrentUser = (state: RootState) => state.auth.user;

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
