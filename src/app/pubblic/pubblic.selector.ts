import { createFeatureSelector } from "@ngrx/store";
import { PubblicState } from "./pubblic.state";

export const getPubblicState = createFeatureSelector<PubblicState>('pubblic');