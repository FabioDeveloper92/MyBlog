import { RouterReducerState } from '@ngrx/router-store';
import { CustomRouterState } from './custom-router.state-serializer';
import { LanguageState } from './reducers/language/language.state';
import { Config } from './services/config.service';

export interface AppState {
  router: RouterReducerState<CustomRouterState>;
  config: ConfigState;
  language: LanguageState;
}

export class ConfigState {
  config: Config;
  isBusy = false;
  hasFinished = false;
}
