import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Actions, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { filter, map, tap } from 'rxjs/operators';
import { BACK, ChangeAction, FORWARD, GO, GoAction } from './router.actions';

@Injectable()
export class RouterEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private location: Location,
    private store: Store<any>
  ) {
    this.listenToRouter();
  }

  
  navigate$ = createEffect(() => this.actions$.pipe(
    filter((a) => a.type === GO),
    map((action: GoAction) => action.payload),
    tap(({ path, queryParams, extras }) =>
      this.router.navigate(path, { queryParams, ...extras })
    )
  ), { dispatch: false });

  
  navigateBack$ = createEffect(() => this.actions$.pipe(
    filter((a) => a.type === BACK),
    tap(() => this.location.back())
  ), { dispatch: false });

  
  navigateForward$ = createEffect(() => this.actions$.pipe(
    filter((a) => a.type === FORWARD),
    tap(() => this.location.forward())
  ), { dispatch: false });

  private listenToRouter() {
    this.router.events
      .pipe(filter((event) => event instanceof ActivationEnd))
      .subscribe((event: ActivationEnd) =>
        this.store.dispatch(
          new ChangeAction({
            params: { ...event.snapshot.params },
            path: event.snapshot.routeConfig.path,
          })
        )
      );
  }
}
