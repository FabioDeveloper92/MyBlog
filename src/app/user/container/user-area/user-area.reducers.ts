import { USER_AREA_VOICES_MENU } from '../../models/user-area-voices-menu.model';
import {
  EXPAND_LIST,
  FILTER_BY_STATE,
  FILTER_BY_TITLE_CONTAINS,
  GET_POSTS,
  GET_POSTS_COMPLETE,
  GET_POSTS_ERROR,
  ORDER_BY_DATE,
  REDUCE_LIST,
  SELECT_VOICE_MENU,
  UserAreaActions,
} from './user-area.actions';
import { UserAreaState } from './user-area.state';

export function UserAreaReducers(
  state: UserAreaState = {
    voiceMenu: USER_AREA_VOICES_MENU,
    voiceMenuSelected: 1,
    posts: [],
    isBusyGetPosts: false,
    filterByTitleContains: '',
    filterByState: 0,
    orderByDate: 0,
    showPostLimit: 5,
  },
  action: UserAreaActions
): UserAreaState {
  switch (action.type) {
    case SELECT_VOICE_MENU:
      return {
        ...state,
        voiceMenuSelected: action.payload,
      };

    case GET_POSTS:
      return {
        ...state,
        isBusyGetPosts: true,
      };

    case GET_POSTS_COMPLETE:
      return {
        ...state,
        posts: action.payload,
        isBusyGetPosts: false,
      };

    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: [],
        isBusyGetPosts: false,
      };

    case FILTER_BY_TITLE_CONTAINS:
      return {
        ...state,
        filterByTitleContains: action.payload,
      };

    case FILTER_BY_STATE:
      return {
        ...state,
        filterByState: action.payload,
      };

    case ORDER_BY_DATE:
      return {
        ...state,
        orderByDate: action.payload,
      };

    case EXPAND_LIST:
      return {
        ...state,
        showPostLimit: action.payload,
      };

    case REDUCE_LIST:
      return {
        ...state,
        showPostLimit: action.payload,
      };

    default:
      return state;
  }
}
