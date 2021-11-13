import { TagModel } from '../../../core/model/tag.model';

export interface AddPostState {
  isBusyPublish: boolean;
  isBusySaveDraft: boolean;
  tagsBlog: TagModel[];
}
