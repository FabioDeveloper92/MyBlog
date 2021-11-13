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
import { CoreModule } from '../core/core.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GoogleLoginComponent,
    AuthenticationContainerComponent,
    LoginFormComponent,
    RegistrationFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    SocialLoginModule,
    StoreModule.forFeature('auth', AuthReducers),
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild(AuthRoutes),

    CoreModule.forRoot(),
  ],
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
