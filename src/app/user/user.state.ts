import { AddPostState } from './container/add-post/add-post.state';
import { UpdatePostState } from './container/update-post/update-post.state';

export interface UserState {
  addPost: AddPostState;
  updatePost: UpdatePostState;
}
