import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { selectIsAuthenticated } from '../authentication/auth.selector';
import { AuthState } from '../authentication/auth.state';
import { GoAction } from '../router.actions';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private store: Store<AuthState>) {}

  canActivate(): Observable<boolean> {
    return this.store.select(selectIsAuthenticated).pipe((state) => {
      console.log('aaa');
      if (!state) this.store.dispatch(new GoAction({ path: ['login'] }));
      return state;
    });
  }

  canActivateChild() {
    return this.canActivate();
  }
}
