import { createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { ResumePost } from '../../models/resume-post.model';
import { getPubblicState } from '../../pubblic.selector';
import { PubblicState } from '../../pubblic.state';
import { BlogState } from './blog.state';

export const postListAdapter = createEntityAdapter<ResumePost>();

export const selectBlogState = createSelector(
    getPubblicState,
    (state: PubblicState) => state.blogState
);


export const selectIsBusyPostList = createSelector(
    selectBlogState,
    (state: BlogState) => state.isPostList
);

export const {
    selectAll
} = postListAdapter.getSelectors(selectBlogState);