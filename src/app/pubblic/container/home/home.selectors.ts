import { createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { ResumePost } from '../../models/resume-post.model';
import { getPubblicState } from '../../pubblic.selector';
import { PubblicState } from '../../pubblic.state';
import { HomeState } from './home.state';

export const resumePostListAdapter = createEntityAdapter<ResumePost>();

export const selectHomeState = createSelector(
    getPubblicState,
    (state: PubblicState) => state.homeState
);

export const selectIsBusyResumePostList = createSelector(
    selectHomeState,
    (state: HomeState) => state.isBusyResumePostList
);

export const {
    selectAll
} = resumePostListAdapter.getSelectors(selectHomeState);