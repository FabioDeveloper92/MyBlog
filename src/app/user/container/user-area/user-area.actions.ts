import { Action } from '@ngrx/store';
import { ErrorPayload } from '../../../core/model/error-payload.model';
import { UpdatePost } from '../../models/update-post.model';

export const SELECT_VOICE_MENU = '[UserArea] Select Voice Menu';

export const GET_POSTS = '[UserArea] Get Posts';
export const GET_POSTS_COMPLETE = '[UserArea] Get Posts Complete';
export const GET_POSTS_ERROR = '[UserArea] Get Posts Error';

export class SelectVoiceMenuAction implements Action {
  readonly type = SELECT_VOICE_MENU;

  constructor(public payload: number) {}
}

export class GetPostsAction implements Action {
  readonly type = GET_POSTS;

  constructor(public payload: string) {}
}

export class GetPostsCompleteAction implements Action {
  readonly type = GET_POSTS_COMPLETE;

  constructor(public payload: UpdatePost[]) {}
}

export class GetPostsErrorAction implements Action {
  readonly type = GET_POSTS_ERROR;

  constructor(public payload: ErrorPayload) {}
}

export type UserAreaActions =
  | SelectVoiceMenuAction
  | GetPostsAction
  | GetPostsCompleteAction
  | GetPostsErrorAction;
