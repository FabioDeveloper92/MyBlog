import { Action } from '@ngrx/store';
import { ErrorPayload } from '../../../core/model/error-payload.model';
import { TagModel } from '../../../core/model/tag.model';
import { AddPost } from '../../models/add-post.model';

export const GET_TAGS_BLOG = '[AddPost] Get Tags Blog';
export const GET_TAGS_BLOG_COMPLETE = '[AddPost] Get Tags Blog Complete';
export const GET_TAGS_BLOG_ERROR = '[AddPost] Get Tags Blog Error';

export const PUBLISH_BLOG = '[AddPost] Publish Blog';
export const PUBLISH_BLOG_COMPLETE = '[AddPost] Get Publish Blog Complete';
export const PUBLISH_BLOG_ERROR = '[AddPost] Get Publish Blog Error';

export const SAVE_DRAFT_BLOG = '[AddPost] Save Draft Blog';
export const SAVE_DRAFT_BLOG_COMPLETE = '[AddPost] Save Draft Blog Complete';
export const SAVE_DRAFT_BLOG_ERROR = '[AddPost] Save Draft Blog Error';

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

export class PublishBlogAction implements Action {
  readonly type = PUBLISH_BLOG;
  constructor(public payload: AddPost) {}
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
  constructor(public payload: AddPost) {}
}

export class SaveDraftBlogCompleteAction implements Action {
  readonly type = SAVE_DRAFT_BLOG_COMPLETE;
  constructor(public payload: string) {}
}

export class SaveDraftBlogErrorAction implements Action {
  readonly type = SAVE_DRAFT_BLOG_ERROR;
  constructor(public payload: ErrorPayload) {}
}

export type AddPostActions =
  | GetTagsBlogAction
  | GetTagsBlogCompleteAction
  | GetTagsBlogErrorAction
  | PublishBlogAction
  | PublishBlogCompleteAction
  | PublishBlogErrorAction
  | SaveDraftBlogAction
  | SaveDraftBlogCompleteAction
  | SaveDraftBlogErrorAction;
