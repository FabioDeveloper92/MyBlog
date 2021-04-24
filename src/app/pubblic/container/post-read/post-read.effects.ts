import { Injectable } from '@angular/core';
import { Effect, ofType } from '@ngrx/effects';
import { ActionsSubject, Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { ofRoute } from '../../../router.operator';
import { selectRouterStateSnapshot } from '../../../router.selectors';
import { PubblicState } from '../../pubblic.state';
import { PostService } from '../../services/post.service';
import {
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

  @Effect({ dispatch: false })
  notifyError = this.action$.pipe(
    ofType<PostDetailErrorAction>(POST_DETAIL_ERROR),
    tap((action) => {
      console.log(action.payload);
    })
  );

  constructor(
    private action$: ActionsSubject,
    private store: Store<PubblicState>,
    private postService: PostService
  ) {}
}
