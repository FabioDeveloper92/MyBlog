import {
  PostReadActions,
  POST_DETAIL,
  POST_DETAIL_COMPLETE,
  POST_DETAIL_ERROR,
} from '../post-read/post-read.actions';
import { PostReadState } from './post-read.state';

export function PostReadReducers(
  state: PostReadState = {
    postDetail: undefined,
  },
  action: PostReadActions
): PostReadState {
  switch (action.type) {
    case POST_DETAIL:
      return {
        ...state,
        postDetail: undefined,
      };

    case POST_DETAIL_COMPLETE:
      return {
        ...state,
        postDetail: action.payload,
      };

    case POST_DETAIL_ERROR:
      return {
        ...state,
        postDetail: undefined,
      };

    default:
      return state;
  }
}
