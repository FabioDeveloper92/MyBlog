import { createSelector } from '@ngrx/store';
import { UserState } from '../../user.state';
import { AddPostState } from './add-post.state';
import { getUserState } from '../../user.selector';

export const selectAddPostState = createSelector(
  getUserState,
  (state: UserState) => state.addPost
);

export const selectIsBusyPublish = createSelector(
  selectAddPostState,
  (state: AddPostState) => state.isBusyPublish
);

export const selectIsBusySaveDraft = createSelector(
  selectAddPostState,
  (state: AddPostState) => state.isBusySaveDraft
);

export const selectTagsBlog = createSelector(
  selectAddPostState,
  (state: AddPostState) => state.tagsBlog
);
