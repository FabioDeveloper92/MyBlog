import { createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { ResumePost } from '../../models/resume-post.model';
import { getPublicState } from '../../public.selector';
import { PublicState } from '../../public.state';
import { BlogState } from './blog.state';

export const postListAdapter = createEntityAdapter<ResumePost>();

export const selectBlogState = createSelector(
  getPublicState,
  (state: PublicState) => state.blogState
);

export const selectIsBusyPostList = createSelector(
  selectBlogState,
  (state: BlogState) => state.isPostList
);

export const selectOrderByVisibilityVoices = createSelector(
  selectBlogState,
  (state: BlogState) => state.orderByVisibilityVoices
);

export const selectFilterByTimeVoices = createSelector(
  selectBlogState,
  (state: BlogState) => state.filterByTimeVoices
);

export const selectSelectVisibilityVoices = createSelector(
  selectBlogState,
  (state: BlogState) => state.selectVisibilityVoices
);

export const selectSelectTimeVoices = createSelector(
  selectBlogState,
  (state: BlogState) => state.selectTimeVoices
);

export const { selectAll } = postListAdapter.getSelectors(selectBlogState);
