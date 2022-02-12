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

export const {
    selectAll
} = postListAdapter.getSelectors(selectBlogState);