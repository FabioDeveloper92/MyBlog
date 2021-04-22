import { Injectable } from '@angular/core';
import { Effect, ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { GoAction } from '../../../router.actions';
import { PostService } from '../../services/post.service';
import {
  OpenPostDetailAction,
  OPEN_POST_DETAIL,
  ResumePostListAction,
  ResumePostListCompleteAction,
  ResumePostListErrorAction,
  RESUMEPOST_LIST,
  RESUMEPOST_LIST_ERROR,
} from './home.actions';

@Injectable()
export class HomeEffects {
  @Effect()
  list$ = this.action$.pipe(
    ofType<ResumePostListAction>(RESUMEPOST_LIST),
    switchMap(() =>
      this.postService.list().pipe(
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
    private action$: ActionsSubject,
    private postService: PostService
  ) {}
}
