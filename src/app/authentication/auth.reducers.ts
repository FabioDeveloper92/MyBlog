import {
  AuthActions,
  GET_USERINFO,
  GET_USERINFO_COMPLETE,
  GET_USERINFO_ERROR,
  LOGGED_IN_GOOGLE,
  LOGOUT,
} from './auth.actions';
import { AuthState } from './auth.state';

export function AuthReducers(
  state = new AuthState(),
  action: AuthActions
): AuthState {
  switch (action.type) {
    case LOGGED_IN_GOOGLE:
      return {
        ...state,
        isAuthenticated: true,
      };
    case GET_USERINFO:
      return {
        ...state,
      };
    case GET_USERINFO_COMPLETE:
      return {
        ...state,
        isAuthenticated: action?.payload != null,
        userInfo: action?.payload,
        hasFinished: true,
      };
    case GET_USERINFO_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
        hasFinished: true,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        userInfo: null,
      };
    default:
      return state;
  }
}
