import {HomeState} from './container/home/home.state';
import { PostReadState } from './container/post-read/post-read.state';

export interface PubblicState {
    homeState: HomeState,
    postRead: PostReadState
}