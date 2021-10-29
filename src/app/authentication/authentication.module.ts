import { NgModule } from '@angular/core';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { GoogleLoginComponent } from './components/google-login/google-login.component';
import { environment } from '../../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { AuthReducers } from './auth.reducers';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationContainerComponent } from './containers/authentication/authentication.component';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routes';
import { AppHttpInterceptor } from './app.http-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [GoogleLoginComponent, AuthenticationContainerComponent],
  imports: [
    SocialLoginModule,
    StoreModule.forFeature('auth', AuthReducers),
    EffectsModule.forFeature([AuthEffects]),

    RouterModule.forChild(AuthRoutes),
  ],
  exports: [GoogleLoginComponent],
  providers: [
    AuthenticationService,
    CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(environment.googleClientId),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
})
export class AuthenticationModule {}
