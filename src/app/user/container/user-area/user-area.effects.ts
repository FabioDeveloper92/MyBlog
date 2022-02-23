import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { PostService } from '../../../core/services/post.service';
import { ofRoute } from '../../../router.operator';
import {
  GetPostsAction,
  GetPostsCompleteAction,
  GetPostsErrorAction,
  GET_POSTS,
  GET_POSTS_COMPLETE,
} from '../user-area/user-area.actions';
import { UserAreaState } from './user-area.state';

@Injectable()
export class UserAreaEffects {
  @Effect()
  mapRouteToGet$ = this.action$.pipe(
    ofRoute('yourprofile'),
    map((router) => new GetPostsAction('router.params'))
  );

  @Effect()
  getPosts$ = this.action$.pipe(
    ofType<GetPostsAction>(GET_POSTS),
    switchMap((action) =>
      this.postService.getPosts(action.payload).pipe(
        map((item) => new GetPostsCompleteAction(item)),
        catchError((error) => of(new GetPostsErrorAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  notifyError = this.action$.pipe(
    ofType<GetPostsErrorAction>(GET_POSTS_COMPLETE),
    tap((action) => {
      console.log(action.payload);
    })
  );

  constructor(
    private action$: Actions,
    private store: Store<UserAreaState>,
    private postService: PostService
  ) {}
}
