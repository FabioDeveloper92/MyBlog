import { AddPostState } from './container/add-post/add-post.state';
import { UpdatePostState } from './container/update-post/update-post.state';
import { UserAreaState } from './container/user-area/user-area.state';

export interface UserState {
  addPost: AddPostState;
  updatePost: UpdatePostState;
  userArea: UserAreaState;
}
