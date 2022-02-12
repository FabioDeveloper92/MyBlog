import { Route } from '@angular/router';
import { AuthGuard } from '../guards/auth.guards';
import { ConfigGuard } from '../guards/config.guards';
import { AddPostContainerComponent } from './container/add-post/add-post.component';
import { UpdatePostContainerComponent } from './container/update-post/update-post.component';
import { UserAreaContainerComponent } from './container/user-area/user-area.component';

export const UserRoutes: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard, ConfigGuard],
    children: [
      {
        path: 'profile',
        component: UserAreaContainerComponent,
      },
      {
        path: 'newpost',
        component: AddPostContainerComponent,
      },
      {
        path: 'updatepost/:id',
        component: UpdatePostContainerComponent,
      },
    ],
  },
];
