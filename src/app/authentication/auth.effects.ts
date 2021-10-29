import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import {
  GetUserInfoAction,
  GetUserInfoCompleteAction,
  GetUserInfoErrorAction,
  GET_USERINFO,
  GET_USERINFO_COMPLETE,
  GET_USERINFO_ERROR,
  LoggedInErrorGoogleAction,
  LoggedInGoogleAction,
  LOGGED_IN_ERROR_GOOGLE,
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
    ofType<GetUserInfoErrorAction | LoggedInErrorGoogleAction>(
      GET_USERINFO_ERROR,
      LOGGED_IN_ERROR_GOOGLE
    ),
    map((_) => new LogoutAction())
  );

  @Effect()
  loggedInGoogle$ = this.actions$.pipe(
    ofType<LoggedInGoogleAction>(LOGGED_IN_GOOGLE),
    switchMap((action) =>
      this.authenticationService.saveUserInfo(action.payload).pipe(
        map((token) => new GetUserInfoAction(token)),
        catchError((error) => of(new LoggedInErrorGoogleAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  getUserInfoComplete$ = this.actions$.pipe(
    ofType<GetUserInfoCompleteAction>(GET_USERINFO_COMPLETE),
    tap((action) => {
      if (action?.payload)
        this.cookieService.set('STKN', action.payload.internalToken);
    })
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<LogoutAction>(LOGOUT),
    tap((_) => {
      this.authenticationService.logout(this.cookieService.get('STKN'));
      this.cookieService.delete('STKN');
    })
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService
  ) {}
}
