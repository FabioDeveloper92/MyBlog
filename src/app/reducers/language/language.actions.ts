import { Action } from '@ngrx/store';
import { ErrorPayload } from '../../core/model/error-payload.model';

export const SETUP_LANGUAGE = '[Auth] Setup Language';
export const CHANGE_LANGUAGE = '[Auth] Change Language';
export const CHANGE_LANGUAGE_SUCCESS = '[Auth] Change Language Success';
export const CHANGE_LANGUAGE_ERROR = '[Auth] Change Language Error';

export class SetupLanguageAction implements Action {
  readonly type = SETUP_LANGUAGE;
}

export class ChangeLanguageAction implements Action {
  readonly type = CHANGE_LANGUAGE;

  constructor(public payload: string) {}
}

export class ChangeLanguageSuccessAction implements Action {
  readonly type = CHANGE_LANGUAGE_SUCCESS;
  constructor(public payload: string) {}
}

export class ChangeLanguageErrorAction implements Action {
  readonly type = CHANGE_LANGUAGE_ERROR;
  constructor(public payload: ErrorPayload) {}
}

export type LanguageActions =
  | SetupLanguageAction
  | ChangeLanguageAction
  | ChangeLanguageSuccessAction
  | ChangeLanguageErrorAction;
