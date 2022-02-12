import {
  ADD_COMMENT_POST,
  ADD_COMMENT_POST_COMPLETE,
  ADD_COMMENT_POST_ERROR,
  PostReadActions,
  POST_DETAIL,
  POST_DETAIL_COMPLETE,
  POST_DETAIL_ERROR,
} from '../post-read/post-read.actions';
import { PostReadState } from './post-read.state';

export function PostReadReducers(
  state: PostReadState = {
    postDetail: undefined,
    isBusyAddComment: false,
    isBusyPostRead: false,
  },
  action: PostReadActions
): PostReadState {
  switch (action.type) {
    case POST_DETAIL:
      return {
        ...state,
        postDetail: undefined,
        isBusyPostRead: true,
      };

    case POST_DETAIL_COMPLETE:
      return {
        ...state,
        postDetail: action.payload,
        isBusyPostRead: false,
      };

    case POST_DETAIL_ERROR:
      return {
        ...state,
        postDetail: undefined,
        isBusyPostRead: false,
      };

    case ADD_COMMENT_POST:
      return {
        ...state,
        isBusyAddComment: true,
      };

    case ADD_COMMENT_POST_COMPLETE:
      return {
        ...state,
        isBusyAddComment: false,
      };

    case ADD_COMMENT_POST_ERROR:
      return {
        ...state,
        isBusyAddComment: false,
      };

    default:
      return state;
  }
}
