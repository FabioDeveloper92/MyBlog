import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomRouterState } from './custom-router.state-serializer';

interface CustomRouterReducerState {
  state: CustomRouterState;
}

const getState = createFeatureSelector<CustomRouterReducerState>('router');

export const selectRouterStateSnapshot = createSelector(
  getState,
  (state: CustomRouterReducerState) =>
    !!state ? state.state : { url: '', params: {}, queryParams: {} }
);
