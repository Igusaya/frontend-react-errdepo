import { Reducer } from 'redux';

import { ActionType, UserMenuAction } from 'actions/userMenu';
import { Profile } from 'service/backend-django-rest-errdepo/model';

export interface State {
  error?: string | null;
  profile?: Profile;
}

export const initialState: State = {};

export type Action = UserMenuAction;

/* Reducer
 ***********************************************/
const userMenuReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case ActionType.SIGN_OUT_START:
      return {
        ...state
      };
    case ActionType.SIGN_OUT_SUCCEED:
      return {
        ...state,
        profile: undefined
      };
    case ActionType.SIGN_OUT_FAIL:
      return {
        ...state,
        error: action.payload.error
      };
    case ActionType.GET_PROFILE_START:
      return {
        ...state
      };
    case ActionType.GET_PROFILE_SUCCEED:
      return {
        ...state,
        profile: action.payload.result.profile
      };
    case ActionType.GET_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload.error
      };
    case ActionType.PUT_PROFILE_START:
      return {
        ...state,
        profile: action.payload.param.profile
      };
    case ActionType.PUT_PROFILE_SUCCEED:
      return {
        ...state,
        profile: action.payload.result.profile
      };
    case ActionType.PUT_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload.error
      };
    case ActionType.ERASE_REPORT_DETAIL:
      return {
        ...state
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;
      return state;
    }
  }
};

export default userMenuReducer;
