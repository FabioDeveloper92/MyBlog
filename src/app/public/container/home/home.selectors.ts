import { createEntityAdapter } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { ResumePost } from '../../models/resume-post.model';
import { getPublicState } from '../../public.selector';
import { PublicState } from '../../public.state';
import { HomeState } from './home.state';

export const resumePostListAdapter = createEntityAdapter<ResumePost>();

export const selectHomeState = createSelector(
    getPublicState,
    (state: PublicState) => state.homeState
);

export const selectIsBusyResumePostList = createSelector(
    selectHomeState,
    (state: HomeState) => state.isBusyResumePostList
);

export const {
    selectAll
} = resumePostListAdapter.getSelectors(selectHomeState);