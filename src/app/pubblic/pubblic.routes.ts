import { Route } from '@angular/router';
import { ConfigGuard } from '../guards/config.guards';
import { HomeContainerComponent } from './container/home/home.component';
import { PostReadContainerComponent } from './container/post-read/post-read.component';

export const PubblicRoutes: Route[] = [
  {
    path: '',
    canActivate: [ConfigGuard],
    children: [
      {
        path: '',
        component: HomeContainerComponent,
      },
      {
        path: 'blog/post/:id',
        component: PostReadContainerComponent
      }
    ],
  },
];
