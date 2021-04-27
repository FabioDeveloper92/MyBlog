import { Action } from '@ngrx/store';
import { ErrorPayload } from '../../../core/model/error-payload.model';
import { PostDetail } from '../../models/post-detail.model';
import { Comment } from '../../models/comment.model';

export const POST_DETAIL = '[PostRead] Post Detail';
export const POST_DETAIL_COMPLETE = '[PostRead] Post Detail Complete';
export const POST_DETAIL_ERROR = '[PostRead] Post Detail Error';

export const ADD_COMMENT_POST = '[PostRead] Add Comment Post';
export const ADD_COMMENT_POST_COMPLETE = '[PostRead] Add Comment Post Complete';
export const ADD_COMMENT_POST_ERROR = '[PostRead] Add Comment Post Error';

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

export class AddCommentPostAction implements Action {
  readonly type = ADD_COMMENT_POST;
  constructor(public payload: Comment) {}
}

export class AddCommentPostCompleteAction implements Action {
  readonly type = ADD_COMMENT_POST_COMPLETE;
  constructor() {}
}

export class AddCommentPostErrorAction implements Action {
  readonly type = ADD_COMMENT_POST_ERROR;
  constructor(public payload: ErrorPayload) {}
}

export type PostReadActions =
  | PostDetailAction
  | PostDetailCompleteAction
  | PostDetailErrorAction
  | AddCommentPostAction
  | AddCommentPostCompleteAction
  | AddCommentPostErrorAction;
