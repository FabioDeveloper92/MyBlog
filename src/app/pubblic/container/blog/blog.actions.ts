import { Action } from '@ngrx/store';
import { ResumePost } from '../../models/resume-post.model';
import { ErrorPayload } from '../../../core/model/error-payload.model';

export const POST_LIST = '[Blog] Post List';
export const POST_LIST_COMPLETE = '[Blog] Post List Complete';
export const POST_LIST_ERROR = '[Blog] Post List Error';

export const OPEN_POST_DETAIL = '[Blog] Open Post Detail';

export class PostListAction implements Action {
  readonly type = POST_LIST;
  constructor() {}
}

export class PostListCompleteAction implements Action {
  readonly type = POST_LIST_COMPLETE;
  constructor(public payload: ResumePost[]) {}
}

export class PostListErrorAction implements Action {
  readonly type = POST_LIST_ERROR;
  constructor(public payload: ErrorPayload) {}
}

export class OpenPostDetailAction implements Action {
  readonly type = OPEN_POST_DETAIL;
  constructor(public payload: string) {}
}

export type BlogActions =
  | PostListAction
  | PostListCompleteAction
  | PostListErrorAction
  | OpenPostDetailAction;