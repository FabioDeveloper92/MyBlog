import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.state';
import { ConfigReducers } from './config.reducers';
import { LanguageReducers } from './reducers/language/language.reducers';

export const AppReducers: ActionReducerMap<AppState> = {
  router: routerReducer,
  config: ConfigReducers,
  language: LanguageReducers
};
