import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConfigState } from './app.state';

export const getConfigState = createFeatureSelector<ConfigState>('config');
export const selectVersionInfo = createSelector(
  getConfigState,
  (configState: ConfigState) =>
    configState && configState.config ? configState.config.versionInfo : ''
);