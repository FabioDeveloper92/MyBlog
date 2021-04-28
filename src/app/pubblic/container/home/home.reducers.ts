import {
  HomeActions,
  RESUMEPOST_LIST,
  RESUMEPOST_LIST_COMPLETE,
  RESUMEPOST_LIST_ERROR,
} from './home.actions';
import { resumePostListAdapter } from './home.selectors';
import { HomeState } from './home.state';

export function HomeReducers(
  state = resumePostListAdapter.getInitialState({
    isBusyResumePostList: false,
  }),
  action: HomeActions
): HomeState {
  switch (action.type) {
    case RESUMEPOST_LIST:
      return {
        ...resumePostListAdapter.removeAll(state),
        isBusyResumePostList: true
      };
    case RESUMEPOST_LIST_COMPLETE:
      return {
        ...resumePostListAdapter.addMany(action.payload, state),
        isBusyResumePostList: false
      };
    case RESUMEPOST_LIST_ERROR:
      return {
        ...resumePostListAdapter.removeAll(state),
        isBusyResumePostList: false
      };

    default:
      return state;
  }
}
