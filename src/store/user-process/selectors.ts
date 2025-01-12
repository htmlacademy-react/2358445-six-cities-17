import {NameSpace} from '../../const';
import {AuthorizationStatus} from '../../const';
import {AppState, UserData} from '../../types';

export const selectAuthorizationStatus = (state: AppState): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const selectUser = (state: AppState): UserData | null => state[NameSpace.User].userInfo;
