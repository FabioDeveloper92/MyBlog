import { createSelector } from '@ngrx/store';
import { PostDetail } from '../../models/post-detail.model';
import { getPublicState } from '../../public.selector';
import { PublicState } from '../../public.state';
import { PostReadState } from './post-read.state';

export const selectPostReadState = createSelector(
  getPublicState,
  (state: PublicState) => state.postReadState
);

export const selectPostDetail = createSelector(
  selectPostReadState,
  (state: PostReadState) => state.postDetail
);

export const selectIsBusyAddComment = createSelector(
  selectPostReadState,
  (state: PostReadState) => state.isBusyAddComment
);

export const selectIsBusyPostRead = createSelector(
  selectPostReadState,
  (state: PostReadState) => state.isBusyPostRead
);

export const selectPostDetailId = createSelector(
  selectPostDetail,
  (state: PostDetail) => state?.id
);
