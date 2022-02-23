import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { iif, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AppState } from './app.state';
import {
  GetConfigAction,
  GetConfigCompleteAction,
  GetConfigErrorAction,
  GET_CONFIG,
  GET_CONFIG_COMPLETE,
  GET_CONFIG_ERROR,
} from './config.actions';
import { LockerService } from './core/services/locker.service';
import {
  ChangeLanguageAction,
  ChangeLanguageErrorAction,
  ChangeLanguageSuccessAction,
  CHANGE_LANGUAGE,
  CHANGE_LANGUAGE_ERROR,
  SetupLanguageAction,
  SETUP_LANGUAGE,
} from './reducers/language/language.actions';
import { GoAction } from './router.actions';
import { ConfigService } from './services/config.service';
import { contains } from 'ramda';
import { GetUserInfoAction } from './authentication/auth.actions';
import { GetLanguageState } from './reducers/language/language.selectors';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class ConfigEffects {
  @Effect()
  getConfig$ = this.actions$.pipe(
    ofType<GetConfigAction>(GET_CONFIG),
    tap(() => this.lockerService.Lock()),
    switchMap(() =>
      this.configService.get().pipe(
        map((cfg) => new GetConfigCompleteAction(cfg)),
        catchError((error) => of(new GetConfigErrorAction(error)))
      )
    )
  );

  @Effect()
  configComplete$ = this.actions$.pipe(
    ofType<GetConfigCompleteAction>(GET_CONFIG_COMPLETE),
    tap(() => this.lockerService.Unlock()),
    mergeMap(() => [
      new GetUserInfoAction(),
      new SetupLanguageAction()
    ])
  );

  @Effect()
  setupLanguage$ = this.actions$.pipe(
    ofType<SetupLanguageAction>(SETUP_LANGUAGE),
    withLatestFrom(
      this.store.select(GetLanguageState),
      (_, langState) => langState
    ),
    map((langState) => {
      const browserLang = this.translateService.getBrowserLang();
      const lang = contains(browserLang, langState.languages)
        ? browserLang
        : 'en';

      this.translateService.addLangs(langState.languages);
      this.translateService.setDefaultLang(lang);

      return new ChangeLanguageAction(lang);
    })
  );

  @Effect()
  changeLanguage$ = this.actions$.pipe(
    ofType<ChangeLanguageAction>(CHANGE_LANGUAGE),
    switchMap(({ payload }) =>
      this.translateService.use(payload).pipe(
        map((_) => new ChangeLanguageSuccessAction(payload)),
        catchError((error) => of(new ChangeLanguageErrorAction(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  notifyErrorLanguage$ = this.actions$.pipe(
    ofType<ChangeLanguageErrorAction>(CHANGE_LANGUAGE_ERROR),
    tap(({ payload }) => {
      if (payload.code === 404) {
        this.store.dispatch(new GoAction({ path: ['not-found'] }));
      } else {
        console.log(payload.text);
      }
    })
  );

  @Effect({ dispatch: false })
  configError$ = this.actions$.pipe(
    ofType(GET_CONFIG_ERROR),
    tap(() => this.lockerService.Unlock())
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private configService: ConfigService,
    private lockerService: LockerService,
    private translateService: TranslateService,
    private cookieService: CookieService
  ) {}
}
