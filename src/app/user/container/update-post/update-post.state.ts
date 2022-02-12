import { TagModel } from "../../../core/model/tag.model";
import { UpdatePost } from "../../models/update-post.model";

export interface UpdatePostState {
    post: UpdatePost;
    isBusyPublish: boolean;
    isBusySaveDraft: boolean;
    isBusyGetPost: boolean;
    tagsBlog: TagModel[];
}
  