import { createSelector } from '@ngrx/store';
import { selectAddPostState } from '../../user.selector';
import { AddPostState } from './add-post.state';

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
