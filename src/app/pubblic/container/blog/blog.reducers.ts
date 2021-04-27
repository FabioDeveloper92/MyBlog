import {
    BlogActions,
    POST_LIST,
    POST_LIST_COMPLETE,
    POST_LIST_ERROR,
  } from './blog.actions';
  import { postListAdapter } from './blog.selectors';
  import { BlogState } from './blog.state';
  
  export function BlogReducers(
    state = postListAdapter.getInitialState(),
    action: BlogActions
  ): BlogState {
    switch (action.type) {
      case POST_LIST:
        return postListAdapter.removeAll(state);
  
      case POST_LIST_COMPLETE:
        return postListAdapter.addMany(action.payload, state);
  
      case POST_LIST_ERROR:
        return postListAdapter.removeAll(state);
  
      default:
        return state;
    }
  }
  