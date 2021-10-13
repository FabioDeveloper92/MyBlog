import { Route } from '@angular/router';
import { ConfigGuard } from '../guards/config.guards';
import { AuthenticationContainerComponent } from './containers/authentication/authentication.component';

export const AuthRoutes: Route[] = [
  {
    path: '',
    canActivate: [ConfigGuard],
    children: [
      {
        path: 'login',
        component: AuthenticationContainerComponent,
      },
    ],
  },
];
