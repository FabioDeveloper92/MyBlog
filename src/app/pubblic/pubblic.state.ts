import { BlogState } from './container/blog/blog.state';
import {HomeState} from './container/home/home.state';
import { PostReadState } from './container/post-read/post-read.state';

export interface PubblicState {
    homeState: HomeState,
    postReadState: PostReadState,
    blogState: BlogState
}