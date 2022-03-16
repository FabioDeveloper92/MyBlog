import { TagModel } from "../../../core/model/tag.model";
import { UpdatePost } from "../../models/update-post.model";
import { MyPostCanBeRelated } from "../../models/my-post-can-be-related";

export interface UpdatePostState {
    post: UpdatePost;
    isBusyPublish: boolean;
    isBusySaveDraft: boolean;
    isBusyGetPost: boolean;
    tagsBlog: TagModel[];
    postCanBeRelated: MyPostCanBeRelated[];
}
  