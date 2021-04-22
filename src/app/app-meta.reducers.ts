import { ActionReducer, MetaReducer } from '@ngrx/store';
import { storeLogger } from 'ngrx-store-logger';

import { environment } from '../environments/environment';

export function logger(reducer: ActionReducer<{}>): ActionReducer<any, any> {
  return storeLogger({
    collapsed: true,
    filter: { blacklist: ['@ngrx/store/update-reducers'] }
  })(reducer);
}

export const AppMetaReducers: MetaReducer<any>[] = !environment.production
  ? [logger]
  : [];
