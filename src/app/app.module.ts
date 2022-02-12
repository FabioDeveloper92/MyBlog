import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { Store, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { AppMetaReducers } from './app-meta.reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppReducers } from './app.reducers';
import { AppRoutes } from './app.routes';
import { AppState } from './app.state';
import { AuthenticationModule } from './authentication/authentication.module';
import { GetConfigAction } from './config.actions';
import { ConfigEffects } from './config.effects';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { CustomRouterStateSerializer } from './custom-router.state-serializer';
import { ConfigGuard } from './guards/config.guards';
import { AuthGuard } from './guards/auth.guards';
import { HttpLoaderFactory } from './http-loader-factory';
import { PublicModule } from './public/public.module';
import { RouterEffects } from './router.effects';
import { ConfigService } from './services/config.service';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    PublicModule,
    AuthenticationModule,
    UserModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    RouterModule.forRoot(AppRoutes),
    StoreModule.forRoot(AppReducers, { metaReducers: AppMetaReducers }),

    EffectsModule.forRoot([ConfigEffects, RouterEffects]),

    StoreRouterConnectingModule.forRoot(),

    CoreModule.forRoot(),

    !environment.production
      ? StoreDevtoolsModule.instrument({ maxAge: 20 })
      : [],
  ],
  providers: [
    { provide: 'WINDOW', useFactory: getWindow },

    ConfigService,
    ConfigGuard,
    AuthGuard,

    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer,
    },

    {
      provide: APP_INITIALIZER,
      useFactory: (store: Store<AppState>) => {
        return () => {
          store.dispatch(new GetConfigAction());
        };
      },
      multi: true,
      deps: [Store],
    },
  ],
  exports: [CoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function getWindow(): Window {
  return typeof window !== 'undefined' ? window : null;
}
