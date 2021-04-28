import { EntityState } from '@ngrx/entity/src/models';
import { ResumePost } from '../../models/resume-post.model';

export interface BlogState extends EntityState<ResumePost> {
  isPostList: boolean;
}
