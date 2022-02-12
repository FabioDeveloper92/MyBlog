import { Comment } from './comment.model';
import { RelatedPost } from './related-post.model';

export class PostDetail {
  public id: string;
  public title: string;
  public tags: number[];
  public imageUrl: string;
  public publishDate: Date;
  public createdBy: string;
  public comments: Comment[];
  public text: string;
  public postRelateds: RelatedPost[];
}
