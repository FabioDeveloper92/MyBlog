import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import {
  RouterStateSerializer,
  StoreRouterConnectingModule,
} from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { AppMetaReducers } from './app-meta.reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppReducers } from './app.reducers';
import { AppRoutes } from './app.routes';
import { ConfigEffects } from './config.effects';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { CoreModule } from './core/core.module';
import { CustomRouterStateSerializer } from './custom-router.state-serializer';
import { ConfigGuard } from './guards/config.guards';
import { HttpLoaderFactory } from './http-loader-factory';
import { PubblicModule } from './pubblic/pubblic.module';
import { RouterEffects } from './router.effects';
import { ConfigService } from './services/config.service';

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,

    PubblicModule,

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

    {
      provide: RouterStateSerializer,
      useClass: CustomRouterStateSerializer,
    },
  ],
  exports: [CoreModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function getWindow(): Window {
  return typeof window !== 'undefined' ? window : null;
}
