import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LanguageState } from './language.state';

export const GetLanguageState = createFeatureSelector<LanguageState>(
  'language'
);

export const selectCurrentLanguage = createSelector(
  GetLanguageState,
  (state: LanguageState) => state.currentLanguage
);

export const selectLanguages = createSelector(
  GetLanguageState,
  (state: LanguageState) => state.languages
);
