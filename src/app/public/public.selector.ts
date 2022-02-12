import { createFeatureSelector } from "@ngrx/store";
import { PublicState } from "./public.state";

export const getPublicState = createFeatureSelector<PublicState>('Public');