import { Action } from '@ngrx/store';
import { ErrorPayload } from '../../../core/model/error-payload.model';
import { VoiceMenu } from '../../../core/model/voice-menu.model';
import { ResumePost } from '../../models/resume-post.model';

export const POST_LIST = '[Blog] Post List';
export const POST_LIST_COMPLETE = '[Blog] Post List Complete';
export const POST_LIST_ERROR = '[Blog] Post List Error';

export const OPEN_POST_DETAIL = '[Blog] Open Post Detail';

export const INIT_ORDER_BY_VISIBILITY = '[Blog] Init Order By Visibility';

export const INIT_FILTER_BY_TIME = '[Blog] Init Filter By Time';

export const SELECT_ORDER_BY_VISIBILITY = '[Blog] Select Order By Visibility';

export const SELECT_FILTER_BY_TIME = '[Blog] Select Filter By Time';

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

export class InitOrderByVisibility implements Action {
  readonly type = INIT_ORDER_BY_VISIBILITY;
  constructor(public payload: VoiceMenu[]) {}
}

export class InitFilterByTime implements Action {
  readonly type = INIT_FILTER_BY_TIME;
  constructor(public payload: VoiceMenu[]) {}
}

export class SelectOrderByVisibility implements Action {
  readonly type = SELECT_ORDER_BY_VISIBILITY;
  constructor(public payload: number) {}
}

export class SelectFilterByTime implements Action {
  readonly type = SELECT_FILTER_BY_TIME;
  constructor(public payload: number) {}
}

export type BlogActions =
  | PostListAction
  | PostListCompleteAction
  | PostListErrorAction
  | OpenPostDetailAction
  | InitOrderByVisibility
  | InitFilterByTime
  | SelectOrderByVisibility
  | SelectFilterByTime;
