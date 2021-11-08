import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth.state';
import { SocialAuthService } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { AddUserInfo } from '../../model/add-user-info.model';
import { AuthenticationType } from '../../model/authentican-type.model';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss'],
})
export class GoogleLoginComponent {
  @Input() isBusyLoginSignup: boolean;
  @Output() loginGoogle = new EventEmitter<AddUserInfo>();

  constructor(
    private store: Store<AuthState>,
    private authService: SocialAuthService
  ) {}

  onLogin() {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((socialUser) => {
        let userInfo = new AddUserInfo();

        userInfo.name = socialUser.firstName;
        userInfo.surname = socialUser.lastName;
        userInfo.email = socialUser.email;
        userInfo.externalToken = socialUser.idToken;
        userInfo.loginWith = AuthenticationType.Google;

        this.loginGoogle.emit(userInfo);
      });
  }
}
