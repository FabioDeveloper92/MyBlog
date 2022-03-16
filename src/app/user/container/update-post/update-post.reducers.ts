import {
  GET_MY_POSTS_CAN_BE_RELATED,
  GET_MY_POSTS_CAN_BE_RELATED_COMPLETE,
  GET_MY_POSTS_CAN_BE_RELATED_ERROR,
  GET_POST,
  GET_POST_COMPLETE,
  GET_POST_ERROR,
  GET_TAGS_BLOG_COMPLETE,
  PUBLISH_BLOG,
  PUBLISH_BLOG_COMPLETE,
  PUBLISH_BLOG_ERROR,
  SAVE_DRAFT_BLOG,
  SAVE_DRAFT_BLOG_COMPLETE,
  SAVE_DRAFT_BLOG_ERROR,
  UpdatePostActions,
} from './update-post.actions';
import { UpdatePostState } from './update-post.state';

export function UpdatePostReducers(
  state: UpdatePostState = {
    post: undefined,
    isBusyPublish: false,
    isBusySaveDraft: false,
    isBusyGetPost: false,
    tagsBlog: [],
    postCanBeRelated: [],
  },
  action: UpdatePostActions
): UpdatePostState {
  switch (action.type) {
    case GET_TAGS_BLOG_COMPLETE:
      return {
        ...state,
        tagsBlog: action.payload,
      };

    case SAVE_DRAFT_BLOG:
      return {
        ...state,
        isBusySaveDraft: true,
      };

    case SAVE_DRAFT_BLOG_COMPLETE:
      return {
        ...state,
        isBusySaveDraft: false,
      };
    case SAVE_DRAFT_BLOG_ERROR:
      return {
        ...state,
        isBusySaveDraft: false,
      };

    case PUBLISH_BLOG:
      return {
        ...state,
        isBusyPublish: true,
      };

    case PUBLISH_BLOG_COMPLETE:
      return {
        ...state,
        isBusyPublish: false,
      };

    case PUBLISH_BLOG_ERROR:
      return {
        ...state,
        isBusyPublish: false,
      };

    case GET_POST: {
      return {
        ...state,
        post: undefined,
        isBusyGetPost: true,
      };
    }

    case GET_POST_COMPLETE: {
      return {
        ...state,
        post: action.payload,
        isBusyGetPost: false,
      };
    }

    case GET_POST_ERROR: {
      return {
        ...state,
        post: undefined,
        isBusyGetPost: false,
      };
    }

    case GET_MY_POSTS_CAN_BE_RELATED: {
      return {
        ...state,
        postCanBeRelated: [],
      };
    }

    case GET_MY_POSTS_CAN_BE_RELATED_COMPLETE: {
      return {
        ...state,
        postCanBeRelated: action.payload,
      };
    }

    case GET_MY_POSTS_CAN_BE_RELATED_ERROR: {
      return {
        ...state,
        postCanBeRelated: [],
      };
    }

    default:
      return state;
  }
}
