import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { GoAction } from '../router.actions';
import { ofRoute } from '../router.operator';
import {
  GetUserInfoAction,
  GetUserInfoCompleteAction,
  GetUserInfoErrorAction,
  GET_USERINFO,
  GET_USERINFO_COMPLETE,
  GET_USERINFO_ERROR,
  LoggedInGoogleAction,
  LoggedInGoogleErrorAction,
  LOGGED_IN_GOOGLE,
  LOGGED_IN_GOOGLE_ERROR,
  LoginJwtErrorAction,
  LOGIN_JWT,
  LOGIN_JWT_ERROR,
  LOGOUT,
  LogoutAction,
  ShowLoginTabAction,
  SIGNUP,
  SignupAction,
  SignupCompleteAction,
  SignupErrorAction,
  SIGNUP_COMPLETE,
  SIGNUP_ERROR,
} from './auth.actions';
import { AuthenticationService } from './services/authentication.service';

@Injectable()
export class AuthEffects {
  @Effect()
  mapRouteToGet$ = this.actions$.pipe(
    ofRoute('login'),
    map(() => new ShowLoginTabAction())
  );

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
  getUserInfoComplete$ = this.actions$.pipe(
    ofType<GetUserInfoCompleteAction>(GET_USERINFO_COMPLETE),
    map((action) => {
      var existToken = this.cookieService.get('STKN') !== undefined;

      if (action?.payload)
        this.cookieService.set('STKN', action.payload.internalToken);

      if (!existToken) return new GoAction({ path: ['profile'] });
    })
  );

  @Effect()
  getUserInfoError$ = this.actions$.pipe(
    ofType<GetUserInfoErrorAction>(GET_USERINFO_ERROR),
    map((_) => new LogoutAction())
  );

  @Effect()
  loginJwt$ = this.actions$.pipe(
    ofType<LoggedInGoogleAction>(LOGIN_JWT),
    switchMap((action) =>
      this.authenticationService.saveUserInfoFromGoogle(action.payload).pipe(
        map((payload) => new GetUserInfoAction(payload)),
        catchError((error) => of(new LoginJwtErrorAction(error)))
      )
    )
  );

  @Effect()
  loggedInGoogle$ = this.actions$.pipe(
    ofType<LoggedInGoogleAction>(LOGGED_IN_GOOGLE),
    switchMap((action) =>
      this.authenticationService.saveUserInfoFromGoogle(action.payload).pipe(
        map((token) => new GetUserInfoAction(token)),
        catchError((error) => of(new LoggedInGoogleErrorAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  logout$ = this.actions$.pipe(
    ofType<LogoutAction>(LOGOUT),
    tap((_) => {
      this.authenticationService.logout(this.cookieService.get('STKN'));
      this.cookieService.delete('STKN');
    })
  );

  @Effect()
  signup$ = this.actions$.pipe(
    ofType<SignupAction>(SIGNUP),
    switchMap((action) =>
      this.authenticationService.signup(action.payload).pipe(
        map((token) => new SignupCompleteAction(token)),
        catchError((error) => of(new SignupErrorAction(error)))
      )
    )
  );

  @Effect()
  signupComplete$ = this.actions$.pipe(
    ofType<SignupCompleteAction>(SIGNUP_COMPLETE),
    map((action) => new GetUserInfoAction(action.payload))
  );

  @Effect({ dispatch: false })
  errorAfterLogin = this.actions$.pipe(
    ofType<LoggedInGoogleErrorAction | LoginJwtErrorAction | SignupErrorAction>(
      LOGGED_IN_GOOGLE_ERROR,
      LOGIN_JWT_ERROR,
      SIGNUP_ERROR
    ),
    tap((_) => console.log('ERROR AUTH EFFECTS'))
  );

  constructor(
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService
  ) {}
}
