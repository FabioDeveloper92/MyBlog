import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  concatMap,
  debounceTime,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { PostService } from '../../../core/services/post.service';
import { GoAction } from '../../../router.actions';
import { ofRoute } from '../../../router.operator';
import { FILTER_BY_TIME_VOICES } from '../../models/filter-by-time.model';
import { ORDER_BY_VISIBILITY_VOICES } from '../../models/order-by-visibility.model';
import { PostsFilter } from '../../models/posts-filter.model';
import {
  InitFilterByTime,
  InitOrderByVisibility,
  OpenPostDetailAction,
  OPEN_POST_DETAIL,
  PostListAction,
  PostListCompleteAction,
  PostListErrorAction,
  POST_LIST,
  POST_LIST_ERROR,
  SelectFilterByTime,
  SelectOrderByVisibility,
  SELECT_FILTER_BY_TIME,
  SELECT_ORDER_BY_VISIBILITY,
} from './blog.actions';
import {
  selectSelectTimeVoices,
  selectSelectVisibilityVoices,
} from './blog.selectors';
import { BlogState } from './blog.state';

@Injectable()
export class BlogEffects {
  
  mapRouteToGet$ = createEffect(() => this.action$.pipe(
    ofRoute('blog'),
    concatMap(() => [
      new InitFilterByTime(FILTER_BY_TIME_VOICES),
      new InitOrderByVisibility(ORDER_BY_VISIBILITY_VOICES),
      new PostListAction()
    ])
  ));

  
  list$ = createEffect(() => this.action$.pipe(
    ofType<PostListAction>(POST_LIST),
    debounceTime(250),
    withLatestFrom(
      this.store.select(selectSelectVisibilityVoices),
      this.store.select(selectSelectTimeVoices),
      (_, filterByVisibility, filterByTime) => ({
        filter: new PostsFilter(filterByVisibility, filterByTime, 100),
      })
    ),
    switchMap((action) =>
      this.postService.listOverview(action.filter).pipe(
        map((items) => new PostListCompleteAction(items)),
        catchError((error) => of(new PostListErrorAction(error)))
      )
    )
  ));

  
  selectFilterByTime$ = createEffect(() => this.action$.pipe(
    ofType<SelectFilterByTime>(SELECT_FILTER_BY_TIME),
    map((_) => new PostListAction())
  ));

  
  selectOrderByVisibility$ = createEffect(() => this.action$.pipe(
    ofType<SelectOrderByVisibility>(SELECT_ORDER_BY_VISIBILITY),
    map((_) => new PostListAction())
  ));

  
  postDetailOpen$ = createEffect(() => this.action$.pipe(
    ofType<OpenPostDetailAction>(OPEN_POST_DETAIL),
    map((action) => new GoAction({ path: ['blog', 'post', action.payload] }))
  ));

  
  notifyError = createEffect(() => this.action$.pipe(
    ofType<PostListErrorAction>(POST_LIST_ERROR),
    tap((action) => {
      console.log(action.payload);
    })
  ), { dispatch: false });

  constructor(
    private action$: Actions,
    private store: Store<BlogState>,
    private postService: PostService
  ) {}
}
