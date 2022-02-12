import { Action } from '@ngrx/store';
import { ResumePost } from '../../models/resume-post.model';
import { ErrorPayload } from '../../../core/model/error-payload.model';

export const RESUMEPOST_LIST = '[Home] ResumePost List';
export const RESUMEPOST_LIST_COMPLETE = '[Home] ResumePost List Complete';
export const RESUMEPOST_LIST_ERROR = '[Home] ResumePost List Error';

export const OPEN_POST_DETAIL = '[Home] Open Post Detail';

export class ResumePostListAction implements Action {
  readonly type = RESUMEPOST_LIST;
  constructor() {}
}

export class ResumePostListCompleteAction implements Action {
  readonly type = RESUMEPOST_LIST_COMPLETE;
  constructor(public payload: ResumePost[]) {}
}

export class ResumePostListErrorAction implements Action {
  readonly type = RESUMEPOST_LIST_ERROR;
  constructor(public payload: ErrorPayload) {}
}

export class OpenPostDetailAction implements Action {
  readonly type = OPEN_POST_DETAIL;
  constructor(public payload: string) {}
}

export type HomeActions =
  | ResumePostListAction
  | ResumePostListCompleteAction
  | ResumePostListErrorAction
  | OpenPostDetailAction;
