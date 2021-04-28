import { PostDetail } from '../../models/post-detail.model';

export interface PostReadState {
    postDetail: PostDetail;
    isBusyAddComment:boolean,
    isBusyPostRead:boolean,
}