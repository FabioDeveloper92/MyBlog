import { Action } from '@ngrx/store';
import { UserInfo } from './model/user-info.model';

export const LOGGED_IN_GOOGLE = '[Auth] Logged in Google';

export const GET_USERINFO = '[Auth] Get UserInfo';
export const GET_USERINFO_COMPLETE = '[Auth] Get UserInfo Complete';
export const GET_USERINFO_ERROR = '[Auth] Get UserInfo Error';

export const LOGOUT = '[Auth] Logout';

export class LoggedInGoogleAction implements Action {
  readonly type = LOGGED_IN_GOOGLE;

  constructor(public payload: UserInfo) {}
}

export class GetUserInfoAction implements Action {
  readonly type = GET_USERINFO;

  constructor(public payload: string) {}
}

export class GetUserInfoCompleteAction implements Action {
  readonly type = GET_USERINFO_COMPLETE;

  constructor(public payload: UserInfo) {}
}

export class GetUserInfoErrorAction implements Action {
  readonly type = GET_USERINFO_ERROR;

  constructor(public payload: string) {}
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
}

export type AuthActions =
  | LoggedInGoogleAction
  | GetUserInfoAction
  | GetUserInfoCompleteAction
  | GetUserInfoErrorAction
  | LogoutAction;
