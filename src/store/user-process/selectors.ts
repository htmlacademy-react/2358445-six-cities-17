import {NameSpace} from '../../const';
import {AuthorizationStatus} from '../../const';
import {AppState} from '../../types';

export const selectAuthorizationStatus = (state: AppState): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const selectUserName = (state: AppState): string | null => state[NameSpace.User].userInfo && state[NameSpace.User].userInfo.email;
