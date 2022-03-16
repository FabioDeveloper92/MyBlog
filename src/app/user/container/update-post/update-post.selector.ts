import { createSelector } from '@ngrx/store';
import { selectUpdatePostState } from '../../user.selector';
import { UpdatePostState } from './update-post.state';

export const selectUpdatePost = createSelector(
  selectUpdatePostState,
  (state: UpdatePostState) => state.post
);

export const selectIsBusyPublish = createSelector(
  selectUpdatePostState,
  (state: UpdatePostState) => state.isBusyPublish
);

export const selectIsBusySaveDraft = createSelector(
  selectUpdatePostState,
  (state: UpdatePostState) => state.isBusySaveDraft
);

export const selectTagsBlog = createSelector(
  selectUpdatePostState,
  (state: UpdatePostState) => state.tagsBlog
);

export const selectPostsCanBeRelated = createSelector(
  selectUpdatePostState,
  (state: UpdatePostState) => state.postCanBeRelated
);
