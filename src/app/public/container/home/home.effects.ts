import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { GoAction } from '../../../router.actions';
import { PostService } from '../../../core/services/post.service';
import {
  OpenPostDetailAction,
  OPEN_POST_DETAIL,
  ResumePostListAction,
  ResumePostListCompleteAction,
  ResumePostListErrorAction,
  RESUMEPOST_LIST,
  RESUMEPOST_LIST_ERROR,
} from './home.actions';
import { PostsFilter } from '../../models/posts-filter.model';

@Injectable()
export class HomeEffects {
  @Effect()
  list$ = this.action$.pipe(
    ofType<ResumePostListAction>(RESUMEPOST_LIST),
    switchMap(() =>
      this.postService.listOverview(new PostsFilter(0, 0, 3)).pipe(
        map((items) => new ResumePostListCompleteAction(items)),
        catchError((error) => of(new ResumePostListErrorAction(error)))
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
    ofType<ResumePostListErrorAction>(RESUMEPOST_LIST_ERROR),
    tap((action) => {
      console.log(action.payload);
    })
  );

  constructor(
    private action$: Actions,
    private postService: PostService
  ) {}
}
