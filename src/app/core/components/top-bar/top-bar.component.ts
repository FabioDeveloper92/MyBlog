import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../app.state';
import { LogoutAction } from '../../../authentication/auth.actions';
import { Observable } from 'rxjs';
import { selectIsAuthenticated } from '../../../authentication/auth.selector';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
})
export class TopBarComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
  }

  Logout(): void {
    this.store.dispatch(new LogoutAction());
  }
}
