import { ConfigState } from './app.state';
import {
  ConfigActions,
  GET_CONFIG,
  GET_CONFIG_COMPLETE,
  GET_CONFIG_ERROR
} from './config.actions';

export function ConfigReducers(
  state = new ConfigState(),
  action: ConfigActions
): ConfigState {
  switch (action.type) {
    case GET_CONFIG: {
      return {
        ...state,
        isBusy: true
      };
    }
    case GET_CONFIG_COMPLETE: {
      return {
        ...state,
        config: action.payload,
        isBusy: false,
        hasFinished: true
      };
    }
    case GET_CONFIG_ERROR: {
      return {
        ...state,
        isBusy: false,
        hasFinished: true
      };
    }
    default:
      return state;
  }
}
