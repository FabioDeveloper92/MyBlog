import { CHANGE_LANGUAGE_SUCCESS, LanguageActions } from './language.actions';
import { LanguageState } from './language.state';

export function LanguageReducers(
  state = new LanguageState(),
  action: LanguageActions
): LanguageState {
  switch (action.type) {
    case CHANGE_LANGUAGE_SUCCESS:
      return {
        ...state,
        currentLanguage: action.payload
      };
    default:
      return state;
  }
}
