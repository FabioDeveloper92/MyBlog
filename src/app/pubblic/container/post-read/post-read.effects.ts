import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { PostService } from '../../../core/services/post.service';
import { ofRoute } from '../../../router.operator';
import { selectRouterStateSnapshot } from '../../../router.selectors';
import { PubblicState } from '../../pubblic.state';
import { selectPostDetailId } from '../post-read/post-read.selectors';
import {
  AddCommentPostAction,
  AddCommentPostCompleteAction,
  AddCommentPostErrorAction,
  ADD_COMMENT_POST,
  ADD_COMMENT_POST_COMPLETE,
  ADD_COMMENT_POST_ERROR,
  PostDetailAction,
  PostDetailCompleteAction,
  PostDetailErrorAction,
  POST_DETAIL,
  POST_DETAIL_ERROR,
} from './post-read.actions';

@Injectable()
export class PostReadEffects {
  @Effect()
  mapRouteToGet$ = this.action$.pipe(
    ofRoute('blog/post/:id'),
    withLatestFrom(
      this.store.select(selectRouterStateSnapshot),
      (_, router) => router
    ),
    filter((router) => !!router.params['id']),
    map((router) => new PostDetailAction(router.params['id']))
  );

  @Effect()
  postDetail$ = this.action$.pipe(
    ofType<PostDetailAction>(POST_DETAIL),
    switchMap((action) =>
      this.postService.get(action.payload).pipe(
        map((item) => new PostDetailCompleteAction(item)),
        catchError((error) => of(new PostDetailErrorAction(error)))
      )
    )
  );

  @Effect()
  addComment$ = this.action$.pipe(
    ofType<AddCommentPostAction>(ADD_COMMENT_POST),
    switchMap((action) =>
      this.postService.addComment(action.payload).pipe(
        map((item) => new AddCommentPostCompleteAction()),
        catchError((error) => of(new AddCommentPostErrorAction(error)))
      )
    )
  );

  @Effect()
  addCommentComplete$ = this.action$.pipe(
    ofType<AddCommentPostCompleteAction>(ADD_COMMENT_POST_COMPLETE),
    withLatestFrom(
      this.store.select(selectPostDetailId),
      (_, postId) => postId
    ),
    map((postId) => new PostDetailAction(postId))
  );

  @Effect({ dispatch: false })
  notifyError = this.action$.pipe(
    ofType<PostDetailErrorAction | AddCommentPostErrorAction>(
      POST_DETAIL_ERROR,
      ADD_COMMENT_POST_ERROR
    ),
    tap((action) => {
      console.log(action.payload);
    })
  );

  constructor(
    private action$: Actions,
    private store: Store<PubblicState>,
    private postService: PostService
  ) {}
}
