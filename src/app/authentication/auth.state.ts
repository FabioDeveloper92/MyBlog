import { UserInfo } from './model/user-info.model';

export class AuthState {
  isAuthenticated: boolean;
  userInfo: UserInfo;
  hasFinished: boolean;
  showLoginTab: boolean;
  isBusyLoginSignup: boolean;
}
