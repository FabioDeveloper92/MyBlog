import { Action } from '@ngrx/store';
import { ErrorPayload } from '../../../core/model/error-payload.model';
import { PostDetail } from '../../models/post-detail.model';

export const POST_DETAIL = '[PostRead] Post Detail';
export const POST_DETAIL_COMPLETE = '[PostRead] Post Detail Complete';
export const POST_DETAIL_ERROR = '[PostRead] Post Detail Error';

export class PostDetailAction implements Action {
  readonly type = POST_DETAIL;
  constructor(public payload: string) {}
}

export class PostDetailCompleteAction implements Action {
  readonly type = POST_DETAIL_COMPLETE;
  constructor(public payload: PostDetail) {}
}

export class PostDetailErrorAction implements Action {
  readonly type = POST_DETAIL_ERROR;
  constructor(public payload: ErrorPayload) {}
}

export type PostReadActions =
  | PostDetailAction
  | PostDetailCompleteAction
  | PostDetailErrorAction;
