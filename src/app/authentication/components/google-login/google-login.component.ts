import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth.state';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { LoggedInGoogleAction } from '../../auth.actions';
import { UserInfo } from '../../model/user-info.model';
import { AuthenticationType } from '../../model/authentican-type.model';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
})
export class GoogleLoginComponent {
  constructor(
    private store: Store<AuthState>,
    private authService: SocialAuthService
  ) {}

  onLogin() {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((socialUser) => {
        let userInfo = new UserInfo();

        userInfo.name= socialUser.firstName;
        userInfo.surname= socialUser.lastName;
        userInfo.email = socialUser.email;
        userInfo.externalId = socialUser.id;
        userInfo.loginWith = AuthenticationType.Google;

        this.store.dispatch(new LoggedInGoogleAction(userInfo));
      });
  }
}
