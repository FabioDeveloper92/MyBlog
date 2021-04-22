import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, skipWhile } from 'rxjs/operators';

import { AppState } from '../app.state';
import { getConfigState } from '../config.selectors';

@Injectable()
export class ConfigGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(getConfigState).pipe(
      skipWhile(state => !state || !state.hasFinished),
      map(state => {
        if (!!state.config) {
          return true;
        }
        throw Error('No config available!');
      })
    );
  }

  canActivateChild() {
    return this.canActivate();
  }
}
