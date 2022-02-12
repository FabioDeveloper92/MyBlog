import { ActionReducerMap } from '@ngrx/store';
import { BlogReducers } from './container/blog/blog.reducers';
import { HomeReducers } from './container/home/home.reducers';
import { PostReadReducers } from './container/post-read/post-read.reducers';

import { PublicState } from './public.state';

export const PublicReducers: ActionReducerMap<PublicState> = {
    homeState: HomeReducers,
    postReadState: PostReadReducers,
    blogState: BlogReducers
}