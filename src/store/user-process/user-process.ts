import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import { UserProcessType } from '../../types';

const initialState: UserProcessType = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isErrorInAuthRequest: false,
  isErrorInCheckAuthRequest: false,
  userInfo: null
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isErrorInAuthRequest = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.isErrorInAuthRequest = true;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userInfo = null;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.isErrorInCheckAuthRequest = false;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userInfo = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.isErrorInCheckAuthRequest = true;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
