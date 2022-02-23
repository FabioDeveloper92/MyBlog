import { USER_AREA_VOICES_MENU } from '../../models/user-area-voices-menu.model';
import {
  GET_POSTS,
  GET_POSTS_COMPLETE,
  GET_POSTS_ERROR,
  SELECT_VOICE_MENU,
  UserAreaActions
} from './user-area.actions';
import { UserAreaState } from './user-area.state';

export function UserAreaReducers(
  state: UserAreaState = {
    voiceMenu: USER_AREA_VOICES_MENU,
    voiceMenuSelected: 1,
    posts: [],
    isBusyGetPosts: false
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
        posts: [],
        isBusyGetPosts: true
      };

    case GET_POSTS_COMPLETE:
      return {
        ...state,
        posts: action.payload,
        isBusyGetPosts: false
      };

    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: [],
        isBusyGetPosts: false
      };

    default:
      return state;
  }
}
