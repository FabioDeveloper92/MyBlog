import {
  HomeActions,
  RESUMEPOST_LIST,
  RESUMEPOST_LIST_COMPLETE,
  RESUMEPOST_LIST_ERROR,
} from './home.actions';
import { resumePostListAdapter } from './home.selectors';
import { HomeState } from './home.state';

export function HomeReducers(
  state = resumePostListAdapter.getInitialState(),
  action: HomeActions
): HomeState {
  switch (action.type) {
    case RESUMEPOST_LIST:
      return resumePostListAdapter.removeAll(state);

    case RESUMEPOST_LIST_COMPLETE:
      return resumePostListAdapter.addMany(action.payload, state);

    case RESUMEPOST_LIST_ERROR:
      return resumePostListAdapter.removeAll(state);

    default:
      return state;
  }
}
