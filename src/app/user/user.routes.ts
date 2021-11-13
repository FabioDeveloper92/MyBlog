import { AddPostContainerComponent } from './container/add-post/add-post.component';
import { Route } from '@angular/router';
import { ConfigGuard } from '../guards/config.guards';
import { AuthGuard } from '../guards/auth.guards';

export const UserRoutes: Route[] = [
  {
    path: '',
    canActivate: [ConfigGuard],
    children: [
      {
        path: 'newpost',
        component: AddPostContainerComponent,
      }
    ],
  },
];
