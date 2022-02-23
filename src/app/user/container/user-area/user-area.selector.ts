import { createSelector } from '@ngrx/store';
import { selectUserAreaState } from '../../user.selector';
import { UserAreaState } from './user-area.state';

export const selectVoiceMenu = createSelector(
  selectUserAreaState,
  (state: UserAreaState) => state.voiceMenu
);

export const selectVoiceMenuSelected = createSelector(
  selectUserAreaState,
  (state: UserAreaState) => state.voiceMenuSelected
);

export const selectPosts = createSelector(
  selectUserAreaState,
  (state: UserAreaState) => state.posts
);

export const selectIsBusyGetPosts = createSelector(
  selectUserAreaState,
  (state: UserAreaState) => state.isBusyGetPosts
);
