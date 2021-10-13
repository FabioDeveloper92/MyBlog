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
import { JwtService } from './services/jwt.service';
import { AuthenticationContainerComponent } from './containers/authentication/authentication.component';
import { RouterModule } from '@angular/router';
import { AuthRoutes } from './auth.routes';

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
    JwtService,

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
