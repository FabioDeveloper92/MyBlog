import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { PostService } from '../../../core/services/post.service';
import { TagsService } from '../../../core/services/tags.service';
import { PublicState } from '../../../public/public.state';
import { GoAction } from '../../../router.actions';
import { ofRoute } from '../../../router.operator';
import { selectRouterStateSnapshot } from '../../../router.selectors';
import {
  GetPostAction,
  GetPostCompleteAction,
  GetPostErrorAction,
  GetTagsBlogAction,
  GetTagsBlogCompleteAction,
  GetTagsBlogErrorAction,
  GET_POST,
  GET_POST_ERROR,
  GET_TAGS_BLOG,
  GET_TAGS_BLOG_ERROR,
  PublishBlogAction,
  PublishBlogCompleteAction,
  PublishBlogErrorAction,
  PUBLISH_BLOG,
  PUBLISH_BLOG_ERROR,
  SaveDraftBlogAction,
  SaveDraftBlogCompleteAction,
  SaveDraftBlogErrorAction,
  SAVE_DRAFT_BLOG,
  SAVE_DRAFT_BLOG_ERROR,
} from './update-post.actions';

@Injectable()
export class UpdatePostEffects {
  @Effect()
  mapRouteToGet$ = this.action$.pipe(
    ofRoute('updatepost/:id'),
    withLatestFrom(
      this.store.select(selectRouterStateSnapshot),
      (_, router) => router
    ),
    filter((router) => !!router.params['id']),
    concatMap((router) => [
      new GetTagsBlogAction(),
      new GetPostAction(router.params['id']),
    ])
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
  getPost$ = this.action$.pipe(
    ofType<GetPostAction>(GET_POST),
    switchMap((action) =>
      this.postService.getUpdatePost(action.payload).pipe(
        map((item) => new GetPostCompleteAction(item)),
        catchError((error) => of(new GetPostErrorAction(error)))
      )
    )
  );

  @Effect()
  publishPost$ = this.action$.pipe(
    ofType<PublishBlogAction>(PUBLISH_BLOG),
    switchMap((action) =>
      this.postService.addPost(action.payload).pipe(
        map((item) => new PublishBlogCompleteAction(item)),
        catchError((error) => of(new PublishBlogErrorAction(error)))
      )
    )
  );

  @Effect()
  saveDraftPost$ = this.action$.pipe(
    ofType<SaveDraftBlogAction>(SAVE_DRAFT_BLOG),
    switchMap((action) =>
      this.postService.addPost(action.payload).pipe(
        map((item) => new SaveDraftBlogCompleteAction()),
        catchError((error) => of(new SaveDraftBlogErrorAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  notifyError = this.action$.pipe(
    ofType<
      | GetTagsBlogErrorAction
      | SaveDraftBlogErrorAction
      | PublishBlogErrorAction
      | GetPostErrorAction
    >(
      GET_TAGS_BLOG_ERROR,
      SAVE_DRAFT_BLOG_ERROR,
      PUBLISH_BLOG_ERROR,
      GET_POST_ERROR
    ),
    tap((action) => {
      
      if (action.payload.code === 404) {
        this.store.dispatch(new GoAction({ path: ['not-found'] }));
        return;
      }

      console.log(action.payload);
    })
  );

  constructor(
    private action$: Actions,
    private store: Store<PublicState>,
    private tagsService: TagsService,
    private postService: PostService
  ) {}
}
