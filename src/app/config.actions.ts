import { Action } from '@ngrx/store';
import { ErrorPayload } from './core/model/error-payload.model';

import { Config } from './services/config.service';

export const GET_CONFIG = '[Config] Get Config';
export const GET_CONFIG_COMPLETE = '[Config] Get Config Complete';
export const GET_CONFIG_ERROR = '[Config] Get Config Error';

export class GetConfigAction implements Action {
  readonly type = GET_CONFIG;
}
export class GetConfigCompleteAction implements Action {
  readonly type = GET_CONFIG_COMPLETE;
  constructor(public payload: Config) {}
}
export class GetConfigErrorAction implements Action {
  readonly type = GET_CONFIG_ERROR;
  constructor(public payload: ErrorPayload) {}
}

export type ConfigActions =
  | GetConfigAction
  | GetConfigCompleteAction
  | GetConfigErrorAction;
