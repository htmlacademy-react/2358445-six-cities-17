import {AuthorizationStatus} from '../../const';
import {makeFakeUserData} from '../../mocks';
import {UserProcessType} from '../../types';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {userProcess} from './user-process';

describe('UserProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: UserProcessType = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null
    };

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: UserProcessType = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null
    };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const fakeUser = makeFakeUserData();
    const initialState: UserProcessType = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null
    };
    const expectedState: UserProcessType = {
      authorizationStatus: AuthorizationStatus.Auth,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: fakeUser
    };

    const result = userProcess.reducer(initialState, checkAuthAction.fulfilled(fakeUser, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState: UserProcessType = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null
    };
    const expectedState: UserProcessType = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: true,
      userInfo: null
    };

    const result = userProcess.reducer(initialState, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const fakeUser = makeFakeUserData();
    const initialState: UserProcessType = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null
    };
    const expectedState: UserProcessType = {
      authorizationStatus: AuthorizationStatus.Auth,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: fakeUser
    };

    const result = userProcess.reducer(initialState, loginAction.fulfilled(fakeUser, '', {
      login: '',
      password: ''
    }));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState: UserProcessType = {
      authorizationStatus: AuthorizationStatus.Unknown,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null
    };
    const expectedState: UserProcessType = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      isErrorInAuthRequest: true,
      isErrorInCheckAuthRequest: false,
      userInfo: null
    };

    const result = userProcess.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", with "logoutAction.fulfilled" action', () => {
    const initialState: UserProcessType = {
      authorizationStatus: AuthorizationStatus.Auth,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: makeFakeUserData()
    };
    const expectedState: UserProcessType = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      isErrorInAuthRequest: false,
      isErrorInCheckAuthRequest: false,
      userInfo: null
    };

    const result = userProcess.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
