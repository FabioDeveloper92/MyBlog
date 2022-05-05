import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
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
  
  list$ = createEffect(() => this.action$.pipe(
    ofType<ResumePostListAction>(RESUMEPOST_LIST),
    switchMap(() =>
      this.postService.listOverview(new PostsFilter(0, 0, 3)).pipe(
        map((items) => new ResumePostListCompleteAction(items)),
        catchError((error) => of(new ResumePostListErrorAction(error)))
      )
    )
  ));

  
  postDetailOpen$ = createEffect(() => this.action$.pipe(
    ofType<OpenPostDetailAction>(OPEN_POST_DETAIL),
    map((action) => new GoAction({ path: ['blog', 'post', action.payload] }))
  ));

  
  notifyError = createEffect(() => this.action$.pipe(
    ofType<ResumePostListErrorAction>(RESUMEPOST_LIST_ERROR),
    tap((action) => {
      console.log(action.payload);
    })
  ), { dispatch: false });

  constructor(
    private action$: Actions,
    private postService: PostService
  ) {}
}
