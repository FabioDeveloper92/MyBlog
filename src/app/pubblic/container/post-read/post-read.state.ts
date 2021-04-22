import { EntityState } from '@ngrx/entity/src/models';
import { PostDetail } from '../../models/post-detail.model';

export interface PostReadState extends EntityState<PostDetail> {
}