import { createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { ResumePost } from '../../models/resume-post.model';
import { getPubblicState } from '../../pubblic.selector';
import { PubblicState } from '../../pubblic.state';

export const postListAdapter = createEntityAdapter<ResumePost>();

export const selectHomeState = createSelector(
    getPubblicState,
    (state: PubblicState) => state.blogState
);

export const {
    selectAll
} = postListAdapter.getSelectors(selectHomeState);