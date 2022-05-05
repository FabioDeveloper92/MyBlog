import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions, act } from '@ngrx/effects';
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
import { GoAction } from '../../../router.actions';
import { ofRoute } from '../../../router.operator';
import { selectRouterStateSnapshot } from '../../../router.selectors';
import { Comment } from '../../models/comment.model';
import { PublicState } from '../../public.state';
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
  
  mapRouteToGet$ = createEffect(() => this.action$.pipe(
    ofRoute('blog/post/:id'),
    withLatestFrom(
      this.store.select(selectRouterStateSnapshot),
      (_, router) => router
    ),
    filter((router) => !!router.params['id']),
    map((router) => new PostDetailAction(router.params['id']))
  ));

  
  postDetail$ = createEffect(() => this.action$.pipe(
    ofType<PostDetailAction>(POST_DETAIL),
    switchMap((action) =>
      this.postService.get(action.payload).pipe(
        map((item) => new PostDetailCompleteAction(item)),
        catchError((error) => of(new PostDetailErrorAction(error)))
      )
    )
  ));

  
  addComment$ = createEffect(() => this.action$.pipe(
    ofType<AddCommentPostAction>(ADD_COMMENT_POST),
    withLatestFrom(
      this.store.select(selectPostDetailId),
      (action, postId) => ( {text: action.payload, postId: postId})
    ),
    switchMap((action) =>
      this.postService.addComment(action).pipe(
        map((item) => new AddCommentPostCompleteAction()),
        catchError((error) => of(new AddCommentPostErrorAction(error)))
      )
    )
  ));

  
  addCommentComplete$ = createEffect(() => this.action$.pipe(
    ofType<AddCommentPostCompleteAction>(ADD_COMMENT_POST_COMPLETE),
    withLatestFrom(
      this.store.select(selectPostDetailId),
      (_, postId) => postId
    ),
    map((postId) => new PostDetailAction(postId))
  ));

  
  notifyError = createEffect(() => this.action$.pipe(
    ofType<PostDetailErrorAction | AddCommentPostErrorAction>(
      POST_DETAIL_ERROR,
      ADD_COMMENT_POST_ERROR
    ),
    tap((action) => {

      if (action.payload.code === 404) {
        this.store.dispatch(new GoAction({ path: ['not-found'] }));
        return;
      }

      console.log(action.payload);
    })
  ), { dispatch: false });

  constructor(
    private action$: Actions,
    private store: Store<PublicState>,
    private postService: PostService
  ) {}
}
