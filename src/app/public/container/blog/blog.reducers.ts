import {
  BlogActions,
  INIT_FILTER_BY_TIME,
  INIT_ORDER_BY_VISIBILITY,
  POST_LIST,
  POST_LIST_COMPLETE,
  POST_LIST_ERROR,
  SELECT_FILTER_BY_TIME,
  SELECT_ORDER_BY_VISIBILITY,
} from './blog.actions';
import { postListAdapter } from './blog.selectors';
import { BlogState } from './blog.state';

export function BlogReducers(
  state = postListAdapter.getInitialState({
    isPostList: false,
    orderByVisibilityVoices: [],
    filterByTimeVoices: [],
    selectVisibilityVoices: 3,
    selectTimeVoices: 3,
  }),
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

    case INIT_ORDER_BY_VISIBILITY:
      return {
        ...state,
        orderByVisibilityVoices: action.payload,
      };

    case INIT_FILTER_BY_TIME:
      return {
        ...state,
        filterByTimeVoices: action.payload,
      };

    case SELECT_ORDER_BY_VISIBILITY:
      return {
        ...state,
        selectVisibilityVoices: action.payload,
      };

    case SELECT_FILTER_BY_TIME:
      return {
        ...state,
        selectTimeVoices: action.payload,
      };

    default:
      return state;
  }
}
