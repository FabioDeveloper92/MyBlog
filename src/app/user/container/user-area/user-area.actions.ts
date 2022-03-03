import { Action } from '@ngrx/store';
import { ErrorPayload } from '../../../core/model/error-payload.model';
import { MyPost } from '../../models/my-post.model';

export const SELECT_VOICE_MENU = '[UserArea] Select Voice Menu';

export const GET_POSTS = '[UserArea] Get Posts';
export const GET_POSTS_COMPLETE = '[UserArea] Get Posts Complete';
export const GET_POSTS_ERROR = '[UserArea] Get Posts Error';

export const FILTER_BY_TITLE_CONTAINS = '[UserArea] Filter By Title Contains';
export const FILTER_BY_STATE = '[UserArea] Filter By State';
export const ORDER_BY_DATE = '[UserArea] Order By Data';
export const EXPAND_LIST = '[UserArea] Expand List';
export const REDUCE_LIST = '[UserArea] Reduce List';

export class SelectVoiceMenuAction implements Action {
  readonly type = SELECT_VOICE_MENU;

  constructor(public payload: number) {}
}

export class GetPostsAction implements Action {
  readonly type = GET_POSTS;

  constructor() {}
}

export class GetPostsCompleteAction implements Action {
  readonly type = GET_POSTS_COMPLETE;

  constructor(public payload: MyPost[]) {}
}

export class GetPostsErrorAction implements Action {
  readonly type = GET_POSTS_ERROR;

  constructor(public payload: ErrorPayload) {}
}

export class FilterByTitleContainsAction implements Action {
  readonly type = FILTER_BY_TITLE_CONTAINS;

  constructor(public payload: string) {}
}

export class FilterByStateAction implements Action {
  readonly type = FILTER_BY_STATE;

  constructor(public payload: number) {}
}

export class OrderByDateAction implements Action {
  readonly type = ORDER_BY_DATE;

  constructor(public payload: number) {}
}

export class ExpandListAction implements Action {
  readonly type = EXPAND_LIST;

  constructor(public payload: number) {}
}

export class ReduceListAction implements Action {
  readonly type = REDUCE_LIST;

  constructor(public payload: number) {}
}

export type UserAreaActions =
  | SelectVoiceMenuAction
  | GetPostsAction
  | GetPostsCompleteAction
  | GetPostsErrorAction
  | FilterByTitleContainsAction
  | FilterByStateAction
  | OrderByDateAction
  | ExpandListAction
  | ReduceListAction;