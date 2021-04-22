import { ActionReducerMap } from '@ngrx/store';
import { HomeReducers } from './container/home/home.reducers';

import { PubblicState } from './pubblic.state';

export const PubblicReducers: ActionReducerMap<PubblicState> = {
    homeState: HomeReducers
}