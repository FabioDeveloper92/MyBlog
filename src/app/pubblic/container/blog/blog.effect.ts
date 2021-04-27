import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { GoAction } from '../../../router.actions';
import { ofRoute } from '../../../router.operator';
import { PostService } from '../../services/post.service';
import {
  OpenPostDetailAction,
  OPEN_POST_DETAIL,
  PostListAction,
  PostListCompleteAction,
  PostListErrorAction,
  POST_LIST,
  POST_LIST_ERROR,
} from './blog.actions';

@Injectable()
export class PostEffects {
  @Effect()
  mapRouteToGet$ = this.action$.pipe(
    ofRoute('blog'),
    map(() => new PostListAction())
  );

  @Effect()
  list$ = this.action$.pipe(
    ofType<PostListAction>(POST_LIST),
    switchMap(() =>
      this.postService.list(5).pipe(
        map((items) => new PostListCompleteAction(items)),
        catchError((error) => of(new PostListErrorAction(error)))
      )
    )
  );

  @Effect()
  postDetailOpen$ = this.action$.pipe(
    ofType<OpenPostDetailAction>(OPEN_POST_DETAIL),
    map((action) => new GoAction({ path: ['blog', 'post', action.payload] }))
  );

  @Effect({ dispatch: false })
  notifyError = this.action$.pipe(
    ofType<PostListErrorAction>(POST_LIST_ERROR),
    tap((action) => {
      console.log(action.payload);
    })
  );

  constructor(
    private action$: Actions,
    private postService: PostService
  ) {}
}
