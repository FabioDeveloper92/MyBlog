import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

export const GO = '[Router] Go';
export const BACK = '[Router] Back';
export const FORWARD = '[Router] Forward';
export const CHANGE = '[Router] Change';

export class GoAction implements Action {
  readonly type = GO;

  constructor(
    public payload: {
      path: any[];
      queryParams?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class BackAction implements Action {
  readonly type = BACK;

  constructor() {}
}

export class ForwardAction implements Action {
  readonly type = FORWARD;

  constructor() {}
}

export class ChangeAction implements Action {
  readonly type = CHANGE;
  constructor(public payload: { params: any; path: string }) {}
}

export type RouterActions =
  | GoAction
  | ForwardAction
  | BackAction
  | ChangeAction;
