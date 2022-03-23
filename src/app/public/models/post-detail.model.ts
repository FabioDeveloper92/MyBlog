import { Comment } from './comment.model';
import { postsRelatedCompleted } from './related-post.model';

export class PostDetail {
  public id: string;
  public title: string;
  public tags: number[];
  public imageMain: string;
  public imageThumb: string;
  public publishDate: Date;
  public createBy: string;
  public comments: Comment[];
  public text: string;
  public postsRelatedCompleted: postsRelatedCompleted[];
}
