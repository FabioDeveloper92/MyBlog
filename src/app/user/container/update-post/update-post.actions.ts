import { Action } from '@ngrx/store';
import { ErrorPayload } from '../../../core/model/error-payload.model';
import { TagModel } from '../../../core/model/tag.model';
import { UpdatePost } from '../../models/update-post.model';

export const GET_TAGS_BLOG = '[UpdatePost] Get Tags Blog';
export const GET_TAGS_BLOG_COMPLETE = '[UpdatePost] Get Tags Blog Complete';
export const GET_TAGS_BLOG_ERROR = '[UpdatePost] Get Tags Blog Error';

export const GET_POST = '[UpdatePost] Get Post';
export const GET_POST_COMPLETE = '[UpdatePost] Get Post Complete';
export const GET_POST_ERROR = '[UpdatePost] Get Post Error';

export const PUBLISH_BLOG = '[UpdatePost] Publish Blog';
export const PUBLISH_BLOG_COMPLETE = '[UpdatePost] Get Publish Blog Complete';
export const PUBLISH_BLOG_ERROR = '[UpdatePost] Get Publish Blog Error';

export const SAVE_DRAFT_BLOG = '[UpdatePost] Save Draft Blog';
export const SAVE_DRAFT_BLOG_COMPLETE = '[UpdatePost] Save Draft Blog Complete';
export const SAVE_DRAFT_BLOG_ERROR = '[UpdatePost] Save Draft Blog Error';

export class GetTagsBlogAction implements Action {
  readonly type = GET_TAGS_BLOG;
  constructor() {}
}

export class GetTagsBlogCompleteAction implements Action {
  readonly type = GET_TAGS_BLOG_COMPLETE;
  constructor(public payload: TagModel[]) {}
}

export class GetTagsBlogErrorAction implements Action {
  readonly type = GET_TAGS_BLOG_ERROR;
  constructor(public payload: ErrorPayload) {}
}

export class GetPostAction implements Action {
  readonly type = GET_POST;
  constructor(public payload: string) {}
}

export class GetPostCompleteAction implements Action {
  readonly type = GET_POST_COMPLETE;
  constructor(public payload: UpdatePost) {}
}

export class GetPostErrorAction implements Action {
  readonly type = GET_POST_ERROR;
  constructor(public payload: ErrorPayload) {}
}

export class PublishBlogAction implements Action {
  readonly type = PUBLISH_BLOG;
  constructor(public payload: UpdatePost) {}
}

export class PublishBlogCompleteAction implements Action {
  readonly type = PUBLISH_BLOG_COMPLETE;
  constructor(public payload: string) {}
}

export class PublishBlogErrorAction implements Action {
  readonly type = PUBLISH_BLOG_ERROR;
  constructor(public payload: ErrorPayload) {}
}

export class SaveDraftBlogAction implements Action {
  readonly type = SAVE_DRAFT_BLOG;
  constructor(public payload: UpdatePost) {}
}

export class SaveDraftBlogCompleteAction implements Action {
  readonly type = SAVE_DRAFT_BLOG_COMPLETE;
  constructor() {}
}

export class SaveDraftBlogErrorAction implements Action {
  readonly type = SAVE_DRAFT_BLOG_ERROR;
  constructor(public payload: ErrorPayload) {}
}

export type UpdatePostActions =
  | GetTagsBlogAction
  | GetTagsBlogCompleteAction
  | GetTagsBlogErrorAction
  | GetPostAction
  | GetPostCompleteAction
  | GetPostErrorAction
  | PublishBlogAction
  | PublishBlogCompleteAction
  | PublishBlogErrorAction
  | SaveDraftBlogAction
  | SaveDraftBlogCompleteAction
  | SaveDraftBlogErrorAction;
