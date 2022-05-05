import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AppState } from '../app.state';
import { GoAction } from '../router.actions';
import { ofRoute } from '../router.operator';
import { selectRouterStateSnapshot } from '../router.selectors';
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
  NoAction,
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
  
  mapRouteToGet$ = createEffect(() => this.actions$.pipe(
    ofRoute('login'),
    map(() => {
      var oldToken = this.cookieService.get('token');
      if (oldToken) return new GoAction({ path: ['profile'] });

      return new ShowLoginTabAction();
    })
  ));

  
  getUserInfo$ = createEffect(() => this.actions$.pipe(
    ofType<GetUserInfoAction>(GET_USERINFO),
    switchMap((action) =>
      this.authenticationService.getUserInfo().pipe(
        map((userInfo) => new GetUserInfoCompleteAction(userInfo)),
        catchError((error) => of(new GetUserInfoErrorAction(error)))
      )
    )
  ));

  
  getUserInfoComplete$ = createEffect(() => this.actions$.pipe(
    ofType<GetUserInfoCompleteAction>(GET_USERINFO_COMPLETE),
    withLatestFrom(
      this.store.select(selectRouterStateSnapshot),
      (_, router) => router
    ),
    map((router) => {
      if (router.url.includes('login'))
        return new GoAction({ path: ['profile'] });

      return new NoAction();
    })
  ));

  
  getUserInfoError$ = createEffect(() => this.actions$.pipe(
    ofType<GetUserInfoErrorAction>(GET_USERINFO_ERROR),
    map((_) => new LogoutAction())
  ));

  
  loginJwt$ = createEffect(() => this.actions$.pipe(
    ofType<LoggedInGoogleAction>(LOGIN_JWT),
    switchMap((action) =>
      this.authenticationService.saveUserInfoFromGoogle(action.payload).pipe(
        map((payload) => {
          this.cookieService.set('token', payload);
          return new GetUserInfoAction();
        }),
        catchError((error) => of(new LoginJwtErrorAction(error)))
      )
    )
  ));

  
  loggedInGoogle$ = createEffect(() => this.actions$.pipe(
    ofType<LoggedInGoogleAction>(LOGGED_IN_GOOGLE),
    switchMap((action) =>
      this.authenticationService.saveUserInfoFromGoogle(action.payload).pipe(
        map((token) => {
          this.cookieService.set('token', token);
          return new GetUserInfoAction();
        }),
        catchError((error) => of(new LoggedInGoogleErrorAction(error)))
      )
    )
  ));

  
  logout$ = createEffect(() => this.actions$.pipe(
    ofType<LogoutAction>(LOGOUT),
    map((_) => {
      this.cookieService.delete('token');
      return new GoAction({ path: [''] });
    })
  ));

  
  signup$ = createEffect(() => this.actions$.pipe(
    ofType<SignupAction>(SIGNUP),
    switchMap((action) =>
      this.authenticationService.signup(action.payload).pipe(
        map((token) => new SignupCompleteAction(token)),
        catchError((error) => of(new SignupErrorAction(error)))
      )
    )
  ));

  
  signupComplete$ = createEffect(() => this.actions$.pipe(
    ofType<SignupCompleteAction>(SIGNUP_COMPLETE),
    map((action) => new GetUserInfoAction())
  ));

  
  errorAfterLogin = createEffect(() => this.actions$.pipe(
    ofType<LoggedInGoogleErrorAction | LoginJwtErrorAction | SignupErrorAction>(
      LOGGED_IN_GOOGLE_ERROR,
      LOGIN_JWT_ERROR,
      SIGNUP_ERROR
    ),
    tap((_) => console.log('ERROR AUTH EFFECTS'))
  ), { dispatch: false });

  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private authenticationService: AuthenticationService,
    private cookieService: CookieService
  ) {}
}
