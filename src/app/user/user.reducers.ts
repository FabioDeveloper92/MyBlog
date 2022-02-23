import { ActionReducerMap } from '@ngrx/store';
import { AddPostReducers } from './container/add-post/add-post.reducers';
import { UpdatePostReducers } from './container/update-post/update-post.reducers';
import { UserAreaReducers } from './container/user-area/user-area.reducers';
import { UserState } from './user.state';

export const UserReducers: ActionReducerMap<UserState> = {
  addPost: AddPostReducers,
  updatePost: UpdatePostReducers,
  userArea: UserAreaReducers,
};
