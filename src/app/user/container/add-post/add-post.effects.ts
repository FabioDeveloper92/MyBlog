import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PostService } from '../../../core/services/post.service';
import { TagsService } from '../../../core/services/tags.service';
import { ofRoute } from '../../../router.operator';
import {
  GetTagsBlogAction,
  GetTagsBlogCompleteAction,
  GetTagsBlogErrorAction,
  GET_TAGS_BLOG,
  GET_TAGS_BLOG_ERROR,
  PublishBlogAction,
  PublishBlogCompleteAction,
  PublishBlogErrorAction,
  PUBLISH_BLOG,
  SaveDraftBlogAction,
  SaveDraftBlogCompleteAction,
  SaveDraftBlogErrorAction,
  SAVE_DRAFT_BLOG,
} from './add-post.actions';

@Injectable()
export class AddPostEffects {
  @Effect()
  mapRouteToGet$ = this.action$.pipe(
    ofRoute('newpost'),
    map((_) => new GetTagsBlogAction())
  );

  @Effect()
  getTagsBlog$ = this.action$.pipe(
    ofType<GetTagsBlogAction>(GET_TAGS_BLOG),
    switchMap(() =>
      this.tagsService.list().pipe(
        map((item) => new GetTagsBlogCompleteAction(item)),
        catchError((error) => of(new GetTagsBlogErrorAction(error)))
      )
    )
  );

  @Effect()
  publishPost$ = this.action$.pipe(
    ofType<PublishBlogAction>(PUBLISH_BLOG),
    switchMap((action) =>
      this.postService.publishPost(action.payload).pipe(
        map((item) => new PublishBlogCompleteAction(item)),
        catchError((error) => of(new PublishBlogErrorAction(error)))
      )
    )
  );

  @Effect()
  saveDraftPost$ = this.action$.pipe(
    ofType<SaveDraftBlogAction>(SAVE_DRAFT_BLOG),
    switchMap((action) =>
      this.postService.saveDraftPost(action.payload).pipe(
        map((item) => new SaveDraftBlogCompleteAction(item)),
        catchError((error) => of(new SaveDraftBlogErrorAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  notifyError = this.action$.pipe(
    ofType<GetTagsBlogErrorAction>(GET_TAGS_BLOG_ERROR),
    tap((action) => {
      console.log(action.payload);
    })
  );

  constructor(
    private action$: Actions,
    private tagsService: TagsService,
    private postService: PostService
  ) {}
}
