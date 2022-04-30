import { createSelector } from '@ngrx/store';
import { selectUserAreaState } from '../../user.selector';
import { UserAreaState } from './user-area.state';

export const selectVoiceMenu = createSelector(
  selectUserAreaState,
  (state: UserAreaState) => state.voiceMenu
);

export const selectVoiceMenued = createSelector(
  selectUserAreaState,
  (state: UserAreaState) => state.VoiceMenued
);

export const selectPosts = createSelector(
  selectUserAreaState,
  (state: UserAreaState) => state.posts
);

export const selectFilterByTitleContains = createSelector(
  selectUserAreaState,
  (state: UserAreaState) => state.filterByTitleContains
);

export const selectFilterByState = createSelector(
  selectUserAreaState,
  (state: UserAreaState) => state.filterByState
);

export const selectOrderByDate = createSelector(
  selectUserAreaState,
  (state: UserAreaState) => state.orderByDate
);

export const selectShowPostLimit = createSelector(
  selectUserAreaState,
  (state: UserAreaState) => state.showPostLimit
);

export const selectIsBusyGetPosts = createSelector(
  selectUserAreaState,
  (state: UserAreaState) => state.isBusyGetPosts
);
