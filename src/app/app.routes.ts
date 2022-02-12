import { Routes } from '@angular/router';
import { NotFoundComponent } from './containers/not-found/not-found.component';
import { ConfigGuard } from './guards/config.guards';

export const AppRoutes: Routes = [
  {
    path: 'not-found',
    component: NotFoundComponent,
    canActivate: [ConfigGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
    canActivate: [ConfigGuard],
  },
];
