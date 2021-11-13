import {
  AddPostActions,
  GET_TAGS_BLOG_COMPLETE,
  PUBLISH_BLOG,
  PUBLISH_BLOG_COMPLETE,
  PUBLISH_BLOG_ERROR,
  SAVE_DRAFT_BLOG,
  SAVE_DRAFT_BLOG_COMPLETE,
  SAVE_DRAFT_BLOG_ERROR,
} from './add-post.actions';
import { AddPostState } from './add-post.state';

export function AddPostReducers(
  state: AddPostState = {
    isBusyPublish: false,
    isBusySaveDraft: false,
    tagsBlog: [],
  },
  action: AddPostActions
): AddPostState {
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

    default:
      return state;
  }
}
