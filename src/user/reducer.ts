import { Reducer } from 'redux';

import { ActionType, UserAction } from 'user/action';

export interface State {
  error?: string | null;
  modalOpen: boolean;
}

export const initialState: State = {
  modalOpen: false
};

export type Action = UserAction;

/* Reducer
 ***********************************************/
const reducer: Reducer<State, Action> = (
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
        modalOpen: true
      };
    case ActionType.SIGN_OUT_FAIL:
      return {
        ...state,
        error: action.payload.error
      };
    default: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const _: never = action;
      return state;
    }
  }
};

export default reducer;
