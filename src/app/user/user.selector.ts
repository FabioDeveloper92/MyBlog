import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const getUserState = createFeatureSelector<UserState>('user');

export const selectAddPostState = createSelector(
  getUserState,
  (state: UserState) => state.addPost
);

export const selectUpdatePostState = createSelector(
  getUserState,
  (state: UserState) => state.updatePost
);

export const selectUserAreaState = createSelector(
  getUserState,
  (state: UserState) => state.userArea
);
