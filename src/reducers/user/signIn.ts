import { Reducer } from 'redux';

import { ActionType, SignInElement, SignInAction } from 'actions/signIn';

export type State = SignInElement & {
  error?: string | null;
  modalOpen: boolean;
};

export const initialState: State = {
  inputUserName: '',
  inputPassword: '',
  modalOpen: false
};

export type Action = SignInAction;

/* Reducer
 ***********************************************/
const signInReducer: Reducer<State, Action> = (
  state: State = initialState,
  action: Action
): State => {
  switch (action.type) {
    case ActionType.SIGN_IN_START:
      return {
        ...state,
        inputUserName: action.payload.inputUserName,
        inputPassword: action.payload.inputPassword
      };
    case ActionType.SIGN_IN_SUCCEED:
      return {
        ...state,
        modalOpen: true,
        error: null
      };
    case ActionType.SIGN_IN_FAIL:
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

export default signInReducer;
