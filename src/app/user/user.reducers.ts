import { ActionReducerMap } from "@ngrx/store";
import { UserState } from './user.state'
import {AddPostReducers} from './container/add-post/add-post.reducers';

export const UserReducers: ActionReducerMap<UserState> = {
    addPost: AddPostReducers
}