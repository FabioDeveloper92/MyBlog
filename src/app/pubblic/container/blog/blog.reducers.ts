import {
  BlogActions,
  POST_LIST,
  POST_LIST_COMPLETE,
  POST_LIST_ERROR,
} from './blog.actions';
import { postListAdapter } from './blog.selectors';
import { BlogState } from './blog.state';

export function BlogReducers(
  state = postListAdapter.getInitialState({ isPostList: false }),
  action: BlogActions
): BlogState {
  switch (action.type) {
    case POST_LIST:
      return {
        ...postListAdapter.removeAll(state),
        isPostList: true,
      };
    case POST_LIST_COMPLETE:
      return {
        ...postListAdapter.addMany(action.payload, state),
        isPostList: false,
      };

    case POST_LIST_ERROR:
      return {
        ...postListAdapter.removeAll(state),
        isPostList: false,
      };

    default:
      return state;
  }
}
