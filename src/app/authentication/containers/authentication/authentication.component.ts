import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Store } from '@ngrx/store';
import { AuthState } from '../../auth.state';
import {
  selectShowLoginTab,
  selectIsBusyLoginSignup,
} from '../../auth.selector';
import {
  LoggedInGoogleAction,
  LoginJwtAction,
  ShowLoginTabAction,
  ShowSignupTabAction,
  SignupAction,
} from '../../auth.actions';
import { AddUserInfo } from '../../model/add-user-info.model';
import { LoginUser } from '../../model/login-user.model';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationContainerComponent {
  isShowTabLogin$: Observable<boolean>;
  isBusyLoginSignup$: Observable<boolean>;

  constructor(private store: Store<AuthState>) {
    this.isShowTabLogin$ = this.store.select(selectShowLoginTab);
    this.isBusyLoginSignup$ = this.store.select(selectIsBusyLoginSignup);
  }

  onLogin(event: LoginUser) {
    this.store.dispatch(new LoginJwtAction(event));
  }

  onSignup(event: AddUserInfo) {
    this.store.dispatch(new SignupAction(event));
  }

  onShowLoginTab() {
    this.store.dispatch(new ShowLoginTabAction());
  }

  onShowSignupTab() {
    this.store.dispatch(new ShowSignupTabAction());
  }

  onLoginGoogle(event: AddUserInfo) {
    this.store.dispatch(new LoggedInGoogleAction(event));
  }
}
