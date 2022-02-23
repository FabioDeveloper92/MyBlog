import {
  AuthActions,
  GET_USERINFO,
  GET_USERINFO_COMPLETE,
  GET_USERINFO_ERROR,
  LOGGED_IN_GOOGLE,
  LOGGED_IN_GOOGLE_ERROR,
  LOGIN_JWT,
  LOGIN_JWT_ERROR,
  LOGOUT,
  NO_ACTION,
  SHOW_LOGIN_TAB,
  SHOW_SIGNUP_TAB,
  SIGNUP,
  SIGNUP_COMPLETE,
  SIGNUP_ERROR,
} from './auth.actions';
import { AuthState } from './auth.state';

export function AuthReducers(
  state = new AuthState(),
  action: AuthActions
): AuthState {
  switch (action.type) {
    case LOGIN_JWT:
      return {
        ...state,
        isAuthenticated: false,
        isBusyLoginSignup: true,
      };
    case LOGIN_JWT_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        isBusyLoginSignup: false,
      };
    case LOGGED_IN_GOOGLE:
      return {
        ...state,
        isAuthenticated: true,
        isBusyLoginSignup: true,
      };
    case LOGGED_IN_GOOGLE_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        isBusyLoginSignup: false,
      };
    case GET_USERINFO:
      return {
        ...state,
        isBusyLoginSignup: true,
      };
    case GET_USERINFO_COMPLETE:
      return {
        ...state,
        isAuthenticated: action?.payload != null,
        userInfo: action?.payload,
        hasFinished: true,
        isBusyLoginSignup: false,
      };
    case GET_USERINFO_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
        hasFinished: true,
        isBusyLoginSignup: false,
      };
    case SIGNUP:
      return {
        ...state,
        isBusyLoginSignup: true,
      };
    case SIGNUP_COMPLETE:
      return {
        ...state,
        isBusyLoginSignup: false,
      };
    case SIGNUP_ERROR:
      return {
        ...state,
        isBusyLoginSignup: false,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
      };
    case SHOW_LOGIN_TAB:
      return {
        ...state,
        showLoginTab: true,
      };
    case SHOW_SIGNUP_TAB:
      return {
        ...state,
        showLoginTab: false,
      };
    case NO_ACTION:
      return state;
    default:
      return state;
  }
}
