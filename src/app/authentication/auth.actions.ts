import { Action } from '@ngrx/store';
import { ErrorPayload } from '../core/model/error-payload.model';
import { AddUserInfo } from './model/add-user-info.model';
import { LoginUser } from './model/login-user.model';
import { UserInfo } from './model/user-info.model';

export const LOGIN_JWT = '[Auth] Login Jwt';
export const LOGIN_JWT_ERROR = '[Auth] Login Error Jwt';

export const LOGGED_IN_GOOGLE = '[Auth] Logged in Google';
export const LOGGED_IN_GOOGLE_ERROR = '[Auth] Logged in Error Google';

export const GET_USERINFO = '[Auth] Get UserInfo';
export const GET_USERINFO_COMPLETE = '[Auth] Get UserInfo Complete';
export const GET_USERINFO_ERROR = '[Auth] Get UserInfo Error';

export const SIGNUP = '[Auth] Signup';
export const SIGNUP_COMPLETE = '[Auth] Signup Complete';
export const SIGNUP_ERROR = '[Auth] Signup Error';

export const LOGOUT = '[Auth] Logout';

export const SHOW_LOGIN_TAB = '[Auth] Show Login Tab';
export const SHOW_SIGNUP_TAB = '[Auth] Show Signup Tab';

export class LoginJwtAction implements Action {
  readonly type = LOGIN_JWT;

  constructor(public payload: LoginUser) {}
}

export class LoginJwtErrorAction implements Action {
  readonly type = LOGIN_JWT_ERROR;

  constructor(public payload: ErrorPayload) {}
}

export class LoggedInGoogleAction implements Action {
  readonly type = LOGGED_IN_GOOGLE;

  constructor(public payload: AddUserInfo) {}
}

export class LoggedInGoogleErrorAction implements Action {
  readonly type = LOGGED_IN_GOOGLE_ERROR;

  constructor(public payload: ErrorPayload) {}
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

  constructor(public payload: ErrorPayload) {}
}

export class SignupAction implements Action {
  readonly type = SIGNUP;

  constructor(public payload: AddUserInfo) {}
}

export class SignupCompleteAction implements Action {
  readonly type = SIGNUP_COMPLETE;

  constructor(public payload: string) {}
}

export class SignupErrorAction implements Action {
  readonly type = SIGNUP_ERROR;

  constructor(public payload: ErrorPayload) {}
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
}

export class ShowLoginTabAction implements Action {
  readonly type = SHOW_LOGIN_TAB;
}

export class ShowSignupTabAction implements Action {
  readonly type = SHOW_SIGNUP_TAB;
}

export type AuthActions =
  | LoggedInGoogleAction
  | LoggedInGoogleErrorAction
  | GetUserInfoAction
  | GetUserInfoCompleteAction
  | GetUserInfoErrorAction
  | LogoutAction
  | ShowLoginTabAction
  | ShowSignupTabAction
  | LoginJwtAction
  | LoginJwtErrorAction
  | SignupAction
  | SignupCompleteAction
  | SignupErrorAction;
