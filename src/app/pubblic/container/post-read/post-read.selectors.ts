import { createSelector } from "@ngrx/store";
import { PostDetail } from "../../models/post-detail.model";
import { getPubblicState } from "../../pubblic.selector";
import { PubblicState } from "../../pubblic.state";
import { PostReadState } from "./post-read.state";

export const selectPostReadState = createSelector(
    getPubblicState,
    (state: PubblicState) => state.postReadState
);

export const selectPostDetail = createSelector(
    selectPostReadState,
    (state: PostReadState) => state.postDetail
);

export const selectPostDetailId= createSelector(
    selectPostDetail,
    (state: PostDetail) => state.id
);