import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AppState } from '../../app.state';
import { LanguageState } from './language.state';
import { getAppState } from '../../app.selector';

export const selectLanguageState = createSelector(
  getAppState,
  (state: AppState) => state.language
);

export const selectCurrentLanguage = createSelector(
  selectLanguageState,
  (state: LanguageState) => state.currentLanguage
);

export const selectLanguages = createSelector(
  selectLanguageState,
  (state: LanguageState) => state.languages
);


