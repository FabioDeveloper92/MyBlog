import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AuthState } from './auth.state';

const getAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsAuthenticated = createSelector(
  getAuthState,
  (state: AuthState) => state.isAuthenticated
);

export const selectUserInfo = createSelector(
  getAuthState,
  (state: AuthState) => state.userInfo
);

export const selectIsBusyLoginSignup = createSelector(
  getAuthState,
  (state: AuthState) => state.isBusyLoginSignup
);

export const selectShowLoginTab = createSelector(
  getAuthState,
  (state: AuthState) => state.showLoginTab
);
