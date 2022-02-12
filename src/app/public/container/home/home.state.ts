import { EntityState } from '@ngrx/entity/src/models';
import { ResumePost } from '../../models/resume-post.model';

export interface HomeState extends EntityState<ResumePost> {
    isBusyResumePostList: boolean
}