import {NameSpace} from '../../const';
import {AuthorizationStatus} from '../../const';
import {AppState, UserData} from '../../types';

export const selectAuthorizationStatus = (state: Pick<AppState, NameSpace.User>): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const selectUser = (state: Pick<AppState, NameSpace.User>): UserData | null => state[NameSpace.User].userInfo;
