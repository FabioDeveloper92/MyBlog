import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { PostService } from '../../../core/services/post.service';
import { ofRoute } from '../../../router.operator';
import { MyPostFilter } from '../../models/my-post-filter.model';
import {
  ExpandListAction,
  EXPAND_LIST,
  FilterByStateAction,
  FilterByTitleContainsAction,
  FILTER_BY_STATE,
  FILTER_BY_TITLE_CONTAINS,
  GetPostsAction,
  GetPostsCompleteAction,
  GetPostsErrorAction,
  GET_POSTS,
  GET_POSTS_ERROR,
  OrderByDateAction,
  ORDER_BY_DATE,
  ReduceListAction,
  REDUCE_LIST,
} from '../user-area/user-area.actions';
import {
  selectFilterByState,
  selectFilterByTitleContains,
  selectOrderByDate,
  selectShowPostLimit,
} from './user-area.selector';
import { UserAreaState } from './user-area.state';

@Injectable()
export class UserAreaEffects {
  @Effect()
  mapRouteToGet$ = this.action$.pipe(
    ofRoute('profile'),
    map((_) => new GetPostsAction())
  );

  @Effect()
  filterEvent$ = this.action$.pipe(
    ofType<
      | FilterByStateAction
      | FilterByTitleContainsAction
      | OrderByDateAction
      | ExpandListAction
      | ReduceListAction
    >(
      FILTER_BY_STATE,
      FILTER_BY_TITLE_CONTAINS,
      ORDER_BY_DATE,
      EXPAND_LIST,
      REDUCE_LIST
    ),
    map(() => new GetPostsAction())
  );

  @Effect()
  getPosts$ = this.action$.pipe(
    ofType<GetPostsAction>(GET_POSTS),
    debounceTime(250),
    withLatestFrom(
      this.store.select(selectFilterByTitleContains),
      this.store.select(selectFilterByState),
      this.store.select(selectOrderByDate),
      this.store.select(selectShowPostLimit),
      (
        _,
        filterByTitleContains,
        filterByState,
        orderByDate,
        showPostLimit
      ) => ({
        filter: new MyPostFilter(
          filterByTitleContains,
          filterByState,
          orderByDate,
          showPostLimit
        ),
      })
    ),
    switchMap((myPostFilter) =>
      this.postService.getPosts(myPostFilter.filter).pipe(
        map((item) => new GetPostsCompleteAction(item)),
        catchError((error) => of(new GetPostsErrorAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  notifyError = this.action$.pipe(
    ofType<GetPostsErrorAction>(GET_POSTS_ERROR),
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
