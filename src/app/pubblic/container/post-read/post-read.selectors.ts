import { createSelector } from "@ngrx/store";
import { getPubblicState } from "../../pubblic.selector";
import { PubblicState } from "../../pubblic.state";
import { PostReadState } from "./post-read.state";

export const selectPostReadState = createSelector(
    getPubblicState,
    (state: PubblicState) => state.postRead
);

export const selectPostDetail = createSelector(
    selectPostReadState,
    (state: PostReadState) => state.postDetail
);