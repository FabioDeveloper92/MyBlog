import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  GetUserInfoAction,
  GetUserInfoCompleteAction,
  GetUserInfoErrorAction,
  GET_USERINFO,
  GET_USERINFO_COMPLETE,
  GET_USERINFO_ERROR,
  LoggedInGoogleAction,
  LOGGED_IN_GOOGLE,
  LOGOUT,
  LogoutAction,
} from './auth.actions';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class AuthEffects {
  @Effect()
  getUserInfo$ = this.actions$.pipe(
    ofType<GetUserInfoAction>(GET_USERINFO),
    switchMap((action) =>
      this.authenticationService.getUserInfo(action.payload).pipe(
        map((userInfo) => new GetUserInfoCompleteAction(userInfo)),
        catchError((error) => of(new GetUserInfoErrorAction(error)))
      )
    )
  );

  @Effect()
  getUserInfoError$ = this.actions$.pipe(
    ofType<GetUserInfoErrorAction>(GET_USERINFO_ERROR),
    map((_) => new LogoutAction())
  );

  @Effect()
  loggedInGoogle$ = this.actions$.pipe(
    ofType<LoggedInGoogleAction>(LOGGED_IN_GOOGLE),
    switchMap((action) =>
      this.authenticationService.saveUserInfo(action.payload).pipe(
        map((token) => new GetUserInfoAction(token)),
        catchError((error) => of(new GetUserInfoErrorAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<LogoutAction>(LOGOUT),
    map(() => this.authenticationService.logout())
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService
  ) {}
}
